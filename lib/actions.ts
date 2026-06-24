'use server';

/**
 * SERVER ACTIONS — admin мутации
 *
 * Клиентските компоненти извикват тези функции вместо да импортват
 * queries директно. Така мутацията винаги се случва на сървъра
 * (където е mockProperties масивът, а в Phase 2 — Supabase).
 *
 * Phase 2: тялото остава същото — queries.ts вътрешно сменя
 * mock с Supabase. Този файл не се пипа.
 */

import { revalidatePath } from 'next/cache';
import type { PropertyStatus } from '@/lib/types';
import {
  updatePropertyStatus as _updateStatus,
  deleteProperty as _delete,
  createInquiry as _createInquiry,
  updateInquiryStatus as _setInquiryStatus,
} from '@/lib/data/queries';
import type { Inquiry } from '@/lib/types';

export async function setPropertyStatus(id: string, status: PropertyStatus) {
  await _updateStatus(id, status);
  revalidatePath('/admin/properties');
  revalidatePath('/admin');
}

export async function removeProperty(id: string) {
  await _delete(id);
  revalidatePath('/admin/properties');
  revalidatePath('/admin');
}

export async function setInquiryStatus(id: string, status: Inquiry['status']) {
  await _setInquiryStatus(id, status);
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
}

export async function submitInquiry(input: Omit<Inquiry, 'id' | 'status' | 'created_at'>) {
  const inq = await _createInquiry(input);
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
  return inq;
}

/** "Проявявам интерес" към обучение → създава Inquiry със source='training' */
export async function submitTrainingInterest(input: {
  training_id: string;
  training_name: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const inq = await _createInquiry({
    source: 'training',
    training_id: input.training_id,
    training_name: input.training_name,
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: input.message,
  });
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
  return { ok: true as const, id: inq.id };
}

/** Запитване от детския център → source='children' */
export async function submitChildrenInterest(input: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  await _createInquiry({
    source: 'children',
    name: input.name,
    email: input.email,
    phone: input.phone,
    message: input.message,
  });
  revalidatePath('/admin/inquiries');
  revalidatePath('/admin');
  return { ok: true as const };
}
