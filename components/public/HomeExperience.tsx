'use client';

import Link from 'next/link';
import { useScrollReveal } from '@/lib/utils/useScrollReveal';
import { useParallax } from '@/lib/utils/useParallax';
import { FlowerNav } from '@/components/public/FlowerNav';
import { FlowerMark } from '@/components/shared/Logo';

const PILLARS = [
  { href: '/imoti', label: 'Имоти', line: 'Намирам не просто дом, а пространство, в което човек се чувства на мястото си.', color: '#5bb04f', dark: '#3d8a37' },
  { href: '/obuchenia', label: 'Обучения', line: 'Програми за деца, юноши и родители — от психологията и педагогиката, които обичам.', color: '#4163bd', dark: '#2e4a96' },
  { href: '/detski-tsentar', label: 'Детски център', line: 'Място, където детето е видяно като цяло — с игра, грижа и уважение.', color: '#f07b2e', dark: '#d05f18' },
  { href: '/sabitia', label: 'Събития', line: 'Мигове от срещите, работилниците и кръговете, които сме споделяли.', color: '#f4c430', dark: '#d9a818' },
];

const STORY = [
  { kicker: 'София', text: 'Родена съм в София. Рисувах, учих езици, плувах. Още тогава ме вълнуваше човешката природа.' },
  { kicker: '16 години Германия', text: 'Магистър по икономическа география, икономика и психология. Социален психолог с юноши. И майка за първи път.' },
  { kicker: 'Завръщане', text: 'През 2017 се върнах в България. Пазарът на имоти ме грабна, но психологията и педагогиката никога не ме напуснаха.' },
  { kicker: 'Днес', text: 'Сугестопедия, Валдорф, два авторски проекта за деца. И една по-голяма мечта — център за деца, родители и хора, търсещи яснота със себе си.' },
];

