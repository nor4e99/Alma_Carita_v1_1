import { getPublishedEvents } from '@/lib/data/queries';
import { EventsShowcase } from '@/components/public/EventsShowcase';

export const metadata = {
  title: 'Събития · Alma Carita',
  description: 'Минали събития, работилници и срещи, в които Карина Вълканова е участвала.',
};

export default async function SabitiaPage() {
  const events = await getPublishedEvents();
  return <EventsShowcase events={events} />;
}
