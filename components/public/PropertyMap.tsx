'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Property, PropertyType } from '@/lib/types';
import { formatPrice, typeLabel, typeColor } from '@/lib/utils/format';

interface Props {
  properties: Property[];
}

export function PropertyMap({ properties }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [type, setType] = useState<PropertyType | 'all'>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;

    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !mapRef.current) return;

      const map = L.map(mapRef.current, {
        center: [42.67, 23.31],
        zoom: 11,
        zoomControl: false,
        attributionControl: false,
      });
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(map);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstance.current = map;
      renderMarkers();
    })();

    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render markers on filter change
  useEffect(() => {
    renderMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, properties]);

  async function renderMarkers() {
    if (!mapInstance.current) return;
    const L = (await import('leaflet')).default;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const visible = type === 'all' ? properties : properties.filter((p) => p.type === type);

    visible.forEach((p) => {
      const priceShort = `${Math.round(p.price / 1000)}k €`;
      const icon = L.divIcon({
        className: '',
        html: `<div class="price-marker ${p.type}">${priceShort}</div>`,
        iconSize: [70, 28],
        iconAnchor: [35, 14],
      });
      const marker = L.marker([p.lat, p.lng], { icon })
        .bindPopup(
          `<div style="padding:6px 4px; min-width: 200px;">
            <div style="font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:#b0a49a;">📍 ${p.area}</div>
            <div style="font-family:'Cormorant Garamond', serif; font-size:18px; margin-top:6px; line-height:1.2;">${p.name}</div>
            <div style="font-family:'Cormorant Garamond', serif; font-size:22px; font-weight:500; margin-top:8px;">${formatPrice(p.price, p.currency)}</div>
            <div style="font-size:11px; color:#7a6e64; margin-top:2px;">${p.rooms ? p.rooms + ' стаи · ' : ''}${p.area_m2} м²</div>
            <a href="/properties/${p.slug}" style="display:inline-block; margin-top:12px; font-size:11px; letter-spacing:0.14em; text-transform:uppercase; color:#3a3028; border-bottom:1px solid #3a3028; padding-bottom:2px;">Виж детайли →</a>
          </div>`
        )
        .on('click', () => setSelectedId(p.id))
        .addTo(mapInstance.current);
      markersRef.current.push(marker);
    });
  }

  const typeOptions: { value: PropertyType | 'all'; label: string; dot?: string }[] = [
    { value: 'all', label: `Всички · ${properties.length}` },
    { value: 'new', label: `Ново · ${properties.filter((p) => p.type === 'new').length}`, dot: '#7a8fbb' },
    { value: 'old', label: `Старо · ${properties.filter((p) => p.type === 'old').length}`, dot: '#e07848' },
    { value: 'land', label: `Земи · ${properties.filter((p) => p.type === 'land').length}`, dot: '#6aaa7a' },
  ];

  const visibleList = type === 'all' ? properties : properties.filter((p) => p.type === type);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '380px 1fr',
        height: 'calc(100vh - 80px)',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          background: 'var(--cream)',
          borderRight: '1px solid var(--line)',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '28px 28px 16px' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>На картата</div>
          <h1 className="h-display" style={{ fontSize: 30, marginBottom: 8 }}>
            Намери <em>близо до теб</em>
          </h1>
          <p style={{ fontSize: 12, color: 'var(--mid)', lineHeight: 1.6 }}>
            {properties.length} имота. Кликни маркер за детайли.
          </p>
        </div>

        <div style={{ padding: '0 28px 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {typeOptions.map((o) => (
            <span
              key={o.value}
              className={`pill ${type === o.value ? 'is-active' : ''}`}
              onClick={() => setType(o.value)}
              style={{ fontSize: 11 }}
            >
              {o.dot && (
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: o.dot,
                    display: 'inline-block',
                  }}
                />
              )}
              {o.label}
            </span>
          ))}
        </div>

        <div
          style={{
            padding: '12px 28px',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
            background: 'rgba(255,255,255,0.5)',
            fontSize: 12,
            color: 'var(--mid)',
          }}
        >
          {visibleList.length} {visibleList.length === 1 ? 'резултат' : 'резултата'}
        </div>

        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {visibleList.map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.slug}`}
              style={{
                background: 'white',
                borderRadius: 16,
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '120px 1fr',
                border: selectedId === p.id ? '1px solid var(--text)' : '1px solid transparent',
                transition: 'all 0.2s',
                boxShadow: selectedId === p.id ? 'var(--shadow-md)' : 'none',
              }}
              onMouseEnter={(e) => {
                if (selectedId !== p.id) e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
              onMouseLeave={(e) => {
                if (selectedId !== p.id) e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className={p.images[0]?.gradient ?? 'g1'} style={{ height: 120 }} />
              <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
                <span style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--light)' }}>
                  📍 {p.area}
                </span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 16, lineHeight: 1.2 }}>{p.name}</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 18, fontWeight: 500, marginTop: 4 }}>
                  {formatPrice(p.price, p.currency)}
                </span>
                <span style={{ fontSize: 11, color: 'var(--mid)' }}>
                  {p.rooms ? `${p.rooms} стаи · ` : ''}{p.area_m2} м²
                </span>
              </div>
            </Link>
          ))}
        </div>
      </aside>

      {/* Map */}
      <div style={{ position: 'relative' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        <div
          style={{
            position: 'absolute',
            bottom: 24,
            left: 24,
            background: 'white',
            padding: '18px 22px',
            borderRadius: 20,
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--line)',
            zIndex: 500,
            minWidth: 220,
          }}
        >
          <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 12 }}>
            Легенда
          </div>
          {[
            { color: '#7a8fbb', label: 'Ново строителство' },
            { color: '#e07848', label: 'Старо строителство' },
            { color: '#6aaa7a', label: 'Земи и парцели' },
          ].map((it) => (
            <div key={it.color} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, padding: '4px 0' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: it.color }} />
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
