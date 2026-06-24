'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Training } from '@/lib/types';
import { submitTrainingInterest } from '@/lib/actions';

export function TrainingDetail({ training, others }: { training: Training; others: Training[] }) {
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
      await submitTrainingInterest({
        training_id: training.id,
        training_name: training.title,
        ...form,
      });
      setState('done');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="pillar-obuchenia">
      {/* Hero band */}
      <section className={training.gradient} style={{ position: 'relative', minHeight: 340, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(58,48,40,0.45), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(32px, 6vw, 72px)', maxWidth: 900 }}>
          <Link href="/obuchenia" style={{ fontSize: 12, color: 'rgba(250,247,242,0.85)', marginBottom: 16, display: 'inline-block' }}>
            ← Всички обучения
          </Link>
          <div style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.85)', marginBottom: 10 }}>
            {training.audience}
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 5.5vw, 68px)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
            {training.title}
          </h1>
        </div>
      </section>

      <section className="section-pad" style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>
        {/* Meta row */}
        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          {training.method && <Meta label="Метод" value={training.method} />}
          {training.format && <Meta label="Формат" value={training.format} />}
          {training.duration && <Meta label="Продължителност" value={training.duration} />}
        </div>

        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.6vw, 28px)', fontWeight: 300, lineHeight: 1.5, color: 'var(--text)' }}>
          {training.tagline}
        </p>

        <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.9, color: 'var(--mid)' }}>{training.description}</p>

        {/* Highlights */}
        {training.highlights.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, marginBottom: 18 }}>Какво включва</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
              {training.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', background: 'var(--cream-2)', borderRadius: 'var(--r-md)', padding: '16px 18px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 7, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, fontWeight: 300, color: 'var(--text)' }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interest form */}
        <div id="interes" style={{ background: 'white', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 'clamp(28px, 5vw, 48px)' }}>
          {state === 'done' ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24 }}>✓</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400, marginBottom: 10 }}>Благодаря ти!</h3>
              <p style={{ fontSize: 14, color: 'var(--mid)' }}>Получих интереса ти към „{training.title}" и ще се свържа с теб скоро.</p>
            </div>
          ) : (
            <>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, marginBottom: 8 }}>Проявявам интерес</h3>
              <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 26 }}>
                Остави данните си и ще се свържа с теб за „{training.title}".
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
                  <textarea className="textarea" value={form.message} onChange={(e) => upd('message', e.target.value)} placeholder="Разкажи ми за детето си / за себе си…" />
                </label>
                {state === 'error' && (
                  <p style={{ fontSize: 13, color: 'var(--c-root)' }}>Моля попълни поне име и имейл.</p>
                )}
                <button onClick={submit} disabled={state === 'sending'} className="btn btn-primary" style={{ alignSelf: 'flex-start', opacity: state === 'sending' ? 0.6 : 1 }}>
                  {state === 'sending' ? 'Изпращане…' : 'Изпрати интерес'}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Others */}
        {others.length > 0 && (
          <div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, marginBottom: 18 }}>Други обучения</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              {others.map((o) => (
                <Link key={o.id} href={`/obuchenia/${o.slug}`} className="accent-card" style={{ background: 'white', borderRadius: 'var(--r-md)', overflow: 'hidden' }}>
                  <div className={o.gradient} style={{ height: 90 }} />
                  <div style={{ padding: 16 }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>{o.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--light)', marginTop: 4 }}>{o.audience}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--light)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, color: 'var(--text)' }}>{value}</div>
    </div>
  );
}
