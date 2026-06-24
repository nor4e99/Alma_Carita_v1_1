'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

type Petal = {
  href: string;
  label: string;
  sub: string;
  color: string;
  rotate: number;
  shape: 'teardrop' | 'almond';
  labelPos: 'top' | 'right' | 'bottom' | 'left';
};

const TEARDROP = 'M100 100 C 80 70, 84 34, 100 18 C 116 34, 120 70, 100 100 Z';
const ALMOND_UP = 'M100 100 C 86 70, 86 40, 100 22 C 114 40, 114 70, 100 100 Z';

const PETALS: Petal[] = [
  { href: '/imoti', label: 'Имоти', sub: 'Пространство за теб', color: '#4f9e4a', rotate: 0, shape: 'teardrop', labelPos: 'top' },
  { href: '/obuchenia', label: 'Обучения', sub: 'Развитие и знание', color: '#3b56a6', rotate: 90, shape: 'almond', labelPos: 'right' },
  { href: '/detski-tsentar', label: 'Детски център', sub: 'Грижа и игра', color: '#e8702a', rotate: 180, shape: 'teardrop', labelPos: 'bottom' },
  { href: '/sabitia', label: 'Събития', sub: 'Минали мигове', color: '#f4c430', rotate: 270, shape: 'almond', labelPos: 'left' },
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
    setTilt({ x: py * -10, y: px * 10 });
  }

  const labelStyle: Record<Petal['labelPos'], React.CSSProperties> = {
    top: { top: '2%', left: '50%', transform: 'translate(-50%,-100%)' },
    right: { top: '50%', right: '0%', transform: 'translate(108%,-50%)' },
    bottom: { bottom: '2%', left: '50%', transform: 'translate(-50%,100%)' },
    left: { top: '50%', left: '0%', transform: 'translate(-108%,-50%)' },
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(null); }}
      style={{ position: 'relative', width: 'min(460px, 82vw)', aspectRatio: '1', margin: '0 auto' }}
      className="scene"
    >
      <div
        className="depth-layer"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <radialGradient id="flowerNavAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fbe3a8" stopOpacity="0.95" />
              <stop offset="42%" stopColor="#f4a98a" stopOpacity="0.5" />
              <stop offset="72%" stopColor="#c9a0d8" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#b9a3da" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="100" cy="100" r="98" fill="url(#flowerNavAura)" />

          {PETALS.map((p, i) => {
            const active = hovered === p.href;
            const dimmed = hovered && !active;
            return (
              <Link key={p.href} href={p.href}>
                <path
                  className="petal-nav-item"
                  d={p.shape === 'teardrop' ? TEARDROP : ALMOND_UP}
                  transform={`rotate(${p.rotate} 100 100)`}
                  fill={p.color}
                  opacity={dimmed ? 0.4 : 1}
                  onMouseEnter={() => setHovered(p.href)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ animation: `petal-open 0.9s ${0.15 + i * 0.12}s both` }}
                />
              </Link>
            );
          })}

          <Link href="/za-men">
            <circle
              className="petal-nav-item"
              cx="100"
              cy="100"
              r="7"
              fill="#b0379a"
              onMouseEnter={() => setHovered('center')}
              onMouseLeave={() => setHovered(null)}
              style={{ animation: 'petal-open 0.9s 0.1s both' }}
            />
          </Link>
        </svg>

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
              opacity: hovered && hovered !== p.href ? 0.4 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            <div style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--text)' }}>{p.label}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>{p.sub}</div>
          </Link>
        ))}

        <div
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', textAlign: 'center',
            pointerEvents: 'none', opacity: hovered === 'center' ? 1 : 0, transition: 'opacity 0.3s',
          }}
        >
          <div style={{ fontFamily: 'var(--serif)', fontSize: 13, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>Карина</div>
        </div>
      </div>
    </div>
  );
}
