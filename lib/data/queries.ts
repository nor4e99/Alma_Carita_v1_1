/**
 * DATA ACCESS LAYER
 *
 * Това е "репозиторият" на приложението. UI слоят и страниците
 * ВИНАГИ четат от тук, никога директно от mock.ts.
 *
 * Когато добавим Supabase в Phase 2:
 * 1. Запазваме същите function signatures
 * 2. Заменяме mock-четенето със Supabase queries
 * 3. Никой UI компонент не се пипа
 *
 * Това е ключът към "modular, scalable" архитектурата от brief-а.
 */

import { Property, Inquiry, PropertyType, PropertyStatus, Training, EventItem } from '../types';
import { mockProperties, mockInquiries } from './mock';
import { mockTrainings } from './trainings';
import { mockEvents } from './events';

// ============ READ ============

export interface PropertyFilters {
  type?: PropertyType | 'all';
  status?: PropertyStatus | 'all';
  city?: string;
  area?: string;
  priceMin?: number;
  priceMax?: number;
  roomsMin?: number;
  search?: string;
  sort?: 'newest' | 'price-asc' | 'price-desc' | 'area-desc';
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  // Phase 2: ще стане const { data } = await supabase.from('properties').select('*').match(...)
  let result = [...mockProperties];

  if (filters.type && filters.type !== 'all') {
    result = result.filter((p) => p.type === filters.type);
  }
  if (filters.status && filters.status !== 'all') {
    result = result.filter((p) => p.status === filters.status);
  } else {
    // По подразбиране в публичната част показваме само active
    // (admin call ще предаде status='all')
  }
  if (filters.city) {
    result = result.filter((p) => p.city.toLowerCase().includes(filters.city!.toLowerCase()));
  }
  if (filters.area) {
    result = result.filter((p) => p.area.toLowerCase().includes(filters.area!.toLowerCase()));
  }
  if (filters.priceMin !== undefined) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }
  if (filters.roomsMin !== undefined) {
    result = result.filter((p) => (p.rooms ?? 0) >= filters.roomsMin!);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }

  switch (filters.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'area-desc':
      result.sort((a, b) => b.area_m2 - a.area_m2);
      break;
    case 'newest':
    default:
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  return result;
}

export async function getActiveProperties(filters: Omit<PropertyFilters, 'status'> = {}): Promise<Property[]> {
  return getProperties({ ...filters, status: 'active' });
}

export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  return mockProperties.find((p) => p.slug === slug) ?? null;
}

export async function getPropertyById(id: string): Promise<Property | null> {
  return mockProperties.find((p) => p.id === id) ?? null;
}

export async function getSimilarProperties(property: Property, limit = 3): Promise<Property[]> {
  return mockProperties
    .filter(
      (p) =>
        p.id !== property.id &&
        p.status === 'active' &&
        (p.type === property.type || p.area === property.area),
    )
    .slice(0, limit);
}

export async function getFeaturedProperties(limit = 5): Promise<Property[]> {
  return mockProperties
    .filter((p) => p.status === 'active')
    .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
    .slice(0, limit);
}

// ============ INQUIRIES ============

export async function getInquiries(): Promise<Inquiry[]> {
  return [...mockInquiries].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function createInquiry(input: Omit<Inquiry, 'id' | 'status' | 'created_at'>): Promise<Inquiry> {
  // Phase 2: supabase.from('inquiries').insert(...)
  const inquiry: Inquiry = {
    ...input,
    id: `inq-${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString(),
  };
  mockInquiries.unshift(inquiry);
  return inquiry;
}

// ============ ADMIN STATS ============

export interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  pendingInquiries: number;
  totalViews: number;
  recentProperties: Property[];
  recentInquiries: Inquiry[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const all = await getProperties({ status: 'all' });
  const active = all.filter((p) => p.status === 'active');
  const inquiries = await getInquiries();
  const newInquiries = inquiries.filter((i) => i.status === 'new');
  const totalViews = all.reduce((sum, p) => sum + (p.views ?? 0), 0);

  return {
    totalProperties: all.length,
    activeProperties: active.length,
    pendingInquiries: newInquiries.length,
    totalViews,
    recentProperties: all
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
      .slice(0, 5),
    recentInquiries: inquiries.slice(0, 5),
  };
}

// ============ WRITE (Admin only) ============
// В Phase 1 тези работят in-memory само за демонстрация на flow

export async function updatePropertyStatus(id: string, status: PropertyStatus): Promise<void> {
  const p = mockProperties.find((x) => x.id === id);
  if (p) {
    p.status = status;
    p.updated_at = new Date().toISOString();
  }
}

export async function deleteProperty(id: string): Promise<void> {
  const idx = mockProperties.findIndex((p) => p.id === id);
  if (idx !== -1) mockProperties.splice(idx, 1);
}

export async function updateInquiryStatus(id: string, status: Inquiry['status']): Promise<void> {
  const inq = mockInquiries.find((x) => x.id === id);
  if (inq) inq.status = status;
}

/* ============================================================
   TRAININGS — Стълб 2
   ============================================================ */

export async function getTrainings(): Promise<Training[]> {
  return [...mockTrainings].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );
}

export async function getPublishedTrainings(): Promise<Training[]> {
  return (await getTrainings()).filter((t) => t.published);
}

export async function getTrainingBySlug(slug: string): Promise<Training | null> {
  return mockTrainings.find((t) => t.slug === slug) ?? null;
}

export async function getTrainingById(id: string): Promise<Training | null> {
  return mockTrainings.find((t) => t.id === id) ?? null;
}

/* ============================================================
   EVENTS — Стълб 4 (минали събития)
   ============================================================ */

export async function getEvents(): Promise<EventItem[]> {
  return [...mockEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export async function getPublishedEvents(): Promise<EventItem[]> {
  return (await getEvents()).filter((e) => e.published);
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  return mockEvents.find((e) => e.slug === slug) ?? null;
}
