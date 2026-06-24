import { ContactForm } from '@/components/public/ContactForm';

export const metadata = {
  title: 'Контакт — Alma Carita',
  description: 'Свържи се с Карина — недвижими имоти с холистичен подход.',
};

const faqs = [
  {
    q: 'Само в София ли работите?',
    a: 'Основно в София и околностите. За специфични проекти приемам обекти и в други градове и региони.',
  },
  {
    q: 'Каква е комисионната?',
    a: 'Стандартна за индустрията — обсъждаме конкретно за всеки случай преди подписване. Без скрити такси, без изненади.',
  },
  {
    q: 'Включена ли е холистичната консултация?',
    a: 'При работа с мен — да. Това е част от подхода, не допълнителна услуга.',
  },
  {
    q: 'Какво ако още не съм решил какво търся?',
    a: 'Това е любимата ми работа — да помогна да разбереш. Започваме с разговор, без ангажимент.',
  },
];

export default function ContactPage() {
  return (
    <div style={{ background: 'var(--cream)' }}>
      <section style={{ padding: '80px 48px 60px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Контакт</div>
          <h1 className="h-display" style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}>
            Да поговорим
            <br />
            <em>за дома ти</em>
          </h1>
          <p style={{ fontSize: 16, fontWeight: 200, lineHeight: 1.8, color: 'var(--mid)', maxWidth: 540, margin: '24px auto 0' }}>
            Първият разговор е винаги безплатен. Без обвързване, без натиск — просто поглед накъде вървим.
          </p>
        </div>
      </section>

      <section style={{ padding: '40px 48px 100px' }}>
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'flex-start',
          }}
        >
          {/* Info side */}
          <div>
            <div
              style={{
                background: 'white',
                padding: 36,
                borderRadius: 24,
                border: '1px solid var(--line)',
                marginBottom: 24,
              }}
            >
              <div className="eyebrow" style={{ marginBottom: 16 }}>Директен контакт</div>
              <h3 className="h-display" style={{ fontSize: 28, marginBottom: 24 }}>
                Карина <em>Вълканова</em>
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ fontSize: 18 }}>📧</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--light)', letterSpacing: '0.08em' }}>ИМЕЙЛ</div>
                    <div style={{ fontSize: 14 }}>karina@almacarita.bg</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ fontSize: 18 }}>📱</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--light)', letterSpacing: '0.08em' }}>ТЕЛЕФОН</div>
                    <div style={{ fontSize: 14 }}>+359 88 ХХХ ХХХХ</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div style={{ fontSize: 18 }}>📍</div>
                  <div>
                    <div style={{ fontSize: 11, color: 'var(--light)', letterSpacing: '0.08em' }}>ЛОКАЦИЯ</div>
                    <div style={{ fontSize: 14 }}>София, България</div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="eyebrow" style={{ marginBottom: 16, marginTop: 32 }}>Често задавани</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {faqs.map((f, i) => (
                <details
                  key={i}
                  style={{
                    background: 'white',
                    padding: '18px 22px',
                    borderRadius: 14,
                    border: '1px solid var(--line)',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontFamily: 'var(--serif)',
                      fontSize: 17,
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    {f.q}
                    <span style={{ fontSize: 18, color: 'var(--light)' }}>+</span>
                  </summary>
                  <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.7, marginTop: 12 }}>
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Form side */}
          <div
            style={{
              background: 'white',
              padding: 40,
              borderRadius: 24,
              border: '1px solid var(--line)',
              position: 'sticky',
              top: 100,
            }}
          >
            <h3 className="h-display" style={{ fontSize: 28, marginBottom: 8 }}>
              Изпрати <em>съобщение</em>
            </h3>
            <p style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 28, lineHeight: 1.6 }}>
              Ще ти отговоря лично до 24 часа.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
