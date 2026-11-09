'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function EstateFooter() {
  const { locale, t } = useLanguage();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white shadow-lg shadow-amber-900/40">
                <span className="text-xl font-bold font-serif">◈</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-serif">ESTATEHUB</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              {locale === 'ar'
                ? 'المنصة الرائدة في تونس للعقارات الفاخرة، إدارة الأصول الاستثمارية، وتجارب المخططات المعمارية التفاعلية.'
                : 'Tunisia’s premier luxury real estate marketplace, digital asset management suite, and interactive architectural studio.'}
            </p>
            <div className="flex items-center gap-3 pt-2 text-stone-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-xs text-amber-400 border border-stone-700">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {locale === 'ar' ? 'اعتماد عقاري موثق 🇹🇳' : 'Certified Real Estate Portal 🇹🇳'}
              </span>
            </div>
          </div>

          {/* Platform Suite */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {locale === 'ar' ? 'المنظومة' : 'Platform'}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'المعطف الفاخر (فيلات وبنتهاوس)' : 'Luxury Residences'}
                </Link>
              </li>
              <li>
                <Link href="/floorplans" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'المخططات الهندسية CAD' : 'Architectural Floorplans'}
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'حاسبة التمويل البنكي' : 'Mortgage Simulator'}
                </Link>
              </li>
              <li>
                <Link href="/crm" className="hover:text-white transition-colors">
                  {locale === 'ar' ? 'لوحة إدارة الصفقات' : 'Broker CRM Pipeline'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Prime Locations in Tunisia */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {locale === 'ar' ? 'المواقع الفاخرة' : 'Prime Locations'}
            </h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                {locale === 'ar' ? 'قمرت الهضاب (Gammarth Hills)' : 'Gammarth Hills, Tunis'}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                {locale === 'ar' ? 'قرطاج صلامبو (Carthage Salammbô)' : 'Carthage Salammbô'}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                {locale === 'ar' ? 'المرسى الكورنيش (La Marsa Beachfront)' : 'La Marsa Corniche'}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                {locale === 'ar' ? 'ضفاف البحيرة 2 (Les Berges du Lac 2)' : 'Lac 2 Diplomatic Zone'}
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                {locale === 'ar' ? 'الحمامات الشمالية (Hammamet North)' : 'Hammamet Marina & Coast'}
              </li>
            </ul>
          </div>

          {/* Banking & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400">
              {locale === 'ar' ? 'الشركاء والتمويل' : 'Banking & Partners'}
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              {locale === 'ar'
                ? 'شراكات مع بنك تونس العربي الدولي (BIAT)، البنك الوطني الفلاحي (BNA)، والتجاري بنك لتقديم أفضل نسب تمويل.'
                : 'Direct underwriting channels with premier Tunisian banks (BIAT, BNA, Attijari Bank) with preferential interest rates.'}
            </p>
            <div className="pt-2 text-xs text-stone-500">
              {locale === 'ar' ? 'دعم العملات: د.ت • $ • €' : 'Multi-currency: TND • USD • EUR'}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 EstateHub Luxury Real Estate SaaS. {t.footer.rights}.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">{t.footer.privacy}</span>
            <span>•</span>
            <span className="hover:text-stone-400 cursor-pointer">{t.footer.terms}</span>
            <span>•</span>
            <span className="text-amber-500/80 font-mono">Port 3004</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
