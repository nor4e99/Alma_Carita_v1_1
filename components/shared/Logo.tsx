interface LogoProps {
  size?: number;
  variant?: 'default' | 'light';
  showText?: boolean;
}

let gradientId = 0;

export function Logo({ size = 36, variant = 'default', showText = true }: LogoProps) {
  // Уникален id за всеки render да не collide-ва в SSR
  const id = `ac-logo-grad-${++gradientId}`;
  const textColor = variant === 'light' ? '#faf7f2' : '#3a3028';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <circle cx="22" cy="22" r="20" fill={`url(#${id})`} />
        <ellipse cx="22" cy="14" rx="5" ry="8" fill="#6aaa7a" />
        <ellipse cx="30" cy="22" rx="8" ry="5" fill="#7a8fbb" />
        <ellipse cx="22" cy="30" rx="5" ry="8" fill="#e07848" />
        <ellipse cx="14" cy="22" rx="8" ry="5" fill="#d4b840" />
        <circle cx="22" cy="22" r="2.5" fill="#c04060" />
        <defs>
          <radialGradient id={id} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f0c070" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#b090c8" stopOpacity="0.25" />
          </radialGradient>
        </defs>
      </svg>
      {showText && (
        <span
          style={{
            fontFamily: 'var(--serif)',
            fontSize: size * 0.55,
            letterSpacing: '0.05em',
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

/** Декоративен flower за hero/cta секции */
export function FlowerDecoration({ size = 500, opacity = 0.06 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{
        opacity,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'spin-slow 40s linear infinite',
        pointerEvents: 'none',
      }}
    >
      <ellipse cx="100" cy="60" rx="28" ry="52" fill="#6aaa7a" />
      <ellipse cx="140" cy="100" rx="52" ry="28" fill="#7a8fbb" />
      <ellipse cx="100" cy="140" rx="28" ry="52" fill="#e07848" />
      <ellipse cx="60" cy="100" rx="52" ry="28" fill="#d4b840" />
      <circle cx="100" cy="100" r="12" fill="#c04060" />
    </svg>
  );
}
