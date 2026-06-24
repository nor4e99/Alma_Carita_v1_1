'use client';

import Link from 'next/link';
import type { EventItem } from '@/lib/types';
import { useScrollReveal } from '@/lib/utils/useScrollReveal';
import { useParallax } from '@/lib/utils/useParallax';
import { formatDate } from '@/lib/utils/format';

export function EventsShowcase({ events }: { events: EventItem[] }) {
  useScrollReveal();
  useParallax();

  return (
    <div className="pillar-sabitia scene">
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(120px, 18vh, 200px) clamp(20px, 6vw, 80px) clamp(50px, 8vh, 100px)',
          textAlign: 'center',
        }}
      >
        <div data-parallax="1.0" className="blob" style={{ width: 360, height: 360, background: 'var(--accent)', opacity: 0.16, top: '8%', left: '14%' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow fade-up" style={{ color: 'var(--accent)', marginBottom: 24 }}>
            Събития · мигове и памет
          </div>
          <h1 className="h-display fade-up" style={{ fontSize: 'clamp(40px, 6vw, 88px)', marginBottom: 28, animationDelay: '0.2s' }}>
            Това, което сме <em>споделяли</em>
          </h1>
          <p className="fade-up" style={{ fontSize: 16, fontWeight: 200, lineHeight: 1.9, color: 'var(--mid)', maxWidth: 520, margin: '0 auto', animationDelay: '0.4s' }}>
            Работилници, кръгове и срещи. Малки мигове, които оставят следа.
          </p>
        </div>
      </section>

      {/* Timeline list */}
      <section className="section-pad" style={{ paddingTop: 0, maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'clamp(40px, 7vh, 80px)' }}>
        {events.map((ev, i) => (
          <Link
            key={ev.id}
            href={`/sabitia/${ev.slug}`}
            className={`reveal reveal-d${(i % 3) + 1} accent-card`}
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.1fr) 1fr',
              gap: 'clamp(20px, 4vw, 48px)',
              alignItems: 'center',
              background: 'white',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
              direction: i % 2 === 0 ? 'ltr' : 'rtl',
            }}
          >
            <div
              className={ev.gallery[0]?.startsWith('/') ? undefined : (ev.gallery[0] ?? 'g1')}
              style={{
                minHeight: 240,
                height: '100%',
                backgroundImage: ev.gallery[0]?.startsWith('/') ? `url(${ev.gallery[0]})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div style={{ padding: 'clamp(24px, 4vw, 44px)', direction: 'ltr' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  {formatDate(ev.date)}
                </span>
                <span style={{ fontSize: 11, color: 'var(--light)' }}>· {ev.location}</span>
                {ev.role && <span className="pill" style={{ fontSize: 10 }}>{ev.role}</span>}
              </div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 3.4vw, 40px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 14 }}>
                {ev.title}
              </h2>
              <p style={{ fontSize: 14.5, fontWeight: 300, lineHeight: 1.8, color: 'var(--mid)', marginBottom: 18 }}>{ev.excerpt}</p>
              <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)' }}>Виж събитието →</span>
            </div>
          </Link>
        ))}

        {events.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--light)', padding: '40px 0' }}>Скоро тук ще споделям минали събития.</p>
        )}
      </section>
    </div>
  );
}
