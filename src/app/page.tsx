'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/context/LanguageContext';
import { INITIAL_PROPERTIES } from '@/lib/data/mock-estate-data';
import { Property } from '@/lib/types';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { FloorplanExplorer } from '@/components/interactive/FloorplanExplorer';
import { MortgageCalculator } from '@/components/interactive/MortgageCalculator';
import { InquiryModal } from '@/components/modals/InquiryModal';

export default function HomePage() {
  const { t, locale, formatPrice } = useLanguage();

  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedListing, setSelectedListing] = useState<string>('ALL');
  
  // Interactive modal & floorplan state
  const [activeFloorplanProperty, setActiveFloorplanProperty] = useState<Property>(INITIAL_PROPERTIES[0]);
  const [inquiryProperty, setInquiryProperty] = useState<Property | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Filtering logic
  const filteredProperties = properties.filter((p) => {
    const titleEn = p.title?.en || '';
    const titleAr = p.title?.ar || '';
    const city = p.location?.city || '';
    const district = p.location?.district || '';

    const matchesSearch =
      titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      titleAr.includes(searchQuery) ||
      city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === 'ALL' || p.propertyType === selectedType;
    const matchesListing = selectedListing === 'ALL' || p.listingType === selectedListing;

    return matchesSearch && matchesType && matchesListing;
  });

  const handleInquirySuccess = () => {
    setNotification(
      locale === 'ar'
        ? 'تم إرسال طلب المعاينة بنجاح! سيتواصل معك مستشارنا العقاري الخاص خلال ساعتين.'
        : 'Inquiry submitted successfully! A private advisor will contact you within 2 hours.'
    );
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-emerald-600 text-white shadow-2xl flex items-center gap-3 text-sm font-semibold border border-emerald-400 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>{notification}</span>
        </div>
      )}

      {/* Hero Architectural Header */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-500/5 via-stone-50 to-stone-50 dark:from-amber-950/20 dark:via-[#0c121e] dark:to-[#0c121e] border-b border-stone-200/80 dark:border-stone-800/80">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-800 dark:text-amber-300 text-xs font-bold tracking-wider uppercase">
            <span>◈</span>
            <span>{locale === 'ar' ? 'المعمار الاستثنائي في تونس' : 'Tunisia Premier Architecture & Estates'}</span>
            <span>◈</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 dark:text-white font-serif max-w-4xl mx-auto leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>

          {/* Search & Filter Dock */}
          <div className="max-w-4xl mx-auto mt-8 p-3 sm:p-4 rounded-3xl bg-white dark:bg-stone-900 shadow-xl border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 pr-10 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-sm focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-stone-400"
              />
              <svg className="w-4 h-4 absolute top-1/2 -translate-y-1/2 left-3.5 text-stone-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
              {['ALL', 'VILLA', 'PENTHOUSE', 'MANSION'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedType === type
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {type === 'ALL'
                    ? t.filterAll
                    : type === 'VILLA'
                    ? (locale === 'ar' ? 'فيلات' : 'Villas')
                    : type === 'PENTHOUSE'
                    ? (locale === 'ar' ? 'بنتهاوس' : 'Penthouses')
                    : (locale === 'ar' ? 'قصور' : 'Mansions')}
                </button>
              ))}
            </div>

            {/* Listing Type Filter (Sale / Rent) */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl w-full md:w-auto justify-center">
              <button
                onClick={() => setSelectedListing('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedListing === 'ALL' ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs' : 'text-stone-500'
                }`}
              >
                {t.filterAll}
              </button>
              <button
                onClick={() => setSelectedListing('FOR_SALE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedListing === 'FOR_SALE' ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs' : 'text-stone-500'
                }`}
              >
                {t.filterSale}
              </button>
              <button
                onClick={() => setSelectedListing('FOR_RENT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedListing === 'FOR_RENT' ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs' : 'text-stone-500'
                }`}
              >
                {t.filterRent}
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-start">
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-500 dark:text-stone-400 block">{t.kpiTotalEstates}</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-amber-600 dark:text-amber-400 mt-1 block">
                {properties.length} {locale === 'ar' ? 'عقار فاخر' : 'Estates'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-500 dark:text-stone-400 block">{t.kpiAvgPrice}</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white mt-1 block">
                {formatPrice(2150000)}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-500 dark:text-stone-400 block">{t.kpiAvgDays}</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-white mt-1 block">
                38 {locale === 'ar' ? 'يوماً' : 'Days'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800">
              <span className="text-xs text-stone-500 dark:text-stone-400 block">{t.kpiYield}</span>
              <span className="text-xl sm:text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400 mt-1 block">
                11.4% {locale === 'ar' ? 'عائد سنوي' : 'Yield'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
              {locale === 'ar' ? 'مجموعة النخبة' : 'Curated Portfolio'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-white">
              {t.featuredProperties}
            </h2>
          </div>
          <Link
            href="/properties"
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>{locale === 'ar' ? 'عرض كافة العقارات (المعطف الكامل)' : 'View full catalog'}</span>
            <span>→</span>
          </Link>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <p className="text-stone-500 text-sm">{locale === 'ar' ? 'لا توجد عقارات تطابق معايير البحث الحالية.' : 'No properties match the current search filters.'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelectFloorplan={(p) => {
                  setActiveFloorplanProperty(p);
                  const el = document.getElementById('floorplan-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onInquire={(p) => setInquiryProperty(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Interactive Floorplan Architectural Studio Highlight */}
      <section id="floorplan-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-28">
        <div className="p-6 sm:p-10 rounded-3xl bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                {locale === 'ar' ? 'استوديو المخططات المعمارية التفاعلية' : 'Interactive Architectural CAD Suite'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-white">
                {locale === 'ar' ? 'استكشف المخطط الهندسي والغرف بضغطة زر' : 'Live Blueprint Room Zone Inspector'}
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                {locale === 'ar'
                  ? 'انقر على أي غرفة داخل المخطط لمعاينة المساحة الصافية، والتشطيبات الفاخرة، والإطلالات.'
                  : 'Click on any architectural room zone to inspect net area, marble/wood finishes, and orientation.'}
              </p>
            </div>

            {/* Property Switcher for Floorplan */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {properties.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActiveFloorplanProperty(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeFloorplanProperty.id === p.id
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  {locale === 'ar' ? p.title.ar.split(' ')[0] + ' ' + (p.title.ar.split(' ')[1] || '') : p.title.en.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Embedded Floorplan Explorer */}
          <FloorplanExplorer
            rooms={activeFloorplanProperty.floorplan}
            propertyTitle={locale === 'ar' ? activeFloorplanProperty.title.ar : activeFloorplanProperty.title.en}
          />
        </div>
      </section>

      {/* Mortgage & Investment Simulator Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
              {locale === 'ar' ? 'التمويل والشراكات البنكية' : 'Banking & Underwriting'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-white">
              {locale === 'ar' ? 'حاسبة التمويل العقاري التونسي' : 'Tunisian Mortgage Amortization Engine'}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              {locale === 'ar'
                ? 'محاكاة دقيقة وفورية للأقساط الشهرية، جدول الاستهلاك، ونسب التمويل المعتمدة لدى كبرى البنوك التونسية (BIAT، BNA، التجاري بنك) بنسب فائدة تفضيلية تبدأ من 7.25%.'
                : 'Accurate real-time amortization for prime mortgages underwritten by premier Tunisian banks with preferred fixed and variable interest rates.'}
            </p>
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 space-y-1">
              <span className="font-bold block">💡 {locale === 'ar' ? 'نصيحة استثمارية للمستثمرين:' : 'Investor Tip:'}</span>
              <span>
                {locale === 'ar'
                  ? 'العقارات في ضفاف البحيرة وقمرت تحقق عوائد تأجيرية سنوية تفوق 10%، مما يغطي كامل القسط الشهري مع فائض نقدي صافٍ.'
                  : 'Prime assets in Garth and Lac 2 generate over 10% rental yields, fully servicing debt amortization with positive cashflow.'}
              </span>
            </div>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-2"
            >
              <span>{locale === 'ar' ? 'فتح حاسبة الاستهلاك التراكمي الكاملة' : 'Open full amortization studio'}</span>
              <span>→</span>
            </Link>
          </div>

          <div className="lg:col-span-8">
            <MortgageCalculator initialPrice={activeFloorplanProperty.price} />
          </div>
        </div>
      </section>

      {/* Private Tour Inquiry Modal */}
      {inquiryProperty && (
        <InquiryModal
          property={inquiryProperty}
          isOpen={!!inquiryProperty}
          onClose={() => setInquiryProperty(null)}
          onSuccess={handleInquirySuccess}
        />
      )}
    </div>
  );
}
