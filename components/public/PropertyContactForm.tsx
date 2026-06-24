'use client';

import { useState } from 'react';

interface Props {
  propertyId: string;
  propertyName: string;
}

export function PropertyContactForm({ propertyId, propertyName }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          property_id: propertyId,
          property_name: propertyName,
          name: fd.get('name'),
          email: fd.get('email'),
          phone: fd.get('phone'),
          message: fd.get('message'),
        }),
      });
      if (!res.ok) throw new Error('Грешка');
      setSubmitted(true);
    } catch (err) {
      setError('Възникна грешка. Опитайте отново.');
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
          padding: 28,
          borderRadius: 20,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginBottom: 8 }}>
          Благодаря!
        </div>
        <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.6 }}>
          Получих запитването ви. Ще се свържа с вас до 24 часа.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="field">
        <span className="field-label">Име</span>
        <input className="input" name="name" required placeholder="Вашето име" />
      </div>
      <div className="field">
        <span className="field-label">Имейл</span>
        <input className="input" type="email" name="email" required placeholder="email@example.com" />
      </div>
      <div className="field">
        <span className="field-label">Телефон</span>
        <input className="input" type="tel" name="phone" placeholder="+359 ..." />
      </div>
      <div className="field">
        <span className="field-label">Съобщение</span>
        <textarea
          className="textarea"
          name="message"
          required
          placeholder="Здравейте, бих искал да си запазя време за оглед..."
          defaultValue={`Здравейте, интересувам се за обявата "${propertyName}". Бихте ли се свързали с мен?`}
        />
      </div>
      {error && (
        <div style={{ fontSize: 12, color: '#c04060', padding: '8px 12px', background: 'rgba(192,64,96,0.08)', borderRadius: 8 }}>
          {error}
        </div>
      )}
      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Изпращам...' : 'Изпрати запитване'}
      </button>
      <p style={{ fontSize: 11, color: 'var(--light)', textAlign: 'center', lineHeight: 1.5 }}>
        Карина ще се свърже с вас до 24 часа.
      </p>
    </form>
  );
}
