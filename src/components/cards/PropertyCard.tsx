'use client';

import React from 'react';
import Link from 'next/link';
import { Property } from '@/lib/types';
import { useLanguage } from '@/lib/context/LanguageContext';

interface PropertyCardProps {
  property: Property;
  onSelectFloorplan?: (property: Property) => void;
  onInquire?: (property: Property) => void;
}

export function PropertyCard({ property, onSelectFloorplan, onInquire }: PropertyCardProps) {
  const { t, locale, formatPrice } = useLanguage();

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden luxury-card flex flex-col justify-between hover:border-amber-500/50 transition-all duration-300">
      <div>
        {/* Visual Header / Banner */}
        <div className="relative h-60 w-full bg-gradient-to-tr from-slate-900 via-slate-800 to-amber-950 flex flex-col justify-between p-5 text-white overflow-hidden">
          {/* Subtle architectural watermark */}
          <div className="absolute inset-0 architectural-grid opacity-15 pointer-events-none"></div>

          <div className="z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/20 text-white">
              {property.propertyType}
            </span>

            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              property.listingType === 'FOR_SALE'
                ? 'bg-amber-500 text-slate-950 font-black'
                : 'bg-emerald-500 text-slate-950 font-black'
            }`}>
              {property.listingType === 'FOR_SALE' ? t.filterSale : t.filterRent}
            </span>
          </div>

          <div className="z-10 space-y-1">
            <div className="text-[11px] text-amber-300 font-semibold tracking-wide flex items-center gap-1.5">
              <span>📍</span>
              <span>{property.location.district}, {property.location.city}</span>
            </div>
            <div className="text-2xl font-black font-mono text-white">
              {formatPrice(property.price)}
              {property.listingType === 'FOR_RENT' && (
                <span className="text-xs font-normal text-slate-300"> / {locale === 'ar' ? 'شهرياً' : 'mo'}</span>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
              {locale === 'ar' ? property.title.ar : property.title.en}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {locale === 'ar' ? property.description.ar : property.description.en}
            </p>
          </div>

          {/* Specs Ribbon */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-center">
            <div className="space-y-0.5">
              <span className="text-xs font-black font-mono text-slate-900 dark:text-white">
                {property.specs.bedrooms}
              </span>
              <div className="text-[10px] text-slate-400 font-medium">{t.beds}</div>
            </div>

            <div className="space-y-0.5 border-x border-slate-100 dark:border-slate-800">
              <span className="text-xs font-black font-mono text-slate-900 dark:text-white">
                {property.specs.bathrooms}
              </span>
              <div className="text-[10px] text-slate-400 font-medium">{t.baths}</div>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-black font-mono text-slate-900 dark:text-white">
                {property.specs.areaSqM}
              </span>
              <div className="text-[10px] text-slate-400 font-medium">{t.sqm}</div>
            </div>
          </div>

          {/* Key Amenities */}
          <div className="flex flex-wrap gap-1.5">
            {property.amenities.slice(0, 3).map((a, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {locale === 'ar' ? a.ar : a.en}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-5 pt-0 flex items-center justify-between gap-2">
        {onSelectFloorplan && (
          <button
            onClick={() => onSelectFloorplan(property)}
            className="flex-1 py-2 px-3 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>📐</span>
            <span>{t.exploreFloorplan}</span>
          </button>
        )}

        {onInquire && (
          <button
            onClick={() => onInquire(property)}
            className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white transition-all shadow-xs flex items-center justify-center gap-1"
          >
            <span>📅</span>
            <span>{t.scheduleTour}</span>
          </button>
        )}
      </div>
    </div>
  );
}
