import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getEventBySlug } from '@/lib/data/queries';
import { formatDate } from '@/lib/utils/format';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const ev = await getEventBySlug(params.slug);
  return { title: ev ? `${ev.title} · Събития` : 'Събитие' };
}

export default async function EventDetailPage({ params }: { params: { slug: string } }) {
  const ev = await getEventBySlug(params.slug);
  if (!ev || !ev.published) notFound();

  return (
    <div className="pillar-sabitia">
      <section
        className={ev.gallery[0]?.startsWith('/') ? undefined : (ev.gallery[0] ?? 'g1')}
        style={{
          position: 'relative',
          minHeight: 380,
          display: 'flex',
          alignItems: 'flex-end',
          backgroundImage: ev.gallery[0]?.startsWith('/') ? `url(${ev.gallery[0]})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(58,48,40,0.5), transparent 60%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(32px, 6vw, 72px)', maxWidth: 900 }}>
          <Link href="/sabitia" style={{ fontSize: 12, color: 'rgba(250,247,242,0.85)', marginBottom: 16, display: 'inline-block' }}>
            ← Всички събития
          </Link>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.9)' }}>
              {formatDate(ev.date)} · {ev.location}
            </span>
            {ev.role && (
              <span style={{ fontSize: 11, background: 'rgba(250,247,242,0.9)', color: 'var(--text)', padding: '3px 12px', borderRadius: 999 }}>
                {ev.role}
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(34px, 5.5vw, 68px)', fontWeight: 300, color: 'white', lineHeight: 1.05 }}>
            {ev.title}
          </h1>
        </div>
      </section>

      <section className="section-pad" style={{ maxWidth: 760, margin: '0 auto' }}>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.6vw, 26px)', fontWeight: 300, lineHeight: 1.5, color: 'var(--text)', marginBottom: 32 }}>
          {ev.excerpt}
        </p>
        <p style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.95, color: 'var(--mid)', marginBottom: 48 }}>{ev.body}</p>

        {/* Галерия */}
        {ev.gallery.length > 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {ev.gallery.map((g, i) => (
              <div
                key={i}
                className={g.startsWith('/') ? undefined : g}
                style={{
                  aspectRatio: '4/3',
                  borderRadius: 'var(--r-md)',
                  backgroundImage: g.startsWith('/') ? `url(${g})` : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
          </div>
        )}
      </section>

      <section style={{ textAlign: 'center', padding: '0 24px clamp(80px, 12vh, 140px)' }}>
        <Link href="/sabitia" className="btn btn-ghost">Назад към събитията</Link>
      </section>
    </div>
  );
}
