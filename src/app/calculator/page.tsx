'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function CalculatorPage() {
  const { t, locale, formatPrice } = useLanguage();

  const [price, setPrice] = useState<number>(1250000);
  const [downPercent, setDownPercent] = useState<number>(20);
  const [termYears, setTermYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(7.25);

  // Amortization formulas
  const downPayment = Math.round((price * downPercent) / 100);
  const principal = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = principal / totalMonths;
  }

  const totalPayment = monthlyPayment * totalMonths;
  const totalInterest = totalPayment - principal;
  const requiredIncome = monthlyPayment / 0.4; // 40% BCT debt-to-income ratio

  // Build Year-by-Year amortization breakdown
  const yearlySchedule = [];
  let currentBalance = principal;
  for (let year = 1; year <= termYears; year++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 1; m <= 12; m++) {
      const interestForMonth = currentBalance * monthlyRate;
      const principalForMonth = monthlyPayment - interestForMonth;
      yearInterest += interestForMonth;
      yearPrincipal += principalForMonth;
      currentBalance = Math.max(0, currentBalance - principalForMonth);
    }
    yearlySchedule.push({
      year,
      interest: Math.round(yearInterest),
      principal: Math.round(yearPrincipal),
      endingBalance: Math.round(currentBalance),
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <span>🏦</span>
          <span>{locale === 'ar' ? 'الاستشارات البنكية والتمويل العقاري' : 'Mortgage Underwriting & Amortization'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-white">
          {locale === 'ar' ? 'حاسبة التمويل العقاري والجدول الاستهلاكي' : 'Luxury Mortgage & Amortization Studio'}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm max-w-2xl">
          {locale === 'ar'
            ? 'احسب الأقساط الشهرية، جدول استهلاك القرض، والعائد الاستثماري الصافي وفق معايير البنك المركزي التونسي.'
            : 'Simulate loan amortization, monthly debt servicing, and banking eligibility according to Central Bank of Tunisia standards.'}
        </p>
      </div>

      {/* Main Simulator & KPI Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Controls Card */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold font-serif text-stone-900 dark:text-white border-b border-stone-100 dark:border-stone-800 pb-3">
            {locale === 'ar' ? 'محددات القرض العقاري' : 'Financing Parameters'}
          </h2>

          {/* Property Price */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-600 dark:text-stone-300">
                {locale === 'ar' ? 'قيمة العقار الإجمالية:' : 'Property Acquisition Value:'}
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">
                {formatPrice(price)}
              </span>
            </div>
            <input
              type="range"
              min="300000"
              max="5000000"
              step="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400">
              <span>300,000 د.ت</span>
              <span>5,000,000 د.ت</span>
            </div>
          </div>

          {/* Down Payment Percent */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-600 dark:text-stone-300">
                {locale === 'ar' ? 'الدفعة الأولى (التمويل الذاتي):' : 'Down Payment:'}
              </span>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {downPercent}% ({formatPrice(downPayment)})
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Loan Tenure */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-600 dark:text-stone-300">
                {locale === 'ar' ? 'مدة القرض بالسنين:' : 'Loan Tenure:'}
              </span>
              <span className="font-mono font-bold text-stone-900 dark:text-white">
                {termYears} {locale === 'ar' ? 'سنة' : 'years'} ({totalMonths} {locale === 'ar' ? 'شهر' : 'months'})
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="1"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-stone-600 dark:text-stone-300">
                {locale === 'ar' ? 'نسبة الفائدة السنوية المعتمدة:' : 'Annual Interest Rate:'}
              </span>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {interestRate.toFixed(2)}%
              </span>
            </div>
            <input
              type="range"
              min="5.0"
              max="12.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Results & Key Metrics Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider text-amber-200 font-semibold block">
                {locale === 'ar' ? 'القسط الشهري التقديري' : 'Estimated Monthly Debt Service'}
              </span>
              <div className="text-3xl sm:text-4xl font-bold font-serif">
                {formatPrice(Math.round(monthlyPayment))}
                <span className="text-sm font-sans font-normal text-amber-200"> / {locale === 'ar' ? 'شهرياً' : 'month'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-amber-500/40 text-xs">
              <div>
                <span className="text-amber-200 block">{locale === 'ar' ? 'أصل مبلغ القرض:' : 'Loan Principal:'}</span>
                <span className="text-base font-bold font-mono">{formatPrice(principal)}</span>
              </div>
              <div>
                <span className="text-amber-200 block">{locale === 'ar' ? 'إجمالي الفوائد البنكية:' : 'Total Interest Paid:'}</span>
                <span className="text-base font-bold font-mono">{formatPrice(Math.round(totalInterest))}</span>
              </div>
              <div>
                <span className="text-amber-200 block">{locale === 'ar' ? 'إجمالي ما سيتم سداده:' : 'Total Cost of Loan:'}</span>
                <span className="text-base font-bold font-mono">{formatPrice(Math.round(totalPayment))}</span>
              </div>
              <div>
                <span className="text-amber-200 block">{locale === 'ar' ? 'الدخل الشهري الأدنى المطلوب:' : 'Min. Monthly Income Required:'}</span>
                <span className="text-base font-bold font-mono">{formatPrice(Math.round(requiredIncome))}</span>
              </div>
            </div>
          </div>

          {/* Top 3 Tunisian Banks Comparison Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
              {locale === 'ar' ? 'عروض التمويل المعتمدة لدى البنوك التونسية' : 'Tunisian Banking Underwriters'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div
                onClick={() => setInterestRate(7.25)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  interestRate === 7.25
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <div className="font-bold text-xs">BIAT Prestige</div>
                <div className="text-amber-600 dark:text-amber-400 font-mono text-sm font-bold">7.25%</div>
                <div className="text-[10px] text-stone-400 mt-1">{locale === 'ar' ? 'تمويل لغاية 80%' : 'Up to 80% LTV'}</div>
              </div>

              <div
                onClick={() => setInterestRate(7.5)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  interestRate === 7.5
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <div className="font-bold text-xs">BNA Dari</div>
                <div className="text-amber-600 dark:text-amber-400 font-mono text-sm font-bold">7.50%</div>
                <div className="text-[10px] text-stone-400 mt-1">{locale === 'ar' ? 'أقساط مرنة 20 سنة' : 'Flexible 20 yrs'}</div>
              </div>

              <div
                onClick={() => setInterestRate(7.4)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  interestRate === 7.4
                    ? 'border-amber-600 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:border-amber-400'
                }`}
              >
                <div className="font-bold text-xs">Attijari Maskani</div>
                <div className="text-amber-600 dark:text-amber-400 font-mono text-sm font-bold">7.40%</div>
                <div className="text-[10px] text-stone-400 mt-1">{locale === 'ar' ? 'فترة إمهال 6 أشهر' : '6 mo grace period'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Amortization Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4">
        <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white">
          {locale === 'ar' ? 'جدول الاستهلاك التراكمي للقرض (سنة بسنة)' : 'Yearly Loan Amortization Schedule'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider">
                <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'السنة' : 'Year'}</th>
                <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'أصل الدين المسدد' : 'Principal Paid'}</th>
                <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'الفائدة المسددة' : 'Interest Paid'}</th>
                <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'الرصيد المتبقي' : 'Ending Balance'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              {yearlySchedule.map((row) => (
                <tr key={row.year} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-stone-900 dark:text-white font-mono">
                    {locale === 'ar' ? `السنة ${row.year}` : `Year ${row.year}`}
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {formatPrice(row.principal)}
                  </td>
                  <td className="py-3 px-4 font-mono text-amber-600 dark:text-amber-400">
                    {formatPrice(row.interest)}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-stone-900 dark:text-white">
                    {formatPrice(row.endingBalance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
