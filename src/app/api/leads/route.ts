import { NextRequest, NextResponse } from 'next/server';
import { estateStore } from '@/lib/store/estate-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || undefined;
    const leads = estateStore.listLeads(status);
    return NextResponse.json({ success: true, count: leads.length, data: leads });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.propertyId || !body.clientName || !body.clientPhone) {
      return NextResponse.json(
        { success: false, error: 'propertyId, clientName, and clientPhone are required' },
        { status: 400 }
      );
    }
    const lead = estateStore.createLead(body);
    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
