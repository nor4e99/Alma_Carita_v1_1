import { notFound } from 'next/navigation';
import { getTrainingBySlug, getPublishedTrainings } from '@/lib/data/queries';
import { TrainingDetail } from '@/components/public/TrainingDetail';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const t = await getTrainingBySlug(params.slug);
  return { title: t ? `${t.title} · Обучения` : 'Обучение' };
}

export default async function TrainingDetailPage({ params }: { params: { slug: string } }) {
  const training = await getTrainingBySlug(params.slug);
  if (!training || !training.published) notFound();
  const others = (await getPublishedTrainings()).filter((t) => t.id !== training.id).slice(0, 3);
  return <TrainingDetail training={training} others={others} />;
}
