// Domain types — споделяни между публична част и admin
// Когато добавим Supabase, тези типове ще се mapnat към database schema

export type PropertyType = 'new' | 'old' | 'land';
export type PropertyStatus = 'active' | 'pending' | 'sold' | 'rented' | 'draft';
export type PropertyDeal = 'sale' | 'rent';

export interface PropertyImage {
  id: string;
  url: string;
  alt?: string;
  isCover?: boolean;
  /** Gradient fallback за prototype (g1-g8) */
  gradient?: string;
}

export interface Property {
  id: string;
  slug: string;
  name: string;
  type: PropertyType;
  status: PropertyStatus;
  deal: PropertyDeal;
  price: number; // в евро
  currency: 'EUR' | 'BGN';

  // Локация
  area: string;        // напр. "Витоша"
  city: string;        // напр. "София"
  address?: string;
  lat: number;
  lng: number;

  // Spec
  rooms?: number;
  bathrooms?: number;
  area_m2: number;
  floor?: number;
  total_floors?: number;
  year_built?: number;

  // Съдържание
  description: string;
  features: string[];     // ["паркомясто", "тераса", ...]
  images: PropertyImage[];

  // Холистично/допълнително
  energy_class?: string;
  orientation?: string;   // напр. "Юг-изток"

  // Меta
  created_at: string;
  updated_at: string;
  views?: number;
  inquiries_count?: number;

  // Admin only
  admin_notes?: string;
  internal_tags?: string[];
}

/** Откъде идва запитването — за да ги групираме в admin inbox-а */
export type InquirySource = 'property' | 'training' | 'children' | 'general';

export interface Inquiry {
  id: string;
  source: InquirySource;
  property_id?: string;
  property_name?: string;
  /** При source='training' — кое обучение */
  training_id?: string;
  training_name?: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: 'new' | 'replied' | 'archived';
  created_at: string;
}

/** Стълб 2 — Обучения (витрина → детайл → "Проявявам интерес") */
export interface Training {
  id: string;
  slug: string;
  title: string;
  tagline: string;          // кратко подзаглавие
  audience: string;         // напр. "Деца 4–7 клас", "Юноши", "Родители"
  format: string;           // напр. "Групово, 8 седмици"
  description: string;      // дълъг текст
  highlights: string[];     // какво включва
  method?: string;          // педагогически подход (Валдорф/Сугестопедия...)
  duration?: string;
  gradient: string;         // g1–g8 визуален акцент
  published: boolean;
  created_at: string;
  interest_count?: number;
}

/** Стълб 4 — Минали събития (блог/галерия) */
export interface EventItem {
  id: string;
  slug: string;
  title: string;
  date: string;             // ISO дата на събитието
  location: string;
  excerpt: string;          // кратко резюме за картата
  body: string;             // пълен разказ
  gallery: string[];        // gradient ключове (g1–g8) като placeholder снимки
  role?: string;            // ролята на Карина — "Лектор", "Организатор"...
  published: boolean;
}

export interface ClientRecord {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  interested_in?: string[]; // property ids
  created_at: string;
}
