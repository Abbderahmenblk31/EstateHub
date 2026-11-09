import { NextRequest, NextResponse } from 'next/server';
import { estateStore } from '@/lib/store/estate-store';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { propertyPrice, downPaymentPercent, interestRatePercent, termYears } = body;

    if (!propertyPrice || !termYears) {
      return NextResponse.json(
        { success: false, error: 'propertyPrice and termYears are required' },
        { status: 400 }
      );
    }

    const quote = estateStore.calculateMortgage({
      propertyPrice: Number(propertyPrice),
      downPaymentPercent: Number(downPaymentPercent || 20),
      interestRatePercent: Number(interestRatePercent || 7.5),
      termYears: Number(termYears || 20),
    });

    return NextResponse.json({ success: true, data: quote });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
