'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';

interface MortgageCalculatorProps {
  initialPrice?: number;
}

export function MortgageCalculator({ initialPrice = 920000 }: MortgageCalculatorProps) {
  const { t, locale, formatPrice } = useLanguage();

  const [price, setPrice] = useState(initialPrice);
  const [downPercent, setDownPercent] = useState(20);
  const [termYears, setTermYears] = useState(20);
  const [interestRate, setInterestRate] = useState(7.5); // Tunisian banking average

  // Real-time amortization formula: M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1]
  const downPaymentAmount = Math.round((price * downPercent) / 100);
  const loanAmount = price - downPaymentAmount;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = termYears * 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPayment = loanAmount / totalMonths;
  }

  const totalCost = monthlyPayment * totalMonths + downPaymentAmount;
  const totalInterest = monthlyPayment * totalMonths - loanAmount;

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-6">
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
          <span>🏦 Financial Engineering Simulator</span>
          <span>•</span>
          <span>Tunisian & Global Banking Rates</span>
        </div>
        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
          {t.calcTitle}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">{t.calcSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Input Controls */}
        <div className="lg:col-span-7 space-y-5">
          {/* Property Price */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{t.propPrice}</span>
              <span className="font-mono text-amber-600 dark:text-amber-400 text-sm">
                {formatPrice(price)}
              </span>
            </div>
            <input
              type="range"
              min="200000"
              max="5000000"
              step="50000"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Down Payment Percent */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{t.downPayment}</span>
              <span className="font-mono text-slate-900 dark:text-white">
                {downPercent}% ({formatPrice(downPaymentAmount)})
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              step="5"
              value={downPercent}
              onChange={(e) => setDownPercent(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Loan Term (Years) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{t.loanTerm}</span>
              <span className="font-mono text-slate-900 dark:text-white">
                {termYears} {locale === 'ar' ? 'سنة' : 'Years'}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
          </div>

          {/* Interest Rate */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>{t.interestRate}</span>
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min="4.5"
              max="12.0"
              step="0.25"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Quick Bank Presets */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">
              {locale === 'ar' ? 'نسب الفائدة المعتمدة لدى البنوك:' : 'Benchmark Bank Rates:'}
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setInterestRate(7.75)}
                className="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-500 font-medium"
              >
                BIAT / BNA (7.75%)
              </button>
              <button
                type="button"
                onClick={() => setInterestRate(7.50)}
                className="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-500 font-medium"
              >
                Attijari / BT (7.50%)
              </button>
              <button
                type="button"
                onClick={() => setInterestRate(6.25)}
                className="px-3 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-amber-500 font-medium"
              >
                Global USD/EUR (6.25%)
              </button>
            </div>
          </div>
        </div>

        {/* Amortization Summary Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              {t.monthlyInstalment}
            </span>
            <div className="text-3xl lg:text-4xl font-black font-mono text-white">
              {formatPrice(Math.round(monthlyPayment))}
              <span className="text-xs text-slate-400 font-normal"> / {locale === 'ar' ? 'شهرياً' : 'mo'}</span>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-slate-700/80 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">{locale === 'ar' ? 'التمويل البنكي الصافي:' : 'Loan Principal:'}</span>
              <span className="font-mono font-bold">{formatPrice(loanAmount)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">{t.totalInterest}</span>
              <span className="font-mono font-bold text-amber-300">{formatPrice(Math.round(totalInterest))}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-400">{locale === 'ar' ? 'الدفعة الأولى الذاتية:' : 'Cash Down Payment:'}</span>
              <span className="font-mono font-bold text-emerald-400">{formatPrice(downPaymentAmount)}</span>
            </div>

            <div className="flex justify-between pt-3 border-t border-slate-700 font-bold text-sm">
              <span>{t.totalLoanCost}</span>
              <span className="font-mono text-amber-400">{formatPrice(Math.round(totalCost))}</span>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            {t.bankPartners}
          </p>
        </div>
      </div>
    </div>
  );
}
