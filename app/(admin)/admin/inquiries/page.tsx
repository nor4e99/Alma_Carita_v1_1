import { getInquiries } from '@/lib/data/queries';
import { AdminInquiries } from '@/components/admin/AdminInquiries';

export const metadata = {
  title: 'Запитвания · Alma Carita PMS',
};

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiries();
  return <AdminInquiries inquiries={inquiries} />;
}
