import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Alma Carita — Намери пространството за теб',
  description:
    'Холистична платформа за недвижими имоти. Премиум обяви в София и околности с психологическа подкрепа и осъзнат подход.',
  keywords: ['недвижими имоти', 'София', 'апартаменти', 'къщи', 'земи', 'Карина Вълканова', 'Alma Carita'],
  openGraph: {
    title: 'Alma Carita — Намери пространството за теб',
    description: 'Премиум недвижими имоти с холистичен подход.',
    locale: 'bg_BG',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
