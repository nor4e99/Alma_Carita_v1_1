'use client';

import { useEffect } from 'react';

/**
 * Парралакс по scroll: всеки елемент с data-parallax="0.2" се измества
 * вертикално спрямо скрола (по-малко число = по-бавно = по-надълбоко).
 * Също задава --scroll-y CSS променлива на documentElement.
 * Уважава prefers-reduced-motion.
 */
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    let ticking = false;

    function update() {
      const y = window.scrollY;
      document.documentElement.style.setProperty('--scroll-y', `${y}`);
      for (const el of els) {
        const speed = parseFloat(el.dataset.parallax || '0');
        // спрямо позицията на елемента във viewport
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${center * speed * -0.15}px, 0)`;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
