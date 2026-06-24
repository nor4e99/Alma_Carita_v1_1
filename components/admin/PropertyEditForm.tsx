'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Property, PropertyStatus, PropertyType, PropertyDeal } from '@/lib/types';
import { typeLabel } from '@/lib/utils/format';

const TYPES: { value: PropertyType; label: string }[] = [
  { value: 'new', label: 'Ново строителство' },
  { value: 'old', label: 'Старо строителство' },
  { value: 'land', label: 'Земя / парцел' },
];

const STATUSES: { value: PropertyStatus; label: string }[] = [
  { value: 'active', label: 'Активен' },
  { value: 'pending', label: 'Под уговорка' },
  { value: 'sold', label: 'Продаден' },
  { value: 'rented', label: 'Под наем' },
  { value: 'draft', label: 'Чернова' },
];

const GRADIENTS = ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8'];

type Draft = {
  name: string;
  slug: string;
  type: PropertyType;
  deal: PropertyDeal;
  status: PropertyStatus;
  price: string;
  currency: 'EUR' | 'BGN';
  area: string;
  city: string;
  address: string;
  lat: string;
  lng: string;
  rooms: string;
  bathrooms: string;
  area_m2: string;
  floor: string;
  total_floors: string;
  year_built: string;
  energy_class: string;
  orientation: string;
  description: string;
  features: string;
  images: string[]; // gradient keys (prototype)
  admin_notes: string;
};

function toDraft(p: Property | null): Draft {
  return {
    name: p?.name ?? '',
    slug: p?.slug ?? '',
    type: p?.type ?? 'new',
    deal: p?.deal ?? 'sale',
    status: p?.status ?? 'draft',
    price: p ? String(p.price) : '',
    currency: p?.currency ?? 'EUR',
    area: p?.area ?? '',
    city: p?.city ?? 'София',
    address: p?.address ?? '',
    lat: p ? String(p.lat) : '42.6977',
    lng: p ? String(p.lng) : '23.3219',
    rooms: p?.rooms ? String(p.rooms) : '',
    bathrooms: p?.bathrooms ? String(p.bathrooms) : '',
    area_m2: p ? String(p.area_m2) : '',
    floor: p?.floor ? String(p.floor) : '',
    total_floors: p?.total_floors ? String(p.total_floors) : '',
    year_built: p?.year_built ? String(p.year_built) : '',
    energy_class: p?.energy_class ?? '',
    orientation: p?.orientation ?? '',
    description: p?.description ?? '',
    features: (p?.features ?? []).join(', '),
    images: p?.images?.length ? p.images.map((i) => i.gradient ?? 'g1') : ['g1'],
    admin_notes: p?.admin_notes ?? '',
  };
}

