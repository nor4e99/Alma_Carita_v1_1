import Link from 'next/link';
import { getFeaturedProperties } from '@/lib/data/queries';
import { PropertyCard } from '@/components/public/PropertyCard';
import { FlowerDecoration } from '@/components/shared/Logo';

export default async function ImotiLandingPage() {
  const featured = await getFeaturedProperties(5);

  return (
    <>
      {/* ===== HERO ===== */}
      <section
        style={{
          minHeight: 'calc(100vh - 80px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 24px',
          marginTop: -80,
          paddingTop: 160,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 70% at 70% 40%, rgba(212,204,232,0.4) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 30% 70%, rgba(239,216,200,0.35) 0%, transparent 60%),
              radial-gradient(ellipse 40% 50% at 50% 50%, rgba(168,196,160,0.2) 0%, transparent 60%)
            `,
            animation: 'breathe 8s ease-in-out infinite',
          }}
        />
        <FlowerDecoration size={500} opacity={0.06} />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 720 }}>
          <div className="eyebrow fade-up" style={{ animationDelay: '0.2s', marginBottom: 28 }}>
            Недвижими имоти · Холистика · Душа
          </div>
          <h1
            className="h-display fade-up"
            style={{
              animationDelay: '0.4s',
              fontSize: 'clamp(48px, 9vw, 130px)',
              marginBottom: 36,
            }}
          >
            Намери
            <br />
            <em>пространството</em>
            <br />
            за теб
          </h1>
          <p
            className="fade-up"
            style={{
              animationDelay: '0.6s',
              fontSize: 16,
              fontWeight: 200,
              lineHeight: 1.9,
              color: 'var(--mid)',
              maxWidth: 480,
              margin: '0 auto 48px',
            }}
          >
            Всеки дом е жив. Ние намираме твоя.
          </p>
          <div
            className="fade-up"
            style={{ animationDelay: '0.8s', display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Link href="/properties" className="btn btn-primary">
              Разгледай имотите
            </Link>
            <Link href="/za-men" className="btn btn-ghost">
              За мен
            </Link>
          </div>
        </div>
      </section>

      {/* ===== MANIFESTO ===== */}
      <section
        style={{
          background: 'var(--text)',
          color: 'var(--cream)',
          padding: '140px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 80% at 20% 50%, rgba(212,204,232,0.08) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 80% 30%, rgba(168,196,160,0.06) 0%, transparent 60%)
            `,
          }}
        />
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <p
            className="h-display"
            style={{
              fontSize: 'clamp(28px, 5vw, 64px)',
              color: 'rgba(250,247,242,0.9)',
              marginBottom: 32,
            }}
          >
            Домът не е само <em style={{ color: 'rgba(212,204,232,0.8)' }}>адрес.</em>
          </p>
          <div style={{ width: '100%', height: 1, background: 'rgba(250,247,242,0.2)', margin: '48px 0' }} />
          <p
            className="h-display"
            style={{
              fontSize: 'clamp(28px, 5vw, 64px)',
              color: 'rgba(250,247,242,0.9)',
              marginBottom: 32,
            }}
          >
            Той е <em style={{ color: 'rgba(212,204,232,0.8)' }}>усещане,</em> енергия, продължение на <em style={{ color: 'rgba(212,204,232,0.8)' }}>теб.</em>
          </p>
          <div style={{ width: '100%', height: 1, background: 'rgba(250,247,242,0.2)', margin: '48px 0' }} />
          <p
            style={{
              fontSize: 15,
              fontWeight: 200,
              lineHeight: 1.9,
              color: 'rgba(250,247,242,0.5)',
              maxWidth: 480,
            }}
          >
            Alma Carita съчетава намирането на идеалния имот с психологическа подкрепа и
            холистични практики — защото новият дом е началото на нов живот.
          </p>
        </div>
      </section>

      {/* ===== FEATURED PROPERTIES ===== */}
      <section style={{ padding: '120px 48px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 56,
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>
                Избрани обяви
              </div>
              <h2
                className="h-display"
                style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}
              >
                Имоти с <em>характер</em>
              </h2>
            </div>
            <Link
              href="/properties"
              style={{
                fontSize: 12,
                letterSpacing: '0.12em',
                color: 'var(--mid)',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Всички обяви →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 28,
            }}
          >
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOLISTIC SERVICES ===== */}
      <section
        style={{
          background: 'linear-gradient(160deg, #f5f0e8 0%, #ede0d4 40%, #e0d8ec 100%)',
          padding: '120px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 80px' }}>
            <div className="eyebrow" style={{ marginBottom: 16 }}>
              Холистичен подход
            </div>
            <h2 className="h-display" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
              Психология
              <br />
              <em>срещa</em> пространство
            </h2>
            <p
              style={{
                fontSize: 15,
                fontWeight: 200,
                lineHeight: 1.8,
                color: 'var(--mid)',
                marginTop: 24,
              }}
            >
              Карина съчетава психологическа практика с дълбоко разбиране на недвижимите имоти —
              уникална комбинация, която прави разликата.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                icon: '🧘‍♀️',
                title: 'Консултация за пространство',
                text: 'Анализираме енергията и усещането на всеки имот — защото домът влияе пряко на благополучието ти.',
              },
              {
                icon: '🌿',
                title: 'Психологическа подкрепа',
                text: 'Преместването е трансформация. Придружаваме те емоционално на всяка стъпка от процеса.',
              },
              {
                icon: '✨',
                title: 'Намерение и визия',
                text: 'Преди да търсим имот, помагаме ти да разбереш какъв живот искаш да живееш в него.',
              },
            ].map((s) => (
              <div
                key={s.title}
                style={{
                  background: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.8)',
                  borderRadius: 24,
                  padding: '40px 36px',
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 24 }}>{s.icon}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 26, fontWeight: 400, marginBottom: 14, lineHeight: 1.2 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--mid)', lineHeight: 1.8 }}>
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        style={{
          background: 'var(--text)',
          padding: '140px 48px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <FlowerDecoration size={600} opacity={0.04} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(212,204,232,0.6)',
              marginBottom: 32,
            }}
          >
            Готов ли си?
          </div>
          <h2
            className="h-display"
            style={{
              fontSize: 'clamp(40px, 7vw, 100px)',
              color: 'var(--cream)',
              marginBottom: 48,
            }}
          >
            Намери дома
            <br />
            <em style={{ color: 'rgba(212,204,232,0.7)' }}>на душата си</em>
          </h2>
          <Link href="/kontakt" className="btn btn-ghost" style={{ borderColor: 'rgba(250,247,242,0.3)', color: 'var(--cream)' }}>
            Свържи се с нас
          </Link>
        </div>
      </section>
    </>
  );
}
