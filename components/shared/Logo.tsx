import Image from 'next/image';

interface LogoProps {
  size?: number;
  variant?: 'default' | 'light';
  showText?: boolean;
}

/**
 * Лого на Alma Carita — официалното четирилистно цвете с аура.
 * Nav използва истинския PNG mark за точност спрямо бранда.
 */
export function Logo({ size = 40, variant = 'default', showText = true }: LogoProps) {
  const textColor = variant === 'light' ? '#faf7f2' : '#3a3028';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Image
        src="/images/brand/logo-mark.png"
        alt="Alma Carita"
        width={size}
        height={size}
        style={{ display: 'block', objectFit: 'contain' }}
        priority
      />
      {showText && (
        <span
          style={{
            fontFamily: 'var(--serif)',
            fontSize: size * 0.52,
            letterSpacing: '0.04em',
            color: textColor,
            fontWeight: 400,
          }}
        >
          Alma Carita
        </span>
      )}
    </div>
  );
}

/**
 * SVG версия на цветето — точните форми на венчелистчетата
 * (горно/долно заострени капки, ляво/дясно бадеми) + аура.
 * Използва се за анимирани/декоративни нужди.
 *
 * Petal пътеки около център (100,100):
 *   - заострена капка нагоре, после ротация за всяко листо
 */
const PETAL_TEARDROP = 'M100 100 C 80 70, 84 34, 100 18 C 116 34, 120 70, 100 100 Z';
const PETAL_ALMOND = 'M100 100 C 70 84, 40 86, 22 100 C 40 114, 70 116, 100 100 Z';

export function FlowerMark({ size = 200, withAura = true, idSuffix = '' }: { size?: number; withAura?: boolean; idSuffix?: string }) {
  const gid = `ac-aura-${idSuffix || 'x'}`;
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id={gid} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbe3a8" stopOpacity="0.95" />
          <stop offset="42%" stopColor="#f4a98a" stopOpacity="0.55" />
          <stop offset="72%" stopColor="#c9a0d8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#b9a3da" stopOpacity="0" />
        </radialGradient>
      </defs>
      {withAura && <circle cx="100" cy="100" r="96" fill={`url(#${gid})`} />}
      {/* Зелено — горе */}
      <path d={PETAL_TEARDROP} fill="#4f9e4a" />
      {/* Оранжево — долу (ротация 180) */}
      <path d={PETAL_TEARDROP} fill="#e8702a" transform="rotate(180 100 100)" />
      {/* Синьо — дясно */}
      <path d={PETAL_ALMOND} fill="#3b56a6" transform="rotate(180 100 100)" />
      {/* Жълто — ляво */}
      <path d={PETAL_ALMOND} fill="#f4c430" />
      {/* Център */}
      <circle cx="100" cy="100" r="6" fill="#b0379a" />
    </svg>
  );
}

/** Декоративен flower за hero/cta секции (бавно дишащ) */
export function FlowerDecoration({ size = 500, opacity = 0.5 }: { size?: number; opacity?: number }) {
  return (
    <div
      style={{
        opacity,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'flower-spin-breathe 16s ease-in-out infinite',
        pointerEvents: 'none',
        filter: 'blur(0.3px)',
      }}
    >
      <FlowerMark size={size} idSuffix="deco" />
    </div>
  );
}
