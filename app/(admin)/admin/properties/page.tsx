import { getProperties } from '@/lib/data/queries';
import { AdminPropertiesTable } from '@/components/admin/AdminPropertiesTable';

export const metadata = {
  title: 'Имоти · Alma Carita PMS',
};

export default async function AdminPropertiesPage() {
  const properties = await getProperties();
  return <AdminPropertiesTable properties={properties} />;
}
