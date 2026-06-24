'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../shared/Logo';

type NavItem = { href: string; label: string; icon: string; disabled?: boolean };
type NavSection = { label: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    label: 'Главно',
    items: [
      { href: '/admin', label: 'Преглед', icon: '◐' },
      { href: '/admin/properties', label: 'Имоти', icon: '◊' },
      { href: '/admin/inquiries', label: 'Запитвания', icon: '✉' },
    ],
  },
  {
    label: 'Инструменти',
    items: [
      { href: '/admin/qr', label: 'QR кодове', icon: '▦' },
    ],
  },
  {
    label: 'Съдържание · Фаза 2',
    items: [
      { href: '#', label: 'Обучения', icon: '◇', disabled: true },
      { href: '#', label: 'Събития', icon: '✦', disabled: true },
      { href: '#', label: 'Детски център', icon: '✿', disabled: true },
      { href: '#', label: 'Клиенти', icon: '◯', disabled: true },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        background: 'var(--text)',
        color: 'rgba(250,247,242,0.7)',
        padding: '28px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 8px 4px' }}>
        <Logo size={32} variant="light" showText={false} />
        <span style={{ fontFamily: 'var(--serif)', fontSize: 19, color: 'var(--cream)', letterSpacing: '0.05em' }}>
          Alma Carita
        </span>
        <span style={{ fontSize: 10, color: 'rgba(250,247,242,0.4)', marginLeft: 'auto', letterSpacing: '0.1em' }}>PMS</span>
      </Link>

      {sections.map((section) => (
        <div key={section.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(250,247,242,0.32)',
              padding: '0 12px 8px',
            }}
          >
            {section.label}
          </div>
          {section.items.map((item) => {
            const isActive = !item.disabled && (pathname === item.href || pathname.startsWith(item.href + '/'));
            const content = (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 12px',
                  borderRadius: 12,
                  fontSize: 13,
                  color: item.disabled
                    ? 'rgba(250,247,242,0.25)'
                    : isActive
                    ? 'var(--cream)'
                    : 'rgba(250,247,242,0.7)',
                  background: isActive ? 'rgba(250,247,242,0.08)' : 'transparent',
                  transition: 'all 0.2s',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                }}
              >
                <span style={{ width: 16, textAlign: 'center', fontSize: 14 }}>{item.icon}</span>
                {item.label}
                {item.disabled && (
                  <span style={{ marginLeft: 'auto', fontSize: 9, letterSpacing: '0.1em', color: 'rgba(250,247,242,0.3)' }}>СКОРО</span>
                )}
              </div>
            );

            return item.disabled ? (
              <div key={item.label}>{content}</div>
            ) : (
              <Link key={item.href} href={item.href}>
                {content}
              </Link>
            );
          })}
        </div>
      ))}

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 24,
          borderTop: '1px solid rgba(250,247,242,0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #d4cce8, #efd8c8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--serif)',
            color: 'var(--text)',
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          К
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ color: 'var(--cream)', fontSize: 13 }}>Карина</div>
          <div style={{ fontSize: 11, color: 'rgba(250,247,242,0.4)' }}>karina@almacarita.bg</div>
        </div>
        <Link
          href="/"
          style={{ fontSize: 11, color: 'rgba(250,247,242,0.4)', letterSpacing: '0.08em' }}
          title="Изход"
        >
          ↗
        </Link>
      </div>
    </aside>
  );
}
