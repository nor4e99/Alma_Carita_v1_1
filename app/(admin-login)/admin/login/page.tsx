'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Logo, FlowerDecoration } from '@/components/shared/Logo';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    // Phase 2: реален Supabase auth.signInWithPassword
    setTimeout(() => router.push('/admin'), 600);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '100vh' }}>
      {/* LEFT — atmospheric */}
      <div
        style={{
          background: 'var(--text)',
          color: 'var(--cream)',
          padding: 56,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 70% at 70% 40%, rgba(212,204,232,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 20% 80%, rgba(168,196,160,0.08) 0%, transparent 60%)
            `,
            animation: 'breathe 12s ease-in-out infinite',
          }}
        />
        <FlowerDecoration size={700} opacity={0.05} />

        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative', zIndex: 2 }}
        >
          <Logo size={36} variant="light" showText={false} />
          <span style={{ fontFamily: 'var(--serif)', fontSize: 22, letterSpacing: '0.05em', color: 'var(--cream)' }}>
            Alma Carita
          </span>
          <span style={{ color: 'rgba(250,247,242,0.4)', fontSize: 14, marginLeft: 4 }}>PMS</span>
        </Link>

        <div style={{ margin: 'auto 0', position: 'relative', zIndex: 2 }}>
          <div className="eyebrow" style={{ color: 'rgba(212,204,232,0.6)', marginBottom: 28 }}>
            Property Management System
          </div>
          <h1
            className="h-display"
            style={{
              fontSize: 'clamp(40px, 5vw, 68px)',
              color: 'var(--cream)',
              marginBottom: 24,
            }}
          >
            Управлявай <em style={{ color: 'rgba(212,204,232,0.7)' }}>обявите си</em>
            <br />с яснота
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: 'rgba(250,247,242,0.6)', maxWidth: 400, fontWeight: 300 }}>
            Защитена административна зона за управление на имоти, клиенти и запитвания.
          </p>
        </div>

        <div style={{ position: 'relative', zIndex: 2, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(250,247,242,0.3)' }}>
          Версия 1.0 · Защитена среда · Изградено с любов
        </div>
      </div>

      {/* RIGHT — form */}
      <div
        style={{
          background: 'var(--cream)',
          padding: 56,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 56,
            right: 56,
            background: 'rgba(168,196,160,0.18)',
            color: '#5e8056',
            padding: '7px 14px',
            borderRadius: 999,
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#6aaa7a' }} />
          Системата работи
        </div>

        <div style={{ maxWidth: 420, width: '100%', margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Вход</div>
            <h2 className="h-display" style={{ fontSize: 40, marginBottom: 10 }}>
              Добре дошла,
              <br />
              <em>Карина</em>
            </h2>
            <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.6 }}>
              Влез в системата за управление на имоти и клиенти.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div className="field">
              <span className="field-label">Имейл</span>
              <input className="input" type="email" defaultValue="karina@almacarita.bg" />
            </div>
            <div className="field">
              <span className="field-label">Парола</span>
              <input className="input" type="password" defaultValue="••••••••••••" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer' }}>
                <input type="checkbox" defaultChecked style={{ width: 16, height: 16 }} />
                Запомни ме
              </label>
              <a href="#" style={{ fontSize: 12, color: 'var(--mid)', borderBottom: '1px solid var(--line-strong)', paddingBottom: 2 }}>
                Забравена парола?
              </a>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 18 }} disabled={submitting}>
              {submitting ? 'Влизам...' : 'Влез в системата →'}
            </button>
          </form>

          <div style={{ marginTop: 36, textAlign: 'center', fontSize: 11, color: 'var(--light)', lineHeight: 1.8 }}>
            <strong style={{ color: 'var(--mid)', fontWeight: 400 }}>Phase 1 prototype:</strong>{' '}
            Кликни „Влез", за да видиш админ зоната.
            <br />Истинска автентикация се добавя във Фаза 2 (Supabase Auth).
          </div>
        </div>
      </div>
    </div>
  );
}
