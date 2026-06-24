'use client';

import { useEffect } from 'react';

/**
 * Добавя клас `in` на всеки `.reveal`, `.reveal-scale`, `.reveal-left`, `.reveal-right`
 * елемент когато влезе във viewport.
 * Уважава prefers-reduced-motion (CSS се грижи за крайното състояние).
 */
export function useScrollReveal() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-scale, .reveal-left, .reveal-right';
    const els = Array.from(document.querySelectorAll(selectors));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}
