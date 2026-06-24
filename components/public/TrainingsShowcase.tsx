'use client';

import Link from 'next/link';
import type { Training } from '@/lib/types';
import { useScrollReveal } from '@/lib/utils/useScrollReveal';
import { useParallax } from '@/lib/utils/useParallax';

export function TrainingsShowcase({ trainings }: { trainings: Training[] }) {
  useScrollReveal();
  useParallax();

  return (
    <div className="pillar-obuchenia scene">
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(120px, 18vh, 200px) clamp(20px, 6vw, 80px) clamp(60px, 10vh, 120px)',
          textAlign: 'center',
        }}
      >
        <div data-parallax="1.0" className="blob" style={{ width: 380, height: 380, background: 'var(--accent)', opacity: 0.16, top: '5%', right: '12%' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          <div className="eyebrow fade-up" style={{ color: 'var(--accent)', marginBottom: 24 }}>
            Обучения · знание и развитие
          </div>
          <h1 className="h-display fade-up" style={{ fontSize: 'clamp(40px, 6vw, 88px)', marginBottom: 28, animationDelay: '0.2s' }}>
            Уча така, както <em>детето</em> учи света
          </h1>
          <p className="fade-up" style={{ fontSize: 16, fontWeight: 200, lineHeight: 1.9, color: 'var(--mid)', maxWidth: 540, margin: '0 auto', animationDelay: '0.4s' }}>
            Програми, родени от психологията, сугестопедията и Валдорфската
            педагогика — за деца, юноши и родители. Без натиск. С радост и смисъл.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad" style={{ paddingTop: 0, maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 28 }}>
          {trainings.map((t, i) => (
            <Link
              key={t.id}
              href={`/obuchenia/${t.slug}`}
              className={`reveal reveal-d${(i % 4) + 1} accent-card`}
              style={{ background: 'white', borderRadius: 'var(--r-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div className={t.gradient} style={{ height: 160, position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute', top: 14, left: 14,
                    background: 'rgba(250,247,242,0.92)', backdropFilter: 'blur(8px)',
                    padding: '5px 12px', borderRadius: 999, fontSize: 10,
                    letterSpacing: '0.1em', color: 'var(--mid)',
                  }}
                >
                  {t.audience}
                </span>
              </div>
              <div style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, lineHeight: 1.2 }}>{t.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--light)' }}>{t.tagline}</p>
                <p style={{ fontSize: 13.5, fontWeight: 300, lineHeight: 1.7, color: 'var(--mid)', flex: 1 }}>
                  {t.description.slice(0, 110)}…
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--line)' }}>
                  {t.method && <span style={{ fontSize: 11, color: 'var(--accent)' }}>{t.method}</span>}
                  <span style={{ fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text)' }}>Научи повече →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {trainings.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--light)', padding: '60px 0' }}>
            Скоро тук ще има обучения. Свържи се с мен за повече.
          </p>
        )}
      </section>
    </div>
  );
}
