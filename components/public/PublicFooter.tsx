import Link from 'next/link';
import { Logo } from '../shared/Logo';

export function PublicFooter() {
  return (
    <footer className="public-footer">
      <div className="footer-grid">
        <div>
          <Logo size={32} variant="light" />
          <p style={{ marginTop: 20, fontSize: 13, lineHeight: 1.8, color: 'rgba(250,247,242,0.5)', maxWidth: 360, fontWeight: 300 }}>
            Холистична платформа за недвижими имоти. Намери пространството за теб.
          </p>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--cream)', fontWeight: 400, marginBottom: 18 }}>
            Платформа
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
            <li><Link href="/imoti" style={{ color: 'rgba(250,247,242,0.5)' }}>Имоти</Link></li>
            <li><Link href="/obuchenia" style={{ color: 'rgba(250,247,242,0.5)' }}>Обучения</Link></li>
            <li><Link href="/detski-tsentar" style={{ color: 'rgba(250,247,242,0.5)' }}>Детски център</Link></li>
            <li><Link href="/sabitia" style={{ color: 'rgba(250,247,242,0.5)' }}>Събития</Link></li>
            <li><Link href="/za-men" style={{ color: 'rgba(250,247,242,0.5)' }}>За мен</Link></li>
            <li><Link href="/kontakt" style={{ color: 'rgba(250,247,242,0.5)' }}>Контакт</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--cream)', fontWeight: 400, marginBottom: 18 }}>
            Услуги
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
            <li style={{ color: 'rgba(250,247,242,0.5)' }}>Недвижими имоти</li>
            <li style={{ color: 'rgba(250,247,242,0.5)' }}>Консултация за пространство</li>
            <li style={{ color: 'rgba(250,247,242,0.5)' }}>Психологическа подкрепа</li>
            <li style={{ color: 'rgba(250,247,242,0.3)', fontStyle: 'italic' }}>Холистика · скоро</li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--cream)', fontWeight: 400, marginBottom: 18 }}>
            Контакт
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 12 }}>
            <li style={{ color: 'rgba(250,247,242,0.5)' }}>Карина Вълканова</li>
            <li style={{ color: 'rgba(250,247,242,0.5)' }}>karina@almacarita.bg</li>
            <li style={{ color: 'rgba(250,247,242,0.5)' }}>+359 88 ХХХ ХХХХ</li>
            <li style={{ color: 'rgba(250,247,242,0.5)' }}>София, България</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Alma Carita · Изработено с ♡</span>
        <Link href="/admin/login" style={{ color: 'rgba(250,247,242,0.3)' }}>
          Admin вход →
        </Link>
      </div>
    </footer>
  );
}
