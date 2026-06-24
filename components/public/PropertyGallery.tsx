'use client';

import { useState } from 'react';
import { PropertyImage } from '@/lib/types';

interface Props {
  images: PropertyImage[];
}

export function PropertyGallery({ images }: Props) {
  const [active, setActive] = useState(0);

  if (!images.length) return null;

  const current = images[active];

  return (
    <div>
      <div
        style={{
          position: 'relative',
          aspectRatio: '16 / 10',
          borderRadius: 24,
          overflow: 'hidden',
          marginBottom: 16,
        }}
      >
        <div
          className={current.gradient ?? 'g1'}
          style={{ position: 'absolute', inset: 0 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(58,48,40,0.15) 100%)',
          }}
        />
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((active - 1 + images.length) % images.length)}
              style={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(250,247,242,0.9)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                fontSize: 20,
                color: 'var(--text)',
              }}
              aria-label="Предишна снимка"
            >
              ←
            </button>
            <button
              onClick={() => setActive((active + 1) % images.length)}
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(250,247,242,0.9)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                fontSize: 20,
                color: 'var(--text)',
              }}
              aria-label="Следваща снимка"
            >
              →
            </button>
            <div
              style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                background: 'rgba(58,48,40,0.6)',
                color: 'var(--cream)',
                padding: '6px 14px',
                borderRadius: 20,
                fontSize: 12,
                letterSpacing: '0.04em',
              }}
            >
              {active + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 4 }}>
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setActive(i)}
              style={{
                flexShrink: 0,
                width: 100,
                aspectRatio: '4 / 3',
                borderRadius: 12,
                overflow: 'hidden',
                border: i === active ? '2px solid var(--text)' : '2px solid transparent',
                cursor: 'pointer',
                background: 'transparent',
                padding: 0,
              }}
            >
              <div className={img.gradient ?? 'g1'} style={{ width: '100%', height: '100%' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
