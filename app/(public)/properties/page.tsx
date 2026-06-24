import { getActiveProperties } from '@/lib/data/queries';
import { PropertiesCatalog } from '@/components/public/PropertiesCatalog';

export const metadata = {
  title: 'Всички имоти — Alma Carita',
  description: 'Премиум недвижими имоти в София с холистичен подход.',
};

export default async function PropertiesPage() {
  const properties = await getActiveProperties();
  return <PropertiesCatalog initialProperties={properties} />;
}
