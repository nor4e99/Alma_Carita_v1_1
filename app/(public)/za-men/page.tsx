import Link from 'next/link';

export const metadata = {
  title: 'За мен — Карина Вълканова | Alma Carita',
  description: 'Карина Вълканова — брокер, психолог, холистичен подход. 16 години в Германия. Холистична визия за недвижимите имоти в България.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          background: 'linear-gradient(160deg, #f8f4ee 0%, #f0e8de 50%, #ece4f0 100%)',
          padding: '120px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 60% 70% at 80% 30%, rgba(212,204,232,0.3) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 10% 70%, rgba(168,196,160,0.2) 0%, transparent 60%)
            `,
          }}
        />

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Portrait */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: '32px 32px 120px 32px',
                background: 'linear-gradient(145deg, #e8ddd0, #d8cce0)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
                <svg width="80" height="80" viewBox="0 0 80 80" fill="none" opacity={0.3}>
                  <circle cx="40" cy="30" r="18" fill="#3a3028" />
                  <ellipse cx="40" cy="72" rx="28" ry="18" fill="#3a3028" />
                </svg>
                <span style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(58,48,40,0.3)' }}>
                  Снимка на Карина
                </span>
              </div>
            </div>

            {/* Floating quote */}
            <div
              style={{
                position: 'absolute',
                bottom: -28,
                right: -28,
                background: 'white',
                borderRadius: 20,
                padding: '24px 28px',
                maxWidth: 280,
                boxShadow: 'var(--shadow-md)',
                border: '1px solid rgba(255,255,255,0.8)',
              }}
            >
              <p style={{ fontFamily: 'var(--serif)', fontSize: 17, fontStyle: 'italic', lineHeight: 1.5, marginBottom: 12 }}>
                „Сделката не е на всяка цена — важното е ти да си спокоен и сигурен."
              </p>
              <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--light)' }}>
                — Карина Вълканова
              </div>
            </div>

            {/* Chakra dots */}
            <div style={{ position: 'absolute', top: 24, left: -20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['#c04060', '#e07848', '#d4b840', '#6aaa7a', '#7a8fbb', '#9080b8', '#b090c8'].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.5 }} />
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 20 }}>За мен</div>
            <h1 className="h-display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', marginBottom: 32 }}>
              Карина
              <br />
              <em>Вълканова</em>
            </h1>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: 'var(--mid)', marginBottom: 24 }}>
              Живях, учих и работих в Германия 16 години. Върнах се в България, защото тук се чувствам
              най-добре — и защото вярвам, че тук има нещо красиво, което заслужава да бъде видяно и опазено.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: 'var(--mid)', marginBottom: 36 }}>
              За мен работата с имоти е много повече от сделки и квадратури. Тя е за хората — за доверието,
              за това да намериш пространство, в което наистина да се чувстваш у дома.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '120px 48px', background: 'var(--cream)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Моите ценности</div>
            <h2 className="h-display" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
              Подходът, който <em>прави разлика</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {[
              {
                icon: '🤝',
                title: 'Химия и доверие',
                text: 'Трябва да има истинска връзка между клиент и брокер. Работя само така.',
              },
              {
                icon: '🏛️',
                title: 'Визия за по-красив град',
                text: 'Вярвам в реставрацията, в кварталите, в градовете — домът не е само крепост.',
              },
              {
                icon: '🌿',
                title: 'Холистичен подход',
                text: 'Психология и осъзнатост като основа — защото новият дом е ново начало.',
              },
              {
                icon: '✨',
                title: 'Без натиск',
                text: 'Никога няма да продам имот само за продажба. Чакам докато усетим, че е твоят.',
              },
            ].map((v) => (
              <div
                key={v.title}
                style={{
                  background: 'white',
                  borderRadius: 20,
                  padding: '32px 28px',
                  border: '1px solid var(--line)',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 20 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: 22, marginBottom: 12, fontWeight: 400 }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.8 }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          background: 'var(--text)',
          color: 'var(--cream)',
          padding: '100px 48px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h3 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--cream)', marginBottom: 32 }}>
            Готов ли си да започнем <em style={{ color: 'rgba(212,204,232,0.7)' }}>заедно?</em>
          </h3>
          <Link href="/kontakt" className="btn btn-ghost" style={{ borderColor: 'rgba(250,247,242,0.3)', color: 'var(--cream)' }}>
            Свържи се с мен
          </Link>
        </div>
      </section>
    </>
  );
}
