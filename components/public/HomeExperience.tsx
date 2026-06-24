'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/lib/utils/useScrollReveal';
import { FlowerNav } from '@/components/public/FlowerNav';

type PillarPreview = {
  href: string;
  label: string;
  line: string;
  pillar: string;
};

const PILLARS: PillarPreview[] = [
  { href: '/imoti', label: 'Имоти', line: 'Намирам не просто дом, а пространство, в което човек се чувства на мястото си.', pillar: 'pillar-imoti' },
  { href: '/obuchenia', label: 'Обучения', line: 'Програми за деца, юноши и родители — от психологията и педагогиката, които обичам.', pillar: 'pillar-obuchenia' },
  { href: '/detski-tsentar', label: 'Детски център', line: 'Място, където детето е видяно като цяло — с игра, грижа и уважение.', pillar: 'pillar-detsa' },
  { href: '/sabitia', label: 'Събития', line: 'Мигове от срещите, работилниците и кръговете, които сме споделяли.', pillar: 'pillar-sabitia' },
];

const STORY = [
  { kicker: 'София', text: 'Родена съм в София. Рисувах, учих езици, плувах. Още тогава ме вълнуваше човешката природа.' },
  { kicker: '16 години Германия', text: 'Дипломирах се като магистър по икономическа география, икономика и психология. Работих като социален психолог с юноши. Станах майка.' },
  { kicker: 'Завръщане', text: 'През 2017 се върнах в България. Пазарът на имоти ме грабна, но психологията и педагогиката никога не ме напуснаха.' },
  { kicker: 'Днес', text: 'Сугестопедия, Валдорфска и Слънчева педагогика, два авторски проекта за личностно развитие. И една по-голяма мечта — център за деца, родители и хора, търсещи яснота със себе си.' },
];

export function HomeExperience() {
  useScrollReveal();

  return (
    <div className="scene">
      {/* ===== HERO — Карина в центъра ===== */}
      <section
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 24px 80px',
        }}
      >
        {/* морфиращи blobs за атмосфера */}
        <div className="blob" style={{ width: 420, height: 420, background: 'var(--lavender)', top: '8%', left: '12%' }} />
        <div className="blob" style={{ width: 360, height: 360, background: 'var(--blush)', bottom: '6%', right: '10%', animationDelay: '6s' }} />
        <div className="blob" style={{ width: 300, height: 300, background: 'var(--sage-soft)', top: '40%', left: '50%', animationDelay: '11s' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 760 }}>
          <div className="eyebrow fade-up" style={{ animationDelay: '0.1s', marginBottom: 24 }}>
            Карина Вълканова
          </div>
          <h1
            className="h-display fade-up"
            style={{ fontSize: 'clamp(44px, 7.5vw, 104px)', marginBottom: 28, animationDelay: '0.25s' }}
          >
            Място за <em>душата</em>,<br />човека и дома
          </h1>
          <p
            className="fade-up"
            style={{ fontSize: 16, fontWeight: 200, lineHeight: 1.9, color: 'var(--mid)', maxWidth: 520, margin: '0 auto', animationDelay: '0.45s' }}
          >
            Психология, педагогика и недвижими имоти — събрани от един човек,
            който вярва, че пространството и душата растат заедно.
          </p>
        </div>

        <div
          className="fade-up"
          style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', animationDelay: '0.9s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
        >
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--light)' }}>
            Историята започва тук
          </span>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(var(--mid), transparent)' }} />
        </div>
      </section>

      {/* ===== ИСТОРИЯТА — scrollytelling ===== */}
      <section className="section-pad" style={{ maxWidth: 900, margin: '0 auto' }}>
        <div className="reveal eyebrow" style={{ marginBottom: 48, textAlign: 'center' }}>
          Моят път
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px, 8vh, 96px)' }}>
          {STORY.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-d${(i % 3) + 1}`}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 160px) 1fr',
                gap: 'clamp(20px, 5vw, 56px)',
                alignItems: 'start',
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)', paddingTop: 12 }}>
                {s.kicker}
              </div>
              <p className="story-line">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== ЦВЕТЕТО-НАВИГАТОР ===== */}
      <section
        className="section-pad"
        style={{
          background: 'linear-gradient(170deg, var(--cream) 0%, var(--cream-2) 50%, var(--lavender-soft) 100%)',
          textAlign: 'center',
        }}
      >
        <div className="reveal eyebrow" style={{ marginBottom: 16 }}>Четири листа, едно цвете</div>
        <h2 className="reveal h-display" style={{ fontSize: 'clamp(30px, 4.5vw, 60px)', marginBottom: 12 }}>
          Всяко венчелистче е <em>свят</em>
        </h2>
        <p className="reveal" style={{ fontSize: 15, fontWeight: 200, color: 'var(--mid)', maxWidth: 460, margin: '0 auto 64px' }}>
          Докосни листо, за да влезеш. В центъра съм аз — това, което свързва всичко.
        </p>
        <div className="reveal reveal-d2">
          <FlowerNav />
        </div>
      </section>

      {/* ===== СТЪЛБОВЕ — врати ===== */}
      <section className="section-pad" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {PILLARS.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={`reveal reveal-d${(i % 4) + 1} accent-card ${p.pillar}`}
              style={{
                background: 'white',
                borderRadius: 'var(--r-lg)',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minHeight: 240,
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', opacity: 0.9 }} />
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400 }}>{p.label}</h3>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.7, color: 'var(--mid)', flex: 1 }}>{p.line}</p>
              <span style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                Влез →
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="section-pad"
        style={{ background: 'var(--text)', color: 'var(--cream)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div className="blob" style={{ width: 360, height: 360, background: 'rgba(212,204,232,0.18)', top: '10%', left: '15%' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto' }}>
          <h2 className="reveal h-display" style={{ fontSize: 'clamp(32px, 5vw, 68px)', color: 'var(--cream)', marginBottom: 32 }}>
            Да се <em style={{ color: 'var(--lavender)' }}>запознаем</em>
          </h2>
          <p className="reveal reveal-d1" style={{ fontSize: 15, fontWeight: 200, lineHeight: 1.9, color: 'rgba(250,247,242,0.6)', marginBottom: 40 }}>
            Независимо дали търсиш дом, обучение за детето си или място за себе си —
            пиши ми. Ще намерим пътя заедно.
          </p>
          <Link href="/kontakt" className="reveal reveal-d2 btn" style={{ background: 'var(--cream)', color: 'var(--text)' }}>
            Свържи се с мен
          </Link>
        </div>
      </section>
    </div>
  );
}
