import Link from 'next/link';
import { getDashboardStats } from '@/lib/data/queries';
import { formatPrice, formatRelativeTime, typeLabel } from '@/lib/utils/format';

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();
  const now = new Date();
  const hours = now.getHours();
  const greeting = hours < 12 ? 'Добро утро' : hours < 18 ? 'Добър ден' : 'Добра вечер';

  return (
    <>
      {/* Greet card */}
      <section
        style={{
          background: 'linear-gradient(135deg, #f8f4ee 0%, #ece4f0 100%)',
          borderRadius: 28,
          padding: '40px 44px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 32,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,204,232,0.5), transparent)',
          }}
        />
        <div style={{ position: 'relative' }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>{greeting}</div>
          <h1 className="h-display" style={{ fontSize: 42, lineHeight: 1.1, marginBottom: 8 }}>
            Карина, <em>имаш {stats.pendingInquiries} нови запитвания</em>
          </h1>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.6, maxWidth: 480 }}>
            {stats.activeProperties} активни обяви · {stats.totalViews.toLocaleString('bg-BG')} прегледа общо тази седмица.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, position: 'relative' }}>
          <Link href="/admin/properties" className="btn btn-soft btn-sm">
            Виж имотите
          </Link>
          <Link href="/admin/inquiries" className="btn btn-primary btn-sm">
            Виж запитвания
          </Link>
        </div>
      </section>

      {/* Stats grid */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        {[
          { icon: '◊', label: 'Активни обяви', value: stats.activeProperties, change: '+2 този месец', accent: '#6aaa7a' },
          { icon: '✉', label: 'Нови запитвания', value: stats.pendingInquiries, change: 'Изискват отговор', accent: '#e07848' },
          { icon: '◐', label: 'Прегледи (общо)', value: stats.totalViews.toLocaleString('bg-BG'), change: '+18% спрямо миналия', accent: '#7a8fbb' },
          { icon: '◯', label: 'Обяви общо', value: stats.totalProperties, change: 'Включително архив', accent: '#b090c8' },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              background: 'white',
              border: '1px solid var(--line)',
              borderRadius: 20,
              padding: 26,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'var(--cream-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 16,
                  color: stat.accent,
                }}
              >
                {stat.icon}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 32 }}>
                {[0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 1].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: 4,
                      background: stat.accent,
                      opacity: 0.4,
                      borderRadius: 2,
                      height: `${h * 32}px`,
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: 4 }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 500, lineHeight: 1, marginBottom: 6 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--light)' }}>{stat.change}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Two col panels */}
      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Recent properties */}
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--line)' }}>
          <div
            style={{
              padding: '22px 26px',
              borderBottom: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400 }}>
              Скорошни обяви
            </h3>
            <Link
              href="/admin/properties"
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--mid)',
              }}
            >
              Виж всички →
            </Link>
          </div>
          <div>
            {stats.recentProperties.map((p, idx) => (
              <Link
                key={p.id}
                href={`/admin/properties/${p.id}/edit`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '60px 1fr auto auto',
                  gap: 16,
                  padding: '14px 26px',
                  alignItems: 'center',
                  borderTop: idx === 0 ? 'none' : '1px solid var(--line)',
                  transition: 'background 0.2s',
                }}
              >
                <div className={p.images[0]?.gradient ?? 'g1'} style={{ width: 56, height: 56, borderRadius: 12 }} />
                <div>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 17, marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--mid)' }}>
                    {p.area} · {typeLabel(p.type)}
                  </div>
                </div>
                <span className={`status status-${p.status}`}>
                  <span className="dot" />
                  {p.status}
                </span>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 19, fontWeight: 500 }}>
                  {formatPrice(p.price, p.currency)}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent inquiries */}
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid var(--line)' }}>
          <div
            style={{
              padding: '22px 26px',
              borderBottom: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 400 }}>
              Нови запитвания
            </h3>
            <Link
              href="/admin/inquiries"
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--mid)',
              }}
            >
              Всички →
            </Link>
          </div>
          <div>
            {stats.recentInquiries.slice(0, 5).map((inq, idx) => (
              <div
                key={inq.id}
                style={{
                  padding: '16px 26px',
                  borderTop: idx === 0 ? 'none' : '1px solid var(--line)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 16 }}>{inq.name}</div>
                  {inq.status === 'new' && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#e07848',
                      }}
                    />
                  )}
                </div>
                <div style={{ fontSize: 11, color: 'var(--mid)' }}>
                  {(inq.property_name ?? inq.training_name ?? (inq.source === 'children' ? 'Детски център' : 'Общо запитване'))} · {formatRelativeTime(inq.created_at)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.5, opacity: 0.8, marginTop: 2 }}>
                  {inq.message.slice(0, 80)}{inq.message.length > 80 ? '...' : ''}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
