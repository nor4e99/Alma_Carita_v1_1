import Link from 'next/link';
import { getPublishedTrainings } from '@/lib/data/queries';
import { TrainingsShowcase } from '@/components/public/TrainingsShowcase';

export const metadata = {
  title: 'Обучения · Alma Carita',
  description:
    'Програми за деца, юноши и родители — от психологията и педагогиката на Карина Вълканова.',
};

export default async function ObucheniaPage() {
  const trainings = await getPublishedTrainings();
  return <TrainingsShowcase trainings={trainings} />;
}
