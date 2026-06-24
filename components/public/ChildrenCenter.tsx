'use client';

import { useState } from 'react';
import { useScrollReveal } from '@/lib/utils/useScrollReveal';
import { submitChildrenInterest } from '@/lib/actions';

const PRINCIPLES = [
  { title: 'Детето като цяло', text: 'Не само ученик с оценки, а човек с емоции, ритъм и собствен свят. Виждаме целия него.', icon: '🌱' },
  { title: 'Учене чрез радост', text: 'Сугестопедия и игра — езикът и знанието идват естествено, без страх и натиск.', icon: '🎨' },
  { title: 'Ритъм и природа', text: 'Валдорфската педагогика ни учи да следваме ритъма на детето и сезоните, не часовника.', icon: '🍃' },
  { title: 'Сигурно пространство', text: 'Място, в което детето се чувства прието и свободно да бъде себе си.', icon: '🤲' },
];

export function ChildrenCenter() {
  useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  function upd<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit() {
    if (!form.name || !form.email) {
      setState('error');
      return;
    }
    setState('sending');
    try {
      await submitChildrenInterest(form);
      setState('done');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="pillar-detsa scene">
      {/* Hero */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(120px, 16vh, 180px) clamp(20px, 6vw, 80px) clamp(60px, 10vh, 100px)',
        }}
      >
        <div className="blob" style={{ width: 420, height: 420, background: 'var(--accent)', opacity: 0.18, top: '10%', right: '10%' }} />
        <div className="blob" style={{ width: 340, height: 340, background: 'var(--blush)', bottom: '8%', left: '12%', animationDelay: '7s' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 760 }}>
          <div className="eyebrow fade-up" style={{ color: 'var(--accent)', marginBottom: 24 }}>
            Детски център · грижа и игра
          </div>
          <h1 className="h-display fade-up" style={{ fontSize: 'clamp(42px, 7vw, 96px)', marginBottom: 28, animationDelay: '0.2s' }}>
            Място, където детето <em>разцъфтява</em>
          </h1>
          <p className="fade-up" style={{ fontSize: 16, fontWeight: 200, lineHeight: 1.9, color: 'var(--mid)', maxWidth: 540, margin: '0 auto', animationDelay: '0.4s' }}>
            Мечта, която изкристализира с годините — център за деца и родители,
            в който се учим чрез радост, движение и въображение.
          </p>
        </div>
      </section>

      {/* Принципи */}
      <section className="section-pad" style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="reveal eyebrow" style={{ textAlign: 'center', marginBottom: 14, color: 'var(--accent)' }}>Нашият подход</div>
        <h2 className="reveal h-display" style={{ textAlign: 'center', fontSize: 'clamp(30px, 4.5vw, 56px)', marginBottom: 64 }}>
          Педагогика с <em>душа</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} className={`reveal reveal-d${(i % 4) + 1}`} style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '36px 30px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: 34, marginBottom: 18 }}>{p.icon}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 23, fontWeight: 400, marginBottom: 12 }}>{p.title}</h3>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'var(--mid)' }}>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Цитат/визия */}
      <section className="section-pad" style={{ background: 'linear-gradient(160deg, var(--blush-soft), var(--lavender-soft))', textAlign: 'center' }}>
        <p className="reveal story-line" style={{ maxWidth: 820, margin: '0 auto', fontStyle: 'italic' }}>
          „Грижа за личното пространство — физическо и духовно. Усещането, че от
          положените усилия има полза, смисъл и <em>пристан за всяка душа</em>."
        </p>
        <div className="reveal" style={{ marginTop: 24, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--mid)' }}>
          — Карина Вълканова
        </div>
      </section>

      {/* Интерес форма */}
      <section className="section-pad" style={{ maxWidth: 680, margin: '0 auto' }}>
        <div className="reveal" style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 'clamp(28px, 5vw, 48px)' }}>
          {state === 'done' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>✓</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400, marginBottom: 10 }}>Благодаря ти!</h3>
              <p style={{ fontSize: 14, color: 'var(--mid)' }}>Ще се свържа с теб с повече за детския център.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Искам да науча повече</h3>
              <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 26 }}>
                Центърът тепърва се изгражда. Остави данните си и ще те държа в течение.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                  <label className="field">
                    <span className="field-label">Име</span>
                    <input className="input" value={form.name} onChange={(e) => upd('name', e.target.value)} placeholder="Твоето име" />
                  </label>
                  <label className="field">
                    <span className="field-label">Имейл</span>
                    <input className="input" type="email" value={form.email} onChange={(e) => upd('email', e.target.value)} placeholder="ime@email.bg" />
                  </label>
                </div>
                <label className="field">
                  <span className="field-label">Телефон (по желание)</span>
                  <input className="input" value={form.phone} onChange={(e) => upd('phone', e.target.value)} placeholder="+359…" />
                </label>
                <label className="field">
                  <span className="field-label">Съобщение (по желание)</span>
                  <textarea className="textarea" value={form.message} onChange={(e) => upd('message', e.target.value)} placeholder="На каква възраст е детето ти? Какво търсиш?" />
                </label>
                {state === 'error' && <p style={{ fontSize: 13, color: 'var(--c-root)' }}>Моля попълни поне име и имейл.</p>}
                <button onClick={submit} disabled={state === 'sending'} className="btn btn-primary" style={{ alignSelf: 'flex-start', opacity: state === 'sending' ? 0.6 : 1 }}>
                  {state === 'sending' ? 'Изпращане…' : 'Изпрати'}
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
