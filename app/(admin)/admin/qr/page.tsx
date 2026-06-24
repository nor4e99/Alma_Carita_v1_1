import { getProperties } from '@/lib/data/queries';
import { AdminQR } from '@/components/admin/AdminQR';

export const metadata = {
  title: 'QR кодове · Alma Carita PMS',
};

export default async function AdminQRPage() {
  const properties = await getProperties();
  return <AdminQR properties={properties} />;
}
