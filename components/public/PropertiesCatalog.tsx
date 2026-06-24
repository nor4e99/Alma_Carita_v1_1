'use client';

import { useState, useMemo, useEffect } from 'react';
import { Property, PropertyType } from '@/lib/types';
import { PropertyCard } from '@/components/public/PropertyCard';
import { useFavorites } from '@/lib/utils/favorites';

interface PropertiesCatalogProps {
  initialProperties: Property[];
}

const typeOptions: { value: PropertyType | 'all'; label: string }[] = [
  { value: 'all', label: 'Всички' },
  { value: 'new', label: 'Ново строителство' },
  { value: 'old', label: 'Старо строителство' },
  { value: 'land', label: 'Земи' },
];

export function PropertiesCatalog({ initialProperties }: PropertiesCatalogProps) {
  const [type, setType] = useState<PropertyType | 'all'>('all');
  const [search, setSearch] = useState('');
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [roomsMin, setRoomsMin] = useState<number | null>(null);
  const [sort, setSort] = useState<'newest' | 'price-asc' | 'price-desc' | 'area-desc'>('newest');
  const [favOnly, setFavOnly] = useState(false);
  const { favorites } = useFavorites();

  // URL param ?fav=1 → show only favorites
  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('fav') === '1') {
      setFavOnly(true);
    }
  }, []);

  const filtered = useMemo(() => {
    let result = [...initialProperties];
    if (type !== 'all') result = result.filter((p) => p.type === type);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.area.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q),
      );
    }
    if (priceMax !== null) result = result.filter((p) => p.price <= priceMax);
    if (roomsMin !== null) result = result.filter((p) => (p.rooms ?? 0) >= roomsMin);
    if (favOnly) result = result.filter((p) => favorites.includes(p.id));

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'area-desc':
        result.sort((a, b) => b.area_m2 - a.area_m2);
        break;
      default:
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    return result;
  }, [initialProperties, type, search, priceMax, roomsMin, sort, favOnly, favorites]);

  return (
    <div className="catalog-container">
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Всички обяви
        </div>
        <h1 className="h-display" style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}>
          Имоти в <em>София и околности</em>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--mid)', marginTop: 16, maxWidth: 540, lineHeight: 1.8 }}>
          {filtered.length} {filtered.length === 1 ? 'обява' : 'обяви'} с характер. Намери своя дом.
        </p>
      </div>

      {/* Filters */}
      <div className="catalog-filters">
        <div className="field">
          <span className="field-label">Търсене</span>
          <input
            className="input"
            placeholder="Локация, квартал, име..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="field">
          <span className="field-label">Тип</span>
          <select className="select" value={type} onChange={(e) => setType(e.target.value as PropertyType | 'all')}>
            {typeOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <span className="field-label">Цена до</span>
          <select
            className="select"
            value={priceMax ?? ''}
            onChange={(e) => setPriceMax(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Без ограничение</option>
            <option value="100000">100 000 €</option>
            <option value="200000">200 000 €</option>
            <option value="300000">300 000 €</option>
            <option value="500000">500 000 €</option>
          </select>
        </div>

        <div className="field">
          <span className="field-label">Стаи (мин)</span>
          <select
            className="select"
            value={roomsMin ?? ''}
            onChange={(e) => setRoomsMin(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Без</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            setType('all');
            setSearch('');
            setPriceMax(null);
            setRoomsMin(null);
            setFavOnly(false);
          }}
        >
          Изчисти
        </button>
      </div>

      {/* Pills + sort */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 32,
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {typeOptions.map((o) => (
            <span
              key={o.value}
              className={`pill ${type === o.value ? 'is-active' : ''}`}
              onClick={() => setType(o.value)}
            >
              {o.label}
            </span>
          ))}
          <span
            className={`pill ${favOnly ? 'is-active' : ''}`}
            onClick={() => setFavOnly(!favOnly)}
            style={{ color: favOnly ? undefined : '#c04060' }}
          >
            ♡ Само запазени
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>
            Подреди:
          </span>
          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value as 'newest' | 'price-asc' | 'price-desc' | 'area-desc')}
            style={{ width: 'auto', padding: '8px 14px', fontSize: 12 }}
          >
            <option value="newest">Най-нови</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="area-desc">По размер</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'white',
            borderRadius: 24,
            border: '1px solid var(--line)',
          }}
        >
          <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🔍</div>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, marginBottom: 10 }}>
            Няма резултати
          </h3>
          <p style={{ color: 'var(--mid)', fontSize: 14 }}>
            Опитай с други критерии или изчисти филтрите.
          </p>
        </div>
      ) : (
        <div className="catalog-grid">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
    </div>
  );
}
