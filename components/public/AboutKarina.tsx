'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useScrollReveal } from '@/lib/utils/useScrollReveal';
import { useParallax } from '@/lib/utils/useParallax';

const JOURNEY = [
  {
    period: 'София · началото',
    text: 'Родена съм в София, където живях до 18-ата си година. Завърших основното си образование с рисуване, после учих немски и испански. Плувах, играех тенис, карах ски. Четях книги за духовно и личностно развитие. Още тогава ме вълнуваше човешката природа — защо човек мисли и постъпва по определен начин.',
  },
  {
    period: '16 години Германия',
    text: 'Отидох да следвам веднага след средното образование. Дипломирах се като магистър в три факултета — икономическа география, икономика и психология. Работих с деца, разработих собствен проект за личностно развитие за юноши, бях ресурсен учител. После работих като социален психолог с проблемни юноши. Междувременно станах майка за първи път. Германия ме научи на отговорност, упоритост и постоянство.',
  },
  {
    period: 'Завръщане · 2017',
    text: 'Върнах се в България и работих с немски език за Amazon — отговарях за рискови клиенти от Австрия, Швейцария и Германия. Тогава пазарът на недвижими имоти ми стана интересен. Обучих се в голяма Real Estate компания в София и получих сертификат за брокер към НСНИ. Мои ментори бяха Иван Козаров (Arco Real Estate) и Георги Янков (Примо плюс).',
  },
  {
    period: 'Педагогика',
    text: 'Завърших обучение за сугестопедично преподаване, методите на Валдорфската педагогика и Слънчевата педагогика. Преподавах сугестопедично немски на деца в начална училищна възраст и помагах като обучител в частна занималня.',
  },
  {
    period: 'Варна · вторият проект',
    text: 'След като се преместих във Варна, станах майка за втори път. Занимавах се педагогически с деца в предучилищна възраст и разработих втори авторски проект за личностно развитие — за деца от 4. до 7. клас.',
  },
  {
    period: 'Днес',
    text: 'След майчинството отворих своя агенция за недвижими имоти, която развивам и до днес. В работата си харесвам да се грижа за личното пространство — физическо и духовно. Сега съм в София и при мен изкристализира необходимостта да създам детски център за деца и родители, и холистичен център за хора, желаещи да живеят в яснота със себе си.',
  },
];

const VALUES = [
  { icon: '🤝', title: 'Химия и доверие', text: 'Истинска връзка между клиент и брокер. Работя само така.' },
  { icon: '🏛️', title: 'Визия за по-красив град', text: 'Вярвам в реставрацията, в кварталите, в градовете — домът не е само крепост.' },
  { icon: '🌿', title: 'Холистичен подход', text: 'Психология и осъзнатост като основа — защото новият дом е нов начин на живот.' },
];

