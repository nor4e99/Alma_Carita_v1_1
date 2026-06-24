import { NextRequest, NextResponse } from 'next/server';
import { createInquiry } from '@/lib/data/queries';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Липсват полета' }, { status: 400 });
    }
    const inquiry = await createInquiry({
      source: body.property_id ? 'property' : 'general',
      property_id: body.property_id,
      property_name: body.property_name,
      name: body.name,
      email: body.email,
      phone: body.phone,
      message: body.message,
    });
    return NextResponse.json({ ok: true, inquiry });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
