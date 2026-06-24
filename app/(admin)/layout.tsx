import { AdminSidebar } from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Alma Carita PMS — Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', minHeight: '100vh', background: 'var(--cream)' }}>
      <AdminSidebar />
      <main style={{ padding: '32px 44px 56px', display: 'flex', flexDirection: 'column', gap: 32, minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
