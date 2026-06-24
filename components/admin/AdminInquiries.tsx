'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Inquiry } from '@/lib/types';
import { formatRelativeTime, formatDate } from '@/lib/utils/format';
import { setInquiryStatus } from '@/lib/actions';

type Tab = 'all' | 'new' | 'replied' | 'archived';

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'Всички' },
  { key: 'new', label: 'Нови' },
  { key: 'replied', label: 'Отговорени' },
  { key: 'archived', label: 'Архив' },
];

const STATUS_LABEL: Record<Inquiry['status'], string> = {
  new: 'Ново',
  replied: 'Отговорено',
  archived: 'Архивирано',
};

function sourceLabel(s: Inquiry['source']): string {
  return s === 'property'
    ? 'Относно имот'
    : s === 'training'
    ? 'Относно обучение'
    : s === 'children'
    ? 'Детски център'
    : 'Общо запитване';
}

function sourceContext(inq: Inquiry): string {
  if (inq.source === 'property') return inq.property_name ?? 'Имот';
  if (inq.source === 'training') return inq.training_name ?? 'Обучение';
  if (inq.source === 'children') return 'Детски център';
  return 'Общо запитване';
}

const SOURCE_TINT: Record<Inquiry['source'], string> = {
  property: 'var(--c-heart)',
  training: 'var(--c-throat)',
  children: 'var(--c-sacral)',
  general: 'var(--light)',
};

export function AdminInquiries({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<Tab>('all');
  const [activeId, setActiveId] = useState<string | null>(inquiries[0]?.id ?? null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: inquiries.length };
    for (const i of inquiries) c[i.status] = (c[i.status] ?? 0) + 1;
    return c;
  }, [inquiries]);

  const filtered = useMemo(
    () => (tab === 'all' ? inquiries : inquiries.filter((i) => i.status === tab)),
    [inquiries, tab],
  );

  const active = inquiries.find((i) => i.id === activeId) ?? filtered[0] ?? null;

  function changeStatus(id: string, status: Inquiry['status']) {
    startTransition(async () => {
      await setInquiryStatus(id, status);
      router.refresh();
    });
  }

  return (
    <>
      <div>
        <h1 className="h-display" style={{ fontSize: 38, marginBottom: 6 }}>
          Запитвания
        </h1>
        <p style={{ fontSize: 13, color: 'var(--mid)' }}>
          {counts.new ?? 0} нови · {inquiries.length} общо
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`pill${tab === t.key ? ' is-active' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            {t.label}
            <span style={{ marginLeft: 8, opacity: 0.6 }}>{counts[t.key] ?? 0}</span>
          </button>
        ))}
      </div>

      {/* Inbox layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 0,
          background: 'white',
          border: '1px solid var(--line)',
          borderRadius: 20,
          overflow: 'hidden',
          minHeight: 520,
          opacity: isPending ? 0.7 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {/* List pane */}
        <div style={{ borderRight: '1px solid var(--line)', overflowY: 'auto', maxHeight: 640 }}>
          {filtered.length === 0 && (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--light)', fontSize: 13 }}>
              Няма запитвания тук.
            </div>
          )}
          {filtered.map((inq) => {
            const isActive = active?.id === inq.id;
            return (
              <button
                key={inq.id}
                onClick={() => setActiveId(inq.id)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  background: isActive ? 'var(--cream-2)' : 'transparent',
                  border: 'none',
                  borderBottom: '1px solid var(--line)',
                  borderLeft: isActive ? '3px solid var(--text)' : '3px solid transparent',
                  padding: '16px 20px',
                  cursor: 'pointer',
                  fontFamily: 'var(--sans)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--text)' }}>{inq.name}</span>
                  {inq.status === 'new' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#e07848' }} />}
                </div>
                <div style={{ fontSize: 11, color: 'var(--light)', marginBottom: 6 }}>
                  <span style={{ display: 'inline-flex', width: 7, height: 7, borderRadius: '50%', background: SOURCE_TINT[inq.source], marginRight: 7, verticalAlign: 'middle' }} />
                  {sourceContext(inq)} · {formatRelativeTime(inq.created_at)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--mid)', lineHeight: 1.5 }}>
                  {inq.message.slice(0, 70)}
                  {inq.message.length > 70 ? '…' : ''}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail pane */}
        <div style={{ padding: '32px 36px' }}>
          {active ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 400, marginBottom: 6 }}>{active.name}</h2>
                  <div style={{ fontSize: 13, color: 'var(--mid)' }}>
                    <a href={`mailto:${active.email}`} style={{ color: 'var(--mid)' }}>{active.email}</a>
                    {active.phone && <> · <a href={`tel:${active.phone}`} style={{ color: 'var(--mid)' }}>{active.phone}</a></>}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--light)', marginTop: 4 }}>{formatDate(active.created_at)}</div>
                </div>
                <span className={`status status-${active.status === 'new' ? 'pending' : active.status === 'replied' ? 'active' : 'draft'}`}>
                  <span className="dot" />
                  {STATUS_LABEL[active.status]}
                </span>
              </div>

              {sourceContext(active) && (
                <div
                  style={{
                    background: 'var(--cream-2)',
                    borderRadius: 14,
                    padding: '14px 18px',
                    marginBottom: 24,
                    fontSize: 13,
                    color: 'var(--mid)',
                  }}
                >
                  {sourceLabel(active.source)}: <strong style={{ color: 'var(--text)' }}>{sourceContext(active)}</strong>
                </div>
              )}

              <div
                style={{
                  fontSize: 15,
                  lineHeight: 1.8,
                  color: 'var(--text)',
                  background: 'white',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  padding: '22px 24px',
                  marginBottom: 28,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {active.message}
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${active.email}?subject=${encodeURIComponent('Re: запитване Alma Carita')}`}
                  className="btn btn-primary btn-sm"
                  style={{ textDecoration: 'none' }}
                  onClick={() => active.status === 'new' && changeStatus(active.id, 'replied')}
                >
                  Отговори на {active.name.split(' ')[0]}
                </a>
                {active.status !== 'replied' && (
                  <button onClick={() => changeStatus(active.id, 'replied')} className="btn btn-soft btn-sm" style={{ cursor: 'pointer' }}>
                    Маркирай отговорено
                  </button>
                )}
                {active.status !== 'archived' ? (
                  <button onClick={() => changeStatus(active.id, 'archived')} className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
                    Архивирай
                  </button>
                ) : (
                  <button onClick={() => changeStatus(active.id, 'new')} className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
                    Възстанови
                  </button>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--light)', fontSize: 14 }}>
              Изберете запитване от списъка.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
