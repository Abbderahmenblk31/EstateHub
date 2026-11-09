'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { INITIAL_PROPERTIES } from '@/lib/data/mock-estate-data';
import { Property } from '@/lib/types';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { InquiryModal } from '@/components/modals/InquiryModal';

export default function PropertiesCatalogPage() {
  const { t, locale, formatPrice } = useLanguage();

  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [listingFilter, setListingFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'area-desc'>('price-desc');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const filtered = properties
    .filter((p) => {
      const titleEn = p.title?.en || '';
      const titleAr = p.title?.ar || '';
      const district = p.location?.district || '';
      const city = p.location?.city || '';

      const matchSearch =
        titleEn.toLowerCase().includes(search.toLowerCase()) ||
        titleAr.includes(search) ||
        district.toLowerCase().includes(search.toLowerCase()) ||
        city.toLowerCase().includes(search.toLowerCase());

      const matchCity = cityFilter === 'ALL' || city.toLowerCase() === cityFilter.toLowerCase();
      const matchType = typeFilter === 'ALL' || p.propertyType === typeFilter;
      const matchListing = listingFilter === 'ALL' || p.listingType === listingFilter;

      return matchSearch && matchCity && matchType && matchListing;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'area-desc') return b.specs.areaSqM - a.specs.areaSqM;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <span>◈</span>
          <span>{locale === 'ar' ? 'المعطف العقاري الكامل' : 'Prime Real Estate Portfolio'}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-white">
          {locale === 'ar' ? 'فيلات وقصور وشقق النخبة المعمارية' : 'Curated Luxury Residences & Estates'}
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-sm max-w-2xl">
          {locale === 'ar'
            ? 'تصفح قائمة العقارات الفاخرة المعتمدة في أرقى ضواحي تونس مع تفاصيل المساحات، التشطيبات، والأسعار الموثقة.'
            : 'Explore certified high-end properties across Tunisia’s most prestigious postcodes with verified titles and CAD layouts.'}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Keyword Search */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">
              {locale === 'ar' ? 'بحث بالاسم أو الحي' : 'Search by name or district'}
            </label>
            <input
              type="text"
              placeholder={locale === 'ar' ? 'مثال: قمرت، قرطاج، ريفيرا...' : 'e.g. Gammarth, Carthage, Riviera...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* City Filter */}
          <div>
            <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">
              {locale === 'ar' ? 'المدينة / المنطقة' : 'Location'}
            </label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">{locale === 'ar' ? 'كافة المناطق' : 'All Regions'}</option>
              <option value="Tunis">{locale === 'ar' ? 'تونس (قرطاج / البحيرة)' : 'Tunis'}</option>
              <option value="La Marsa">{locale === 'ar' ? 'المرسى' : 'La Marsa'}</option>
              <option value="Gammarth">{locale === 'ar' ? 'قمرت' : 'Gammarth'}</option>
              <option value="Hammamet">{locale === 'ar' ? 'الحمامات' : 'Hammamet'}</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">
              {locale === 'ar' ? 'النمط المعماري' : 'Property Type'}
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="ALL">{locale === 'ar' ? 'كافة الأنماط' : 'All Types'}</option>
              <option value="VILLA">{locale === 'ar' ? 'فيلا مستقلة' : 'Villa'}</option>
              <option value="PENTHOUSE">{locale === 'ar' ? 'بنتهاوس معلق' : 'Penthouse'}</option>
              <option value="DUPLEX">{locale === 'ar' ? 'دوبلكس بانورامي' : 'Duplex'}</option>
              <option value="APARTMENT">{locale === 'ar' ? 'شقة راقية' : 'Apartment'}</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">
              {locale === 'ar' ? 'الترتيب حسب' : 'Sort Order'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-amber-500"
            >
              <option value="price-desc">{locale === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
              <option value="price-asc">{locale === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="area-desc">{locale === 'ar' ? 'المساحة: الأكبر أولاً' : 'Area: Largest First'}</option>
            </select>
          </div>
        </div>

        {/* Quick pill toggle for Sale / Rent */}
        <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
          <span className="text-stone-500 font-medium">{locale === 'ar' ? 'حالة الطرح:' : 'Listing Type:'}</span>
          <button
            onClick={() => setListingFilter('ALL')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              listingFilter === 'ALL' ? 'bg-amber-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            {locale === 'ar' ? 'الكل' : 'All'}
          </button>
          <button
            onClick={() => setListingFilter('FOR_SALE')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              listingFilter === 'FOR_SALE' ? 'bg-amber-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            {locale === 'ar' ? 'للبيع (تمليك حر)' : 'For Sale'}
          </button>
          <button
            onClick={() => setListingFilter('FOR_RENT')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              listingFilter === 'FOR_RENT' ? 'bg-amber-600 text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            {locale === 'ar' ? 'للإيجار الفاخر' : 'Luxury Lease'}
          </button>
          <span className="ms-auto text-stone-400 font-mono text-[11px]">
            {filtered.length} {locale === 'ar' ? 'عقار متاح' : 'properties available'}
          </span>
        </div>
      </div>

      {/* Properties Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <p className="text-stone-500">{locale === 'ar' ? 'لا توجد عقارات تطابق هذا البحث.' : 'No estates match the selected parameters.'}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onInquire={(p) => setSelectedProperty(p)}
            />
          ))}
        </div>
      )}

      {/* Inquiry Modal */}
      {selectedProperty && (
        <InquiryModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          onSuccess={() => setSelectedProperty(null)}
        />
      )}
    </div>
  );
}
