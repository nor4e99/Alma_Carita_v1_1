'use client';

import { useState } from 'react';

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_name: 'Общо запитване',
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message'),
        }),
      });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          background: 'rgba(168,196,160,0.12)',
          border: '1px solid rgba(168,196,160,0.3)',
          padding: 40,
          borderRadius: 20,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
        <h3 className="h-display" style={{ fontSize: 28, marginBottom: 12 }}>
          Благодаря!
        </h3>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
          Получих съобщението ви. Карина ще се свърже с вас до 24 часа.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="field">
          <span className="field-label">Име *</span>
          <input className="input" name="name" required />
        </div>
        <div className="field">
          <span className="field-label">Имейл *</span>
          <input className="input" type="email" name="email" required />
        </div>
      </div>
      <div className="field">
        <span className="field-label">Телефон</span>
        <input className="input" type="tel" name="phone" />
      </div>
      <div className="field">
        <span className="field-label">Съобщение *</span>
        <textarea className="textarea" name="message" required rows={6} placeholder="Разкажи ми за какво търсиш..." />
      </div>
      <button type="submit" className="btn btn-primary" disabled={submitting} style={{ alignSelf: 'flex-start' }}>
        {submitting ? 'Изпращам...' : 'Изпрати съобщение'}
      </button>
    </form>
  );
}
