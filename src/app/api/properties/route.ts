import { NextRequest, NextResponse } from 'next/server';
import { estateStore } from '@/lib/store/estate-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get('type') as any) || undefined;
    const listing = (searchParams.get('listing') as any) || undefined;
    const city = searchParams.get('city') || undefined;
    const maxPrice = searchParams.get('maxPrice')
      ? Number(searchParams.get('maxPrice'))
      : undefined;

    const properties = estateStore.listProperties({ type, listing, city, maxPrice });
    return NextResponse.json({ success: true, count: properties.length, data: properties });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.title || !body.price || !body.propertyType) {
      return NextResponse.json(
        { success: false, error: 'title, price, and propertyType are required' },
        { status: 400 }
      );
    }
    const prop = estateStore.createProperty(body);
    return NextResponse.json({ success: true, data: prop }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
