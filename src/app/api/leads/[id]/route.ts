import { NextRequest, NextResponse } from 'next/server';
import { estateStore } from '@/lib/store/estate-store';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    if (!body.status) {
      return NextResponse.json({ success: false, error: 'status is required' }, { status: 400 });
    }
    const updated = estateStore.updateLeadStatus(id, body.status);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
