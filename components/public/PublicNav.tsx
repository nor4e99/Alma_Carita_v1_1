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
  const [mobileOpen, setMobileOpen] = useState(false);
  const favCount = useFavoritesCount();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav className="public-nav" data-scrolled={scrolled}>
        <Link href="/">
          <Logo size={36} />
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop-links">
          {links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={isActive}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="nav-desktop-actions">
          <Link href="/imoti?fav=1" className="btn btn-ghost btn-sm" style={{ position: 'relative' }}>
            ♡ Запазени{favCount > 0 ? ` · ${favCount}` : ''}
          </Link>
          <Link href="/kontakt" className="btn btn-primary btn-sm">
            Запитване
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Затвори менюто' : 'Отвори менюто'}
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="nav-mobile-overlay" onClick={() => setMobileOpen(false)}>
          <div className="nav-mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="nav-mobile-links">
              {links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="nav-mobile-link tap-feedback"
                    data-active={isActive}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="nav-mobile-actions">
              <Link href="/imoti?fav=1" className="btn btn-ghost tap-feedback" style={{ width: '100%' }}>
                ♡ Запазени{favCount > 0 ? ` · ${favCount}` : ''}
              </Link>
              <Link href="/kontakt" className="btn btn-primary tap-feedback" style={{ width: '100%' }}>
                Запитване
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
