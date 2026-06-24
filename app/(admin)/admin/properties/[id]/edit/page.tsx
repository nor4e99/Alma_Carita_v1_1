import { notFound } from 'next/navigation';
import { getPropertyById } from '@/lib/data/queries';
import { PropertyEditForm } from '@/components/admin/PropertyEditForm';

export const metadata = {
  title: 'Редакция на имот · Alma Carita PMS',
};

export default async function EditPropertyPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id);
  if (!property) notFound();
  return <PropertyEditForm property={property} />;
}