export function PropertyEditForm({ property }: { property: Property | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [d, setD] = useState<Draft>(() => toDraft(property));
  const [saved, setSaved] = useState(false);
  const isNew = property === null;

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setD((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  // Auto-slug from name (only for new properties with empty slug)
  function onNameChange(value: string) {
    setD((prev) => {
      const autoSlug =
        isNew && (prev.slug === '' || prev.slug === slugify(prev.name))
          ? slugify(value)
          : prev.slug;
      return { ...prev, name: value, slug: autoSlug };
    });
    setSaved(false);
  }

  function save(asStatus?: PropertyStatus) {
    // PROTOTYPE: mock data layer не персистира създаване/редакция в този
    // прототип (in-memory). В Phase 2 тук ще извикаме server action
    // saveProperty(...) която пише в Supabase. UI-ът остава същият.
    const finalStatus = asStatus ?? d.status;
    setD((prev) => ({ ...prev, status: finalStatus }));
    startTransition(() => {
      setTimeout(() => {
        setSaved(true);
        if (isNew) router.push('/admin/properties');
        else router.refresh();
      }, 500);
    });
  }

  return (
    <>
      {/* Topbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
        <div>
          <Link
            href="/admin/properties"
            style={{ fontSize: 12, color: 'var(--mid)', textDecoration: 'none', display: 'inline-block', marginBottom: 10 }}
          >
            ← Обратно към имотите
          </Link>
          <h1 className="h-display" style={{ fontSize: 36 }}>
            {isNew ? 'Нов имот' : d.name || 'Без име'}
          </h1>
          {!isNew && (
            <p style={{ fontSize: 12, color: 'var(--light)', marginTop: 4 }}>
              {property!.id.toUpperCase()}
            </p>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {saved && <span style={{ fontSize: 12, color: '#5e8056' }}>✓ Запазено</span>}
          <button
            onClick={() => save()}
            disabled={isPending}
            className="btn btn-primary btn-sm"
            style={{ cursor: isPending ? 'wait' : 'pointer', opacity: isPending ? 0.6 : 1 }}
          >
            {isPending ? 'Записване…' : 'Запази промени'}
          </button>
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Left — form sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Basic */}
          <Card title="Основна информация">
            <Field label="Заглавие">
              <input className="input" value={d.name} onChange={(e) => onNameChange(e.target.value)} placeholder="напр. Панорамен апартамент с гледка" />
            </Field>
            <Field label="Slug · URL">
              <input className="input" value={d.slug} onChange={(e) => set('slug', e.target.value)} placeholder="panoramen-apartament" />
            </Field>
            <Field label="Описание">
              <textarea className="textarea" rows={5} value={d.description} onChange={(e) => set('description', e.target.value)} placeholder="Опишете имота…" />
            </Field>
            <Field label="Характеристики (разделени със запетая)">
              <input className="input" value={d.features} onChange={(e) => set('features', e.target.value)} placeholder="паркомясто, тераса, асансьор" />
            </Field>
          </Card>

          {/* Params */}
          <Card title="Параметри">
            <Row>
              <Field label="Тип имот">
                <select className="select" value={d.type} onChange={(e) => set('type', e.target.value as PropertyType)}>
                  {TYPES.map((t) => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Сделка">
                <select className="select" value={d.deal} onChange={(e) => set('deal', e.target.value as PropertyDeal)}>
                  <option value="sale">Продажба</option>
                  <option value="rent">Наем</option>
                </select>
              </Field>
            </Row>
            <Row>
              <Field label="Площ (м²)">
                <input className="input" type="number" value={d.area_m2} onChange={(e) => set('area_m2', e.target.value)} />
              </Field>
              <Field label="Стаи">
                <input className="input" type="number" value={d.rooms} onChange={(e) => set('rooms', e.target.value)} disabled={d.type === 'land'} />
              </Field>
              <Field label="Бани">
                <input className="input" type="number" value={d.bathrooms} onChange={(e) => set('bathrooms', e.target.value)} disabled={d.type === 'land'} />
              </Field>
            </Row>
            <Row>
              <Field label="Етаж">
                <input className="input" type="number" value={d.floor} onChange={(e) => set('floor', e.target.value)} disabled={d.type === 'land'} />
              </Field>
              <Field label="Общо етажи">
                <input className="input" type="number" value={d.total_floors} onChange={(e) => set('total_floors', e.target.value)} disabled={d.type === 'land'} />
              </Field>
              <Field label="Година">
                <input className="input" type="number" value={d.year_built} onChange={(e) => set('year_built', e.target.value)} disabled={d.type === 'land'} />
              </Field>
            </Row>
            <Row>
              <Field label="Цена">
                <input className="input" type="number" value={d.price} onChange={(e) => set('price', e.target.value)} />
              </Field>
              <Field label="Валута">
                <select className="select" value={d.currency} onChange={(e) => set('currency', e.target.value as 'EUR' | 'BGN')}>
                  <option value="EUR">EUR (€)</option>
                  <option value="BGN">BGN (лв)</option>
                </select>
              </Field>
              <Field label="Енергиен клас">
                <input className="input" value={d.energy_class} onChange={(e) => set('energy_class', e.target.value)} placeholder="A, B…" disabled={d.type === 'land'} />
              </Field>
            </Row>
          </Card>

          {/* Images */}
          <Card title="Снимки">
            <p style={{ fontSize: 12, color: 'var(--light)', marginBottom: 4 }}>
              В прототипа снимките са градиенти. В Phase 2 — реален upload към Supabase Storage.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {GRADIENTS.map((g) => {
                const active = d.images.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() =>
                      set(
                        'images',
                        active ? d.images.filter((x) => x !== g) : [...d.images, g],
                      )
                    }
                    className={g}
                    style={{
                      width: 72,
                      height: 56,
                      borderRadius: 10,
                      border: active ? '2px solid var(--text)' : '2px solid transparent',
                      boxShadow: active ? 'var(--shadow-sm)' : 'none',
                      cursor: 'pointer',
                      position: 'relative',
                    }}
                  >
                    {active && (
                      <span style={{ position: 'absolute', top: 4, right: 6, color: 'var(--text)', fontSize: 12 }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Location */}
          <Card title="Локация">
            <Row>
              <Field label="Град">
                <input className="input" value={d.city} onChange={(e) => set('city', e.target.value)} />
              </Field>
              <Field label="Квартал">
                <input className="input" value={d.area} onChange={(e) => set('area', e.target.value)} />
              </Field>
            </Row>
            <Field label="Адрес (вътрешно)">
              <input className="input" value={d.address} onChange={(e) => set('address', e.target.value)} placeholder="ул. … № …" />
            </Field>
            <Row>
              <Field label="Широчина (lat)">
                <input className="input" value={d.lat} onChange={(e) => set('lat', e.target.value)} />
              </Field>
              <Field label="Дължина (lng)">
                <input className="input" value={d.lng} onChange={(e) => set('lng', e.target.value)} />
              </Field>
            </Row>
          </Card>
        </div>

        {/* Right — side panels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 32 }}>
          <Card title="Статус">
            <select className="select" value={d.status} onChange={(e) => set('status', e.target.value as PropertyStatus)}>
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
              <button onClick={() => save('active')} disabled={isPending} className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
                Публикувай
              </button>
              <button onClick={() => save('draft')} disabled={isPending} className="btn btn-soft btn-sm" style={{ cursor: 'pointer' }}>
                Запази като чернова
              </button>
            </div>
          </Card>

          {!isNew && (
            <Card title="Видимост">
              <Link href={`/properties/${property!.slug}`} className="btn btn-ghost btn-sm" style={{ textDecoration: 'none', textAlign: 'center' }}>
                ↗ Виж публичната страница
              </Link>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--mid)', marginTop: 4 }}>
                <span>Прегледи</span>
                <strong>{property!.views ?? 0}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--mid)' }}>
                <span>Запитвания</span>
                <strong>{property!.inquiries_count ?? 0}</strong>
              </div>
            </Card>
          )}

          <Card title="Вътрешни бележки">
            <textarea
              className="textarea"
              rows={4}
              value={d.admin_notes}
              onChange={(e) => set('admin_notes', e.target.value)}
              placeholder="Видими само за теб…"
            />
          </Card>
        </div>
      </div>
    </>
  );
}

function slugify(s: string): string {
  const map: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y',
    к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u',
    ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sht', ъ: 'a', ь: 'y', ю: 'yu', я: 'ya',
  };
  return s
    .toLowerCase()
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 20, padding: 24 }}>
      <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400, marginBottom: 18 }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Array.isArray(children) ? children.length : 1}, 1fr)`, gap: 14 }}>{children}</div>;
}
