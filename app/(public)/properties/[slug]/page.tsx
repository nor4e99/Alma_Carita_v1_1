import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPropertyBySlug, getSimilarProperties } from '@/lib/data/queries';
import { PropertyGallery } from '@/components/public/PropertyGallery';
import { PropertyContactForm } from '@/components/public/PropertyContactForm';
import { PropertyCard } from '@/components/public/PropertyCard';
import { formatPrice, typeLabel } from '@/lib/utils/format';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) return { title: 'Имот не е намерен' };
  return {
    title: `${property.name} — ${formatPrice(property.price, property.currency)} | Alma Carita`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const property = await getPropertyBySlug(params.slug);
  if (!property) notFound();

  const similar = await getSimilarProperties(property, 3);

  return (
    <div style={{ background: 'var(--cream)' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '40px 48px 0' }}>
        <div style={{ fontSize: 12, color: 'var(--mid)', letterSpacing: '0.04em' }}>
          <Link href="/" style={{ color: 'var(--mid)' }}>Начало</Link>
          <span style={{ margin: '0 10px', color: 'var(--light)' }}>/</span>
          <Link href="/properties" style={{ color: 'var(--mid)' }}>Имоти</Link>
          <span style={{ margin: '0 10px', color: 'var(--light)' }}>/</span>
          <span style={{ color: 'var(--text)' }}>{property.name}</span>
        </div>
      </div>

      {/* Main grid */}
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '32px 48px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: 56,
          alignItems: 'flex-start',
        }}
      >
        {/* Left column */}
        <div>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div className="eyebrow" style={{ marginBottom: 12, color: 'var(--mid)' }}>
              📍 {property.area}, {property.city}
            </div>
            <h1 className="h-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 16 }}>
              {property.name}
            </h1>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="pill">{typeLabel(property.type)}</span>
              {property.rooms && <span className="pill">{property.rooms} стаи</span>}
              <span className="pill">{property.area_m2} м²</span>
              {property.floor && (
                <span className="pill">
                  Етаж {property.floor}{property.total_floors ? ` / ${property.total_floors}` : ''}
                </span>
              )}
              {property.year_built && <span className="pill">{property.year_built} г.</span>}
              {property.energy_class && <span className="pill">Клас {property.energy_class}</span>}
            </div>
          </div>

          {/* Gallery */}
          <PropertyGallery images={property.images} />

          {/* Description */}
          <div style={{ marginTop: 48 }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Описание</div>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.9,
                color: 'var(--text)',
                fontWeight: 300,
                whiteSpace: 'pre-line',
              }}
            >
              {property.description}
            </p>
          </div>

          {/* Features */}
          {property.features.length > 0 && (
            <div style={{ marginTop: 48 }}>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Какво включва</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {property.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '14px 18px',
                      background: 'white',
                      borderRadius: 14,
                      border: '1px solid var(--line)',
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: 'var(--c-heart)', fontSize: 16 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Holistic block */}
          <div
            style={{
              marginTop: 56,
              padding: '40px 36px',
              background: 'linear-gradient(135deg, #f5f0e8 0%, #ece4f0 100%)',
              borderRadius: 24,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="eyebrow" style={{ marginBottom: 16 }}>Холистичен поглед</div>
            <h3 className="h-display" style={{ fontSize: 28, marginBottom: 16 }}>
              Усещане за <em>пространство</em>
            </h3>
            <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.8, maxWidth: 560 }}>
              Преди да решиш, ела за оглед с мен. Заедно ще усетим енергията на мястото и ще
              разберем дали то отговаря на това, което търсиш — не само като квадратура, а
              като живот.
            </p>
          </div>
        </div>

        {/* Right sticky sidebar */}
        <aside style={{ position: 'sticky', top: 100 }}>
          <div
            style={{
              background: 'white',
              borderRadius: 24,
              padding: 32,
              border: '1px solid var(--line)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--serif)',
                fontSize: 42,
                fontWeight: 500,
                marginBottom: 8,
                lineHeight: 1,
              }}
            >
              {formatPrice(property.price, property.currency)}
            </div>
            <div style={{ fontSize: 12, color: 'var(--mid)', marginBottom: 24 }}>
              {Math.round(property.price / property.area_m2)} € / м²
            </div>

            <div style={{ height: 1, background: 'var(--line)', margin: '8px 0 24px' }} />

            <div style={{ fontFamily: 'var(--serif)', fontSize: 20, marginBottom: 6 }}>
              Карина Вълканова
            </div>
            <div style={{ fontSize: 12, color: 'var(--mid)', marginBottom: 24 }}>
              Брокер · Психолог · Холистичен подход
            </div>

            <PropertyContactForm propertyId={property.id} propertyName={property.name} />
          </div>
        </aside>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <section style={{ background: 'white', padding: '100px 48px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Подобни обяви</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', marginBottom: 40 }}>
              Може <em>да те интересува</em>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 28 }}>
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
