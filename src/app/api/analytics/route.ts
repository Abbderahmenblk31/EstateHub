import { NextResponse } from 'next/server';
import { estateStore } from '@/lib/store/estate-store';

export async function GET() {
  try {
    const metrics = estateStore.getMetrics();
    return NextResponse.json({ success: true, data: metrics });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
