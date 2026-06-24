import dynamic from 'next/dynamic';
import { getActiveProperties } from '@/lib/data/queries';

// Leaflet се рендерира само client-side
const PropertyMap = dynamic(() => import('@/components/public/PropertyMap').then((m) => m.PropertyMap), {
  ssr: false,
  loading: () => (
    <div style={{ height: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--mid)' }}>
      Зареждам картата...
    </div>
  ),
});

export const metadata = {
  title: 'Карта — Alma Carita',
  description: 'Намери имот близо до теб на интерактивна карта.',
};

export default async function MapPage() {
  const properties = await getActiveProperties();
  return <PropertyMap properties={properties} />;
}
