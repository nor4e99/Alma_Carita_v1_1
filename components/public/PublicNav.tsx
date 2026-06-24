'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../shared/Logo';
import { useEffect, useState } from 'react';
import { useFavoritesCount } from '@/lib/utils/favorites';

const links = [
  { href: '/imoti', label: 'Имоти' },
  { href: '/obuchenia', label: 'Обучения' },
  { href: '/detski-tsentar', label: 'Детски център' },
  { href: '/sabitia', label: 'Събития' },
  { href: '/za-men', label: 'За мен' },
];

export function PublicNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const favCount = useFavoritesCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        background: scrolled ? 'rgba(250,247,242,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
        transition: 'all 0.4s',
      }}
    >
      <Link href="/">
        <Logo size={36} />
      </Link>

      <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--text)' : 'var(--mid)',
                transition: 'color 0.25s',
                fontWeight: 400,
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Link href="/imoti?fav=1" className="btn btn-ghost btn-sm" style={{ position: 'relative' }}>
          ♡ Запазени{favCount > 0 ? ` · ${favCount}` : ''}
        </Link>
        <Link href="/kontakt" className="btn btn-primary btn-sm">
          Запитване
        </Link>
      </div>
    </nav>
  );
}
