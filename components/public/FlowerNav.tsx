'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

type Petal = {
  href: string;
  key: string;
  label: string;
  sub: string;
  color: string;
  colorDark: string;
  d: string;
  labelPos: 'top' | 'right' | 'bottom' | 'left';
};

// Pre-rotated petal paths radiating from center (100,100) — no transform attr,
// so CSS animations can't collapse them.
const UP = 'M 100 100 C 78 72, 80 34, 100 15 C 120 34, 122 72, 100 100 Z';
const RIGHT = 'M 100 100 C 128 78, 166 80, 185 100 C 166 120, 128 122, 100 100 Z';
const DOWN = 'M 100 100 C 122 128, 120 166, 100 185 C 80 166, 78 128, 100 100 Z';
const LEFT = 'M 100 100 C 72 122, 34 120, 15 100 C 34 80, 72 78, 100 100 Z';

const PETALS: Petal[] = [
  { href: '/imoti', key: 'imoti', label: 'Имоти', sub: 'Пространство за теб', color: '#5bb04f', colorDark: '#3d8a37', d: UP, labelPos: 'top' },
  { href: '/obuchenia', key: 'obuchenia', label: 'Обучения', sub: 'Развитие и знание', color: '#4163bd', colorDark: '#2e4a96', d: RIGHT, labelPos: 'right' },
  { href: '/detski-tsentar', key: 'detsa', label: 'Детски център', sub: 'Грижа и игра', color: '#f07b2e', colorDark: '#d05f18', d: DOWN, labelPos: 'bottom' },
  { href: '/sabitia', key: 'sabitia', label: 'Събития', sub: 'Минали мигове', color: '#f4c430', colorDark: '#d9a818', d: LEFT, labelPos: 'left' },
];

export function FlowerNav() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState<string | null>(null);

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -16, y: px * 16 });
  }

  const labelStyle: Record<Petal['labelPos'], React.CSSProperties> = {
    top: { top: '-4%', left: '50%', transform: 'translate(-50%,-100%)' },
    right: { top: '50%', right: '-2%', transform: 'translate(112%,-50%)' },
    bottom: { bottom: '-4%', left: '50%', transform: 'translate(-50%,100%)' },
    left: { top: '50%', left: '-2%', transform: 'translate(-112%,-50%)' },
  };

  // посока на леко "разцъфтяване" навън при hover
  const petalShift: Record<Petal['labelPos'], string> = {
    top: 'translateY(-6px)',
    right: 'translateX(6px)',
    bottom: 'translateY(6px)',
    left: 'translateX(-6px)',
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(null); }}
      style={{ position: 'relative', width: 'min(440px, 75vw)', aspectRatio: '1', margin: '40px auto 0', perspective: '1000px' }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'transform 0.25s ease-out',
          position: 'relative',
        }}
      >
        {/* пулсиращ ореол отзад */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: '8%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(251,227,168,0.9) 0%, rgba(244,169,138,0.5) 42%, rgba(201,160,216,0.4) 70%, rgba(185,163,218,0) 100%)',
            animation: 'aura-pulse 7s ease-in-out infinite',
            transform: 'translateZ(-40px)',
          }}
        />

        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible', position: 'relative', transformStyle: 'preserve-3d' }}>
          <defs>
            {PETALS.map((p) => (
              <radialGradient key={p.href} id={`pg-${p.key}`} cx="50%" cy="50%" r="75%">
                <stop offset="0%" stopColor={p.color} />
                <stop offset="100%" stopColor={p.colorDark} />
              </radialGradient>
            ))}
            <filter id="petalShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#3a3028" floodOpacity="0.18" />
            </filter>
          </defs>

          {PETALS.map((p, i) => {
            const active = hovered === p.href;
            const dimmed = hovered && !active;
            return (
              <Link key={p.href} href={p.href}>
                <g
                  style={{
                    transformBox: 'view-box',
                    transformOrigin: '100px 100px',
                    animation: `petal-bloom 1s ${0.15 + i * 0.13}s both`,
                  }}
                >
                  <g
                    onMouseEnter={() => setHovered(p.href)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      cursor: 'pointer',
                      transformBox: 'view-box',
                      transformOrigin: '100px 100px',
                      transform: active ? petalShift[p.labelPos] : 'none',
                      transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s',
                      opacity: dimmed ? 0.5 : 1,
                    }}
                    filter="url(#petalShadow)"
                  >
                    <path d={p.d} fill={`url(#pg-${p.key})`} />
                  </g>
                </g>
              </Link>
            );
          })}

          {/* център = Карина */}
          <Link href="/za-men">
            <circle
              cx="100" cy="100" r="8"
              fill="#b0379a"
              onMouseEnter={() => setHovered('center')}
              onMouseLeave={() => setHovered(null)}
              style={{
                cursor: 'pointer',
                transformOrigin: '100px 100px',
                transform: hovered === 'center' ? 'scale(1.35)' : 'scale(1)',
                transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                animation: 'petal-bloom 0.8s 0.1s both',
              }}
            />
          </Link>
        </svg>

        {/* етикети */}
        {PETALS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            onMouseEnter={() => setHovered(p.href)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'absolute',
              ...labelStyle[p.labelPos],
              textAlign: 'center',
              whiteSpace: 'nowrap',
              opacity: hovered && hovered !== p.href ? 0.35 : 1,
              transition: 'opacity 0.3s, letter-spacing 0.3s',
              transform: `${labelStyle[p.labelPos].transform} ${hovered === p.href ? 'scale(1.06)' : ''}`,
            }}
          >
            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, color: 'var(--text)' }}>{p.label}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: p.colorDark, marginTop: 2 }}>{p.sub}</div>
          </Link>
        ))}

        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', textAlign: 'center',
            pointerEvents: 'none', opacity: hovered === 'center' ? 1 : 0, transition: 'opacity 0.3s',
          }}
        >
          <div style={{ fontFamily: 'var(--serif)', fontSize: 14, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>Карина</div>
        </div>
      </div>
    </div>
  );
}
