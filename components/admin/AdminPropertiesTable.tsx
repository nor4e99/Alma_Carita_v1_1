'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Property, PropertyStatus } from '@/lib/types';
import { formatPrice, formatRelativeTime, typeLabel } from '@/lib/utils/format';
import { setPropertyStatus, removeProperty } from '@/lib/actions';

type Tab = 'all' | PropertyStatus;

const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'Всички' },
  { key: 'active', label: 'Активни' },
  { key: 'pending', label: 'Под уговорка' },
  { key: 'sold', label: 'Продадени' },
  { key: 'rented', label: 'Под наем' },
  { key: 'draft', label: 'Чернови' },
];

const STATUS_OPTIONS: { value: PropertyStatus; label: string }[] = [
  { value: 'active', label: 'Активен' },
  { value: 'pending', label: 'Под уговорка' },
  { value: 'sold', label: 'Продаден' },
  { value: 'rented', label: 'Под наем' },
  { value: 'draft', label: 'Чернова' },
];

export function AdminPropertiesTable({ properties }: { properties: Property[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<Tab>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [statusMenuFor, setStatusMenuFor] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: properties.length };
    for (const p of properties) c[p.status] = (c[p.status] ?? 0) + 1;
    return c;
  }, [properties]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return properties.filter((p) => {
      if (tab !== 'all' && p.status !== tab) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q)
      );
    });
  }, [properties, tab, query]);

  const allVisibleSelected = filtered.length > 0 && filtered.every((p) => selected.has(p.id));

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAllVisible() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allVisibleSelected) filtered.forEach((p) => next.delete(p.id));
      else filtered.forEach((p) => next.add(p.id));
      return next;
    });
  }

  function changeStatus(id: string, status: PropertyStatus) {
    setStatusMenuFor(null);
    startTransition(async () => {
      await setPropertyStatus(id, status);
      router.refresh();
    });
  }

  function bulkStatus(status: PropertyStatus) {
    const ids = [...selected];
    startTransition(async () => {
      await Promise.all(ids.map((id) => setPropertyStatus(id, status)));
      setSelected(new Set());
      router.refresh();
    });
  }

  function removeOne(id: string) {
    if (!confirm('Сигурни ли сте, че искате да изтриете тази обява?')) return;
    startTransition(async () => {
      await removeProperty(id);
      router.refresh();
    });
  }

  function bulkDelete() {
    if (!confirm(`Да изтрия ли ${selected.size} избрани обяви?`)) return;
    const ids = [...selected];
    startTransition(async () => {
      await Promise.all(ids.map((id) => removeProperty(id)));
      setSelected(new Set());
      router.refresh();
    });
  }

  return (
    <>
      {/* Topbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24 }}>
        <div>
          <h1 className="h-display" style={{ fontSize: 38, marginBottom: 6 }}>
            Имоти
          </h1>
          <p style={{ fontSize: 13, color: 'var(--mid)' }}>
            Управление на обяви · общо {properties.length} имота в каталога
          </p>
        </div>
        <Link href="/admin/properties/new" className="btn btn-primary btn-sm">
          + Нов имот
        </Link>
      </div>

      {/* Tabs + search */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
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
        <input
          className="input"
          placeholder="Търси по име, локация, ref №…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ maxWidth: 280 }}
        />
      </div>

      {/* Bulk bar */}
      {selected.size > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            background: 'var(--text)',
            color: 'var(--cream)',
            borderRadius: 16,
            padding: '14px 22px',
          }}
        >
          <span style={{ fontSize: 13 }}>
            ✓ Избрани {selected.size} от {properties.length} имота
          </span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <select
              className="select"
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) bulkStatus(e.target.value as PropertyStatus);
                e.currentTarget.value = '';
              }}
              style={{
                background: 'rgba(250,247,242,0.1)',
                color: 'var(--cream)',
                border: '1px solid rgba(250,247,242,0.2)',
                padding: '8px 14px',
                fontSize: 12,
              }}
            >
              <option value="" disabled style={{ color: '#000' }}>
                Промени статус…
              </option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value} style={{ color: '#000' }}>
                  {s.label}
                </option>
              ))}
            </select>
            <button
              onClick={bulkDelete}
              style={{
                background: 'transparent',
                border: '1px solid rgba(232,168,128,0.5)',
                color: '#e8a880',
                borderRadius: 999,
                padding: '8px 16px',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
              }}
            >
              Изтрий
            </button>
            <button
              onClick={() => setSelected(new Set())}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(250,247,242,0.5)',
                fontSize: 12,
                cursor: 'pointer',
                fontFamily: 'var(--sans)',
              }}
            >
              Отказ
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div
        style={{
          background: 'white',
          borderRadius: 20,
          border: '1px solid var(--line)',
          overflow: 'hidden',
          opacity: isPending ? 0.6 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--mid)' }}>
              <th style={{ padding: '14px 0 14px 22px', width: 44 }}>
                <Checkbox checked={allVisibleSelected} onChange={toggleAllVisible} />
              </th>
              <Th>Имот</Th>
              <Th>Локация</Th>
              <Th>Тип</Th>
              <Th>Стаи · м²</Th>
              <Th>Цена</Th>
              <Th>Статус</Th>
              <Th>Прегл.</Th>
              <th style={{ padding: '14px 22px 14px 0', textAlign: 'right', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400 }}>
                Действия
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} style={{ borderTop: '1px solid var(--line)' }}>
                <td style={{ padding: '14px 0 14px 22px' }}>
                  <Checkbox checked={selected.has(p.id)} onChange={() => toggleOne(p.id)} />
                </td>
                <td style={{ padding: '12px 16px 12px 0' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <div className={p.images[0]?.gradient ?? 'g1'} style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: 16 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--light)' }}>
                        {p.id.toUpperCase()} · {formatRelativeTime(p.created_at)}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '12px 16px 12px 0', color: 'var(--mid)' }}>
                  {p.area}, {p.city}
                </td>
                <td style={{ padding: '12px 16px 12px 0', color: 'var(--mid)' }}>{typeLabel(p.type)}</td>
                <td style={{ padding: '12px 16px 12px 0', color: 'var(--mid)' }}>
                  {p.rooms ? `${p.rooms} · ` : ''}
                  {p.area_m2} м²
                </td>
                <td style={{ padding: '12px 16px 12px 0', fontFamily: 'var(--serif)', fontSize: 17, fontWeight: 500 }}>
                  {formatPrice(p.price, p.currency)}
                </td>
                <td style={{ padding: '12px 16px 12px 0', position: 'relative' }}>
                  <button
                    onClick={() => setStatusMenuFor(statusMenuFor === p.id ? null : p.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                  >
                    <span className={`status status-${p.status}`}>
                      <span className="dot" />
                      {STATUS_OPTIONS.find((s) => s.value === p.status)?.label ?? p.status}
                    </span>
                  </button>
                  {statusMenuFor === p.id && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 20,
                        background: 'white',
                        border: '1px solid var(--line-strong)',
                        borderRadius: 12,
                        boxShadow: 'var(--shadow-md)',
                        padding: 6,
                        marginTop: 4,
                        minWidth: 150,
                      }}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s.value}
                          onClick={() => changeStatus(p.id, s.value)}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            background: 'none',
                            border: 'none',
                            padding: '8px 10px',
                            borderRadius: 8,
                            fontSize: 12,
                            cursor: 'pointer',
                            fontFamily: 'var(--sans)',
                            color: p.status === s.value ? 'var(--text)' : 'var(--mid)',
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  )}
                </td>
                <td style={{ padding: '12px 16px 12px 0', color: 'var(--mid)' }}>{p.views ?? 0}</td>
                <td style={{ padding: '12px 22px 12px 0', textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Link
                    href={`/admin/properties/${p.id}/edit`}
                    title="Редактирай"
                    style={{ textDecoration: 'none', fontSize: 15, color: 'var(--mid)', marginRight: 14 }}
                  >
                    ✎
                  </Link>
                  <Link
                    href={`/properties/${p.slug}`}
                    title="Виж публично"
                    style={{ textDecoration: 'none', fontSize: 15, color: 'var(--mid)', marginRight: 14 }}
                  >
                    ↗
                  </Link>
                  <button
                    onClick={() => removeOne(p.id)}
                    title="Изтрий"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 15, color: 'var(--coral)' }}
                  >
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--light)' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 22, marginBottom: 6 }}>Няма намерени имоти</div>
            <div style={{ fontSize: 13 }}>Опитайте друг филтър или търсене.</div>
          </div>
        )}
      </div>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th style={{ padding: '14px 16px 14px 0', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 400 }}>
      {children}
    </th>
  );
}

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <span
      onClick={onChange}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 18,
        height: 18,
        borderRadius: 5,
        border: `1.5px solid ${checked ? 'var(--text)' : 'var(--line-strong)'}`,
        background: checked ? 'var(--text)' : 'transparent',
        color: 'var(--cream)',
        cursor: 'pointer',
        fontSize: 11,
        lineHeight: 1,
      }}
    >
      {checked ? '✓' : ''}
    </span>
  );
}
