import { PublicNav } from '@/components/public/PublicNav';
import { PublicFooter } from '@/components/public/PublicFooter';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNav />
      <main style={{ animation: 'fadeIn 0.4s ease-out' }}>{children}</main>
      <PublicFooter />
    </>
  );
}