export function HomeExperience() {
  useScrollReveal();
  useParallax();

  return (
    <div>
      {/* ===== HERO ===== */}
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
          padding: 'clamp(80px, 14vh, 120px) clamp(16px, 5vw, 24px) clamp(60px, 10vh, 80px)',
        }}
      >
        {/* дълбочинни слоеве — парралакс */}
        <div data-parallax="0.6" className="blob" style={{ width: 'min(460px, 70vw)', height: 'min(460px, 70vw)', background: 'var(--lavender)', top: '4%', left: '8%' }} />
        <div data-parallax="1.0" className="blob" style={{ width: 'min(380px, 60vw)', height: 'min(380px, 60vw)', background: 'var(--blush)', bottom: '2%', right: '6%', animationDelay: '6s' }} />
        <div data-parallax="0.4" className="blob" style={{ width: 'min(320px, 50vw)', height: 'min(320px, 50vw)', background: 'var(--sage-soft)', top: '38%', left: '52%', animationDelay: '11s' }} />

        {/* голямо бавно въртящо цвете отзад */}
        <div data-parallax="0.3" style={{ position: 'absolute', top: '46%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.12, pointerEvents: 'none' }}>
          <div style={{ animation: 'spin-slow 60s linear infinite' }}>
            <FlowerMark size={620} withAura={false} idSuffix="herobg" />
          </div>
        </div>

        {/* орбитиращи малки цветчета */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `${[18, 70, 28, 80, 55][i]}%`,
                left: `${[12, 22, 84, 78, 92][i]}%`,
                opacity: 0.5,
                animation: `float-soft ${5 + i}s ease-in-out ${i * 0.7}s infinite`,
              }}
            >
              <FlowerMark size={[34, 26, 30, 22, 28][i]} withAura={false} idSuffix={`orb${i}`} />
            </div>
          ))}
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 780 }}>
          <div className="fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 26, animationDelay: '0.05s' }}>
            <div style={{ animation: 'flower-spin-breathe 14s ease-in-out infinite, pulse-glow 4s ease-in-out infinite' }}>
              <FlowerMark size={116} idSuffix="hero" />
            </div>
          </div>
          <div className="eyebrow fade-up" style={{ animationDelay: '0.15s', marginBottom: 22 }}>
            Карина Вълканова
          </div>
          <h1 className="h-display fade-up" style={{ fontSize: 'clamp(38px, 8vw, 110px)', marginBottom: 26, animationDelay: '0.3s' }}>
            Място за <em>душата</em>,<br />човека и дома
          </h1>
          <p className="fade-up" style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', fontWeight: 200, lineHeight: 1.9, color: 'var(--mid)', maxWidth: 520, margin: '0 auto', animationDelay: '0.5s' }}>
            Психология, педагогика и недвижими имоти — събрани от един човек,
            който вярва, че пространството и душата растат заедно.
          </p>
        </div>

        <div className="fade-up" style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', animationDelay: '1s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--light)' }}>Историята започва тук</span>
          <div style={{ width: 1, height: 50, background: 'linear-gradient(var(--mid), transparent)', animation: 'scroll-hint 2s ease-in-out infinite' }} />
        </div>
      </section>

      {/* ===== ИСТОРИЯ — scrollytelling ===== */}
      <section className="section-pad" style={{ maxWidth: 920, margin: '0 auto', position: 'relative' }}>
        <div className="reveal eyebrow" style={{ marginBottom: 56, textAlign: 'center' }}>Моят път</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px, 10vh, 120px)' }}>
          {STORY.map((s, i) => (
            <div
              key={i}
              className={`${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} story-item`}
            >
              <div data-parallax="0.5" style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--purple)', paddingTop: 14 }}>
                <span style={{ display: 'block', fontSize: 28, fontFamily: 'var(--serif)', color: 'var(--c-sacral)', marginBottom: 8, opacity: 0.5 }}>0{i + 1}</span>
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
        style={{ background: 'linear-gradient(170deg, var(--cream) 0%, var(--cream-2) 45%, var(--lavender-soft) 100%)', textAlign: 'center', overflow: 'hidden' }}
      >
        <div className="reveal eyebrow" style={{ marginBottom: 16 }}>Четири листа, едно цвете</div>
        <h2 className="reveal h-display" style={{ fontSize: 'clamp(26px, 4.5vw, 60px)', marginBottom: 12 }}>
          Всяко венчелистче е <em>свят</em>
        </h2>
        <p className="reveal" style={{ fontSize: 'clamp(13px, 3.2vw, 15px)', fontWeight: 200, color: 'var(--mid)', maxWidth: 440, margin: '0 auto 56px' }}>
          Докосни листо, за да влезеш. В центъра съм аз — това, което свързва всичко.
        </p>
        <div className="reveal-scale">
          <FlowerNav />
        </div>
      </section>

      {/* ===== СТЪЛБОВЕ ===== */}
      <section className="section-pad" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 24 }}>
          {PILLARS.map((p, i) => (
            <Link
              key={p.href}
              href={p.href}
              className={`reveal reveal-d${i + 1} pillar-card tap-feedback`}
              style={{
                ['--accent' as string]: p.color,
                ['--accent-dark' as string]: p.dark,
                background: 'white',
                borderRadius: 'var(--r-lg)',
                padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                minHeight: 'clamp(200px, 30vw, 250px)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span className="pillar-card-glow" />
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: `radial-gradient(circle at 35% 30%, ${p.color}, ${p.dark})`, position: 'relative', zIndex: 1, transition: 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)' }} />
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3.5vw, 27px)', fontWeight: 400, position: 'relative', zIndex: 1 }}>{p.label}</h3>
              <p style={{ fontSize: 'clamp(13px, 2.5vw, 14px)', fontWeight: 300, lineHeight: 1.7, color: 'var(--mid)', flex: 1, position: 'relative', zIndex: 1 }}>{p.line}</p>
              <span style={{ fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: p.dark, position: 'relative', zIndex: 1, transition: 'transform 0.3s ease' }}>Влез →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section-pad" style={{ background: 'var(--text)', color: 'var(--cream)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div data-parallax="0.7" className="blob" style={{ width: 'min(380px, 60vw)', height: 'min(380px, 60vw)', background: 'rgba(212,204,232,0.2)', top: '8%', left: '12%' }} />
        <div data-parallax="1.1" className="blob" style={{ width: 'min(300px, 50vw)', height: 'min(300px, 50vw)', background: 'rgba(240,123,46,0.14)', bottom: '4%', right: '14%', animationDelay: '5s' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto' }}>
          <h2 className="reveal h-display" style={{ fontSize: 'clamp(28px, 5vw, 68px)', color: 'var(--cream)', marginBottom: 32 }}>
            Да се <em style={{ color: 'var(--lavender)' }}>запознаем</em>
          </h2>
          <p className="reveal" style={{ fontSize: 'clamp(13px, 3.2vw, 15px)', fontWeight: 200, lineHeight: 1.9, color: 'rgba(250,247,242,0.6)', marginBottom: 40 }}>
            Независимо дали търсиш дом, обучение за детето си или място за себе си — пиши ми. Ще намерим пътя заедно.
          </p>
          <Link href="/kontakt" className="reveal btn tap-feedback" style={{ background: 'var(--cream)', color: 'var(--text)' }}>
            Свържи се с мен
          </Link>
        </div>
      </section>
    </div>
  );
}
