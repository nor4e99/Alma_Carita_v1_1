'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

type Petal = {
  href: string;
  label: string;
  sub: string;
  color: string;
  // позиция на етикета спрямо центъра
  pos: 'top' | 'right' | 'bottom' | 'left';
};

const PETALS: Petal[] = [
  { href: '/imoti', label: 'Имоти', sub: 'Пространство за теб', color: 'var(--pillar-imoti)', pos: 'top' },
  { href: '/obuchenia', label: 'Обучения', sub: 'Развитие и знание', color: 'var(--pillar-obuchenia)', pos: 'right' },
  { href: '/detski-tsentar', label: 'Детски център', sub: 'Грижа и игра', color: 'var(--pillar-detsa)', pos: 'bottom' },
  { href: '/sabitia', label: 'Събития', sub: 'Минали мигове', color: 'var(--pillar-sabitia)', pos: 'left' },
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

  // геометрия на венчелистчетата (ellipse) около център 110,110
  const petalGeo: Record<Petal['pos'], { cx: number; cy: number; rx: number; ry: number }> = {
    top: { cx: 110, cy: 64, rx: 30, ry: 48 },
    right: { cx: 156, cy: 110, rx: 48, ry: 30 },
    bottom: { cx: 110, cy: 156, rx: 30, ry: 48 },
    left: { cx: 64, cy: 110, rx: 48, ry: 30 },
  };

  const labelPos: Record<Petal['pos'], React.CSSProperties> = {
    top: { top: '-8%', left: '50%', transform: 'translate(-50%,-100%)' },
    right: { top: '50%', right: '-4%', transform: 'translate(100%,-50%)' },
    bottom: { bottom: '-8%', left: '50%', transform: 'translate(-50%,100%)' },
    left: { top: '50%', left: '-4%', transform: 'translate(-100%,-50%)' },
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ position: 'relative', width: 'min(440px, 80vw)', aspectRatio: '1', margin: '0 auto' }}
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
        <svg viewBox="0 0 220 220" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <radialGradient id="flowerGlow" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stopColor="#f0c070" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#b090c8" stopOpacity="0.12" />
            </radialGradient>
          </defs>

          {/* мек ореол */}
          <circle cx="110" cy="110" r="104" fill="url(#flowerGlow)" />

          {/* венчелистчета = стълбове */}
          {PETALS.map((p, i) => {
            const g = petalGeo[p.pos];
            const active = hovered === p.href;
            return (
              <Link key={p.href} href={p.href}>
                <ellipse
                  className="petal-nav-item"
                  cx={g.cx}
                  cy={g.cy}
                  rx={g.rx}
                  ry={g.ry}
                  fill={p.color}
                  opacity={hovered && !active ? 0.45 : 0.92}
                  onMouseEnter={() => setHovered(p.href)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ animation: `petal-open 0.9s ${0.2 + i * 0.12}s both` }}
                />
              </Link>
            );
          })}

          {/* център = Карина */}
          <Link href="/za-men">
            <circle
              className="petal-nav-item"
              cx="110"
              cy="110"
              r="17"
              fill="var(--pillar-karina)"
              onMouseEnter={() => setHovered('center')}
              onMouseLeave={() => setHovered(null)}
              style={{ animation: 'petal-open 0.9s 0.1s both' }}
            />
          </Link>
        </svg>

        {/* HTML етикети върху листата */}
        {PETALS.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            onMouseEnter={() => setHovered(p.href)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'absolute',
              ...labelPos[p.pos],
              textAlign: 'center',
              whiteSpace: 'nowrap',
              opacity: hovered && hovered !== p.href ? 0.4 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            <div style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--text)' }}>{p.label}</div>
            <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>
              {p.sub}
            </div>
          </Link>
        ))}

        {/* етикет за центъра */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            pointerEvents: 'none',
            opacity: hovered === 'center' ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <div style={{ fontFamily: 'var(--serif)', fontSize: 14, color: 'white' }}>Карина</div>
        </div>
      </div>
    </div>
  );
}
