'use client';

import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import type { Property } from '@/lib/types';
import { formatPrice, typeLabel } from '@/lib/utils/format';

// Базов публичен URL — в Phase 2 идва от env (NEXT_PUBLIC_SITE_URL)
const SITE_URL =
  typeof window !== 'undefined' ? window.location.origin : 'https://almacarita.bg';

export function AdminQR({ properties }: { properties: Property[] }) {
  const [selectedId, setSelectedId] = useState<string>(properties[0]?.id ?? '');
  const [pngUrl, setPngUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const selected = properties.find((p) => p.id === selectedId) ?? null;
  const link = selected ? `${SITE_URL}/properties/${selected.slug}` : SITE_URL;

  useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(link, {
      width: 1024,
      margin: 2,
      color: { dark: '#3a3028', light: '#faf7f2' },
      errorCorrectionLevel: 'H',
    }).then((url) => {
      if (!cancelled) setPngUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [link]);

  function downloadPng() {
    if (!pngUrl) return;
    const a = document.createElement('a');
    a.href = pngUrl;
    a.download = `qr-${selected?.slug ?? 'almacarita'}.png`;
    a.click();
  }

  async function downloadSvg() {
    const svg = await QRCode.toString(link, {
      type: 'svg',
      margin: 2,
      color: { dark: '#3a3028', light: '#faf7f2' },
      errorCorrectionLevel: 'H',
    });
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qr-${selected?.slug ?? 'almacarita'}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyLink() {
    navigator.clipboard?.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <>
      <div>
        <h1 className="h-display" style={{ fontSize: 38, marginBottom: 6 }}>
          QR кодове
        </h1>
        <p style={{ fontSize: 13, color: 'var(--mid)' }}>
          Генерирай QR код за всяка обява — за табели, визитки и витрини.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        {/* Left — generator */}
        <section style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 20, padding: 28 }}>
          <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 400, marginBottom: 18 }}>
            Генерирай за имот
          </h3>

          <label className="field" style={{ marginBottom: 20 }}>
            <span className="field-label">Избери обява</span>
            <select className="select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.area}
                </option>
              ))}
            </select>
          </label>

          <label className="field" style={{ marginBottom: 22 }}>
            <span className="field-label">Линк</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" readOnly value={link} style={{ flex: 1, fontSize: 12 }} />
              <button onClick={copyLink} className="btn btn-soft btn-sm" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {copied ? '✓ Копирано' : 'Копирай'}
              </button>
            </div>
          </label>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button onClick={downloadPng} className="btn btn-primary btn-sm" style={{ cursor: 'pointer' }}>
              Изтегли PNG · 1024×1024
            </button>
            <button onClick={downloadSvg} className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
              Изтегли SVG · векторно
            </button>
          </div>
        </section>

        {/* Right — preview */}
        <section
          style={{
            background: 'linear-gradient(160deg, #f8f4ee, #ece4f0)',
            border: '1px solid var(--line)',
            borderRadius: 20,
            padding: 28,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 18 }}>
            Преглед
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              padding: 24,
              display: 'inline-block',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {pngUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pngUrl} alt="QR код" width={220} height={220} style={{ display: 'block', borderRadius: 8 }} />
            ) : (
              <div style={{ width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--light)' }}>
                Генериране…
              </div>
            )}
          </div>
          {selected && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 20 }}>{selected.name}</div>
              <div style={{ fontSize: 12, color: 'var(--mid)', marginTop: 4 }}>
                {selected.area}, {selected.city} · {typeLabel(selected.type)}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginTop: 8 }}>
                {formatPrice(selected.price, selected.currency)}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
