'use client';

import Link from 'next/link';
import { Property } from '@/lib/types';
import { formatPrice, typeLabel } from '@/lib/utils/format';
import { useFavorites } from '@/lib/utils/favorites';

interface PropertyCardProps {
  property: Property;
  showStatus?: boolean;
}

export function PropertyCard({ property, showStatus = false }: PropertyCardProps) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(property.id);
  const cover = property.images.find((i) => i.isCover) ?? property.images[0];

  return (
    <article
      style={{
        background: 'white',
        borderRadius: 24,
        overflow: 'hidden',
        transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <Link
        href={`/properties/${property.slug}`}
        style={{ position: 'relative', display: 'block', aspectRatio: '4 / 3', overflow: 'hidden' }}
      >
        <div
          className={cover?.gradient ?? 'g1'}
          style={{ position: 'absolute', inset: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(58,48,40,0.25) 0%, transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            background: 'rgba(250,247,242,0.92)',
            backdropFilter: 'blur(8px)',
            padding: '5px 12px',
            borderRadius: 20,
            fontSize: 10,
            letterSpacing: '0.1em',
            color: 'var(--mid)',
          }}
        >
          {typeLabel(property.type)}
        </div>
        {showStatus && property.status !== 'active' && (
          <div
            className={`status status-${property.status}`}
            style={{ position: 'absolute', top: 14, left: 14, marginTop: 36 }}
          >
            <span className="dot" />
            {property.status === 'sold' && 'Продаден'}
            {property.status === 'pending' && 'В преговори'}
            {property.status === 'rented' && 'Под наем'}
            {property.status === 'draft' && 'Чернова'}
          </div>
        )}
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggle(property.id);
        }}
        aria-label={fav ? 'Премахни от запазени' : 'Запази'}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: 'rgba(250,247,242,0.92)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          fontSize: 16,
          color: fav ? '#c04060' : 'var(--mid)',
        }}
      >
        {fav ? '♥' : '♡'}
      </button>

      <div style={{ padding: '22px 22px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--light)' }}>
          📍 {property.area}, {property.city}
        </div>
        <Link href={`/properties/${property.slug}`}>
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 22,
              lineHeight: 1.2,
              color: 'var(--text)',
              fontWeight: 400,
            }}
          >
            {property.name}
          </h3>
        </Link>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 14,
            borderTop: '1px solid var(--line)',
            marginTop: 4,
          }}
        >
          <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 500 }}>
            {formatPrice(property.price, property.currency)}
          </div>
          <div style={{ fontSize: 11, color: 'var(--light)', letterSpacing: '0.04em' }}>
            {property.rooms ? `${property.rooms} стаи · ` : ''}{property.area_m2} м²
          </div>
        </div>
      </div>
    </article>
  );
}
