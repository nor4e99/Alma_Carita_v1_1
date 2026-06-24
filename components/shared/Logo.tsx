interface LogoProps {
  size?: number;
  variant?: 'default' | 'light';
  showText?: boolean;
}

// Венчелистчета, радиращи от център (100,100) — пред-завъртени
const PETAL_UP = 'M 100 100 C 78 72, 80 34, 100 15 C 120 34, 122 72, 100 100 Z';
const PETAL_RIGHT = 'M 100 100 C 128 78, 166 80, 185 100 C 166 120, 128 122, 100 100 Z';
const PETAL_DOWN = 'M 100 100 C 122 128, 120 166, 100 185 C 80 166, 78 128, 100 100 Z';
const PETAL_LEFT = 'M 100 100 C 72 122, 34 120, 15 100 C 34 80, 72 78, 100 100 Z';

// Глобален брояч — гарантира УНИКАЛНИ gradient id-та за всеки FlowerMark,
// дори когато на страницата има много екземпляри (nav, hero, орбити...).
let __flowerSeq = 0;

/**
 * SVG цветето на Alma Carita — четирилистно, с аура.
 * Зелено горе, синьо дясно, оранжево долу, жълто ляво, магента център.
 */
export function FlowerMark({
  size = 200,
  withAura = true,
}: {
  size?: number;
  withAura?: boolean;
  /** @deprecated вече не е нужен — id-тата са глобално уникални */
  idSuffix?: string;
}) {
  const uid = `f${++__flowerSeq}`;
  const a = `${uid}-aura`;
  const green = `${uid}-green`;
  const blue = `${uid}-blue`;
  const orange = `${uid}-orange`;
  const yellow = `${uid}-yellow`;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <radialGradient id={a} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fbe3a8" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#f4a98a" stopOpacity="0.5" />
          <stop offset="74%" stopColor="#c9a0d8" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#b9a3da" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={green} cx="50%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#5bb04f" /><stop offset="100%" stopColor="#3d8a37" />
        </radialGradient>
        <radialGradient id={blue} cx="70%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#4163bd" /><stop offset="100%" stopColor="#2e4a96" />
        </radialGradient>
        <radialGradient id={orange} cx="50%" cy="70%" r="80%">
          <stop offset="0%" stopColor="#f07b2e" /><stop offset="100%" stopColor="#d05f18" />
        </radialGradient>
        <radialGradient id={yellow} cx="30%" cy="50%" r="80%">
          <stop offset="0%" stopColor="#f7cd45" /><stop offset="100%" stopColor="#d9a818" />
        </radialGradient>
      </defs>
      {withAura && <circle cx="100" cy="100" r="92" fill={`url(#${a})`} />}
      <path d={PETAL_UP} fill={`url(#${green})`} />
      <path d={PETAL_RIGHT} fill={`url(#${blue})`} />
      <path d={PETAL_DOWN} fill={`url(#${orange})`} />
      <path d={PETAL_LEFT} fill={`url(#${yellow})`} />
      <circle cx="100" cy="100" r="6.5" fill="#b0379a" />
    </svg>
  );
}

export function Logo({ size = 40, variant = 'default', showText = true }: LogoProps) {
  const textColor = variant === 'light' ? '#faf7f2' : '#3a3028';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <FlowerMark size={size} withAura />
      {showText && (
        <span style={{ fontFamily: 'var(--serif)', fontSize: size * 0.52, letterSpacing: '0.04em', color: textColor, fontWeight: 400 }}>
          Alma Carita
        </span>
      )}
    </div>
  );
}

/** Декоративен flower за hero/cta — бавно дишащ */
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
      }}
    >
      <FlowerMark size={size} />
    </div>
  );
}