export function AboutKarina() {
  useScrollReveal();
  useParallax();

  return (
    <div className="pillar-karina scene">
      {/* Hero — портрет + интро */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(120px, 16vh, 180px) clamp(20px, 6vw, 80px) clamp(60px, 9vh, 110px)',
          background: 'linear-gradient(165deg, var(--cream) 0%, var(--cream-2) 45%, var(--lavender-soft) 100%)',
        }}
      >
        <div data-parallax="0.6" className="blob" style={{ width: 400, height: 400, background: 'var(--lavender)', top: '6%', right: '8%' }} />
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 1100,
            margin: '0 auto',
          }}
          className="about-hero-grid"
        >
          <div className="fade-up" style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: '24px 24px 90px 24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-lg)',
                background: 'var(--cream-3)',
                position: 'relative',
              }}
            >
              <Image
                src="/images/karina/karina-portrait.jpg"
                alt="Карина Вълканова"
                fill
                style={{ objectFit: 'cover' }}
                sizes="320px"
                priority
              />
            </div>
          </div>

          <div>
            <div className="eyebrow fade-up" style={{ marginBottom: 20 }}>За мен</div>
            <h1 className="h-display fade-up" style={{ fontSize: 'clamp(40px, 5.5vw, 80px)', marginBottom: 24, animationDelay: '0.15s' }}>
              Карина<br /><em>Вълканова</em>
            </h1>
            <p className="fade-up" style={{ fontSize: 17, fontWeight: 200, lineHeight: 1.85, color: 'var(--mid)', maxWidth: 520, animationDelay: '0.3s' }}>
              Психолог, педагог и брокер. Вярвам, че пространството и душата растат
              заедно — и че от добре положените усилия има полза, смисъл и пристан
              за всяка душа, която търси сигурност и принадлежност.
            </p>
          </div>
        </div>
      </section>

      {/* Пътят — timeline */}
      <section className="section-pad" style={{ maxWidth: 1000, margin: '0 auto', position: 'relative' }}>
        <div className="reveal eyebrow" style={{ textAlign: 'center', marginBottom: 'clamp(56px, 9vh, 100px)' }}>Моят път</div>

        {/* мека вертикална нишка по средата */}
        <div
          aria-hidden
          style={{
            position: 'absolute', top: 140, bottom: 80, left: '50%',
            width: 1, background: 'linear-gradient(var(--line-strong), transparent)',
            transform: 'translateX(-50%)', opacity: 0.5,
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(64px, 12vh, 130px)' }}>
          {JOURNEY.map((j, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={i}
                className="reveal journey-row"
              >
                {/* периодът — голям, дишащ */}
                <div className="journey-period" style={{ gridColumn: left ? 1 : 2, gridRow: 1, textAlign: left ? 'right' : 'left' }} data-parallax="0.4">
                  <div className="journey-num" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 6vw, 78px)', fontWeight: 300, color: 'var(--accent)', opacity: 0.25, lineHeight: 1 }}>
                    0{i + 1}
                  </div>
                  <div style={{ fontSize: 'clamp(20px, 2.4vw, 30px)', fontFamily: 'var(--serif)', color: 'var(--text)', marginTop: 8 }}>
                    {j.period}
                  </div>
                </div>

                {/* текстът */}
                <div className="journey-text" style={{ gridColumn: left ? 2 : 1, gridRow: 1, textAlign: 'left' }}>
                  <p style={{ fontSize: 'clamp(16px, 1.7vw, 19px)', fontWeight: 300, lineHeight: 1.9, color: 'var(--mid)' }}>{j.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Цитат */}
      <section className="section-pad" style={{ background: 'var(--text)', color: 'var(--cream)', textAlign: 'center' }}>
        <p className="reveal story-line" style={{ maxWidth: 820, margin: '0 auto', color: 'rgba(250,247,242,0.92)' }}>
          „Харесвам да се грижа за личното пространство — физическо и духовно.
          Усещането, че има <em style={{ color: 'var(--lavender)' }}>пристан за всяка душа</em>,
          която търси сигурност и принадлежност."
        </p>
      </section>

      {/* Ценности */}
      <section className="section-pad" style={{ maxWidth: 1080, margin: '0 auto' }}>
        <h2 className="reveal h-display" style={{ textAlign: 'center', fontSize: 'clamp(30px, 4vw, 52px)', marginBottom: 56 }}>
          В какво <em>вярвам</em>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
          {VALUES.map((v, i) => (
            <div key={i} className={`reveal reveal-d${(i % 3) + 1}`} style={{ background: 'white', borderRadius: 'var(--r-lg)', padding: '38px 32px', border: '1px solid var(--line)' }}>
              <div style={{ fontSize: 32, marginBottom: 18 }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 23, fontWeight: 400, marginBottom: 12 }}>{v.title}</h3>
              <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: 'var(--mid)' }}>{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ textAlign: 'center', paddingTop: 0 }}>
        <div className="reveal" style={{ maxWidth: 560, margin: '0 auto' }}>
          <h2 className="h-display" style={{ fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: 28 }}>
            Да се <em>запознаем</em>
          </h2>
          <Link href="/kontakt" className="btn btn-primary">Свържи се с мен</Link>
        </div>
      </section>
    </div>
  );
}
