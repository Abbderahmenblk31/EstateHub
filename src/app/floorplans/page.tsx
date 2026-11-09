'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { INITIAL_PROPERTIES } from '@/lib/data/mock-estate-data';
import { Property, FloorplanRoom } from '@/lib/types';
import { FloorplanExplorer } from '@/components/interactive/FloorplanExplorer';

export default function FloorplansPage() {
  const { t, locale } = useLanguage();
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(INITIAL_PROPERTIES[0].id);

  const currentProperty = INITIAL_PROPERTIES.find((p) => p.id === selectedPropertyId) || INITIAL_PROPERTIES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <span>📐</span>
            <span>{locale === 'ar' ? 'المخططات الهندسية المعمارية' : 'Architectural CAD & Space Planning'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-white">
            {locale === 'ar' ? 'استوديو المخططات والمساحات الصافية' : 'Interactive Architectural Blueprint Suite'}
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm max-w-2xl">
            {locale === 'ar'
              ? 'معاينة هندسية دقيقة للمخططات الإنشائية وتوزيع الغرف، مع تحليل تشطيبات الرخام الإيطالي، الباركيه الطبيعي، وارتفاعات الأسقف.'
              : 'Interactive 2D architectural blueprint layout with live room zoning, metric spatial analysis, ceiling heights, and finishes.'}
          </p>
        </div>

        {/* Quick CAD Export or Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => alert(locale === 'ar' ? 'جاري تحضير ملف المخطط المعماري بصيغة CAD/PDF المعتمدة...' : 'Generating certified architectural CAD / PDF package...')}
            className="px-4 py-2.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
          >
            <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{locale === 'ar' ? 'تحميل كراس المخططات (PDF)' : 'Download CAD Blueprint (PDF)'}</span>
          </button>
        </div>
      </div>

      {/* Property Selector Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800">
        {INITIAL_PROPERTIES.map((prop) => (
          <button
            key={prop.id}
            onClick={() => setSelectedPropertyId(prop.id)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
              selectedPropertyId === prop.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-900/20'
                : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-400'
            }`}
          >
            <span>◈</span>
            <span>{locale === 'ar' ? prop.title.ar : prop.title.en}</span>
            <span className="opacity-75 text-[10px]">({prop.specs.areaSqM} m²)</span>
          </button>
        ))}
      </div>

      {/* Main CAD Interactive Canvas Area */}
      <div className="space-y-8">
        <FloorplanExplorer
          rooms={currentProperty.floorplan}
          propertyTitle={locale === 'ar' ? currentProperty.title.ar : currentProperty.title.en}
        />

        {/* Architectural Technical Specifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              {locale === 'ar' ? 'المساحة المغطاة الصافية' : 'Net Built Surface'}
            </span>
            <span className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-400 mt-1 block">
              {currentProperty.specs.areaSqM} م²
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {locale === 'ar' ? 'معتمدة من ديوان قيس الأراضي' : 'Cadastral Survey Certified'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              {locale === 'ar' ? 'ارتفاع الأسقف المعمارية' : 'Ceiling Clearance'}
            </span>
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-white mt-1 block">
              3.60 - 4.20 م
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {locale === 'ar' ? 'أسقف مضاعفة بصالونات الاستقبال' : 'Double height reception voids'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              {locale === 'ar' ? 'العزل الصوتي والحراري' : 'Thermal & Acoustic Rating'}
            </span>
            <span className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400 mt-1 block">
              Classe A+
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {locale === 'ar' ? 'زجاج مضاعف معزول حرارياً' : 'Thermal break acoustic glazing'}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
              {locale === 'ar' ? 'التحكم الذكي بالمنزل' : 'Domotics & Automation'}
            </span>
            <span className="text-2xl font-bold font-serif text-stone-900 dark:text-white mt-1 block">
              Lutron / KNX
            </span>
            <span className="text-[11px] text-stone-500 mt-1 block">
              {locale === 'ar' ? 'إضاءة، تكييف، وستائر كهربائية' : 'Integrated HVAC & shading'}
            </span>
          </div>
        </div>

        {/* Detailed Room Dimensions Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <h3 className="text-lg font-bold font-serif text-stone-900 dark:text-white mb-4">
            {locale === 'ar' ? 'جدول المساحات والمواصفات الفنية للغرف' : 'Room Surface & Material Finishes Schedule'}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 text-stone-400 uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'الغرفة / الجناح' : 'Zone / Room'}</th>
                  <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'المساحة الصافية' : 'Net Area'}</th>
                  <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'الأبعاد التقريبية' : 'Dimensions'}</th>
                  <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'نوع الأرضيات والتشطيب' : 'Floor & Wall Finishes'}</th>
                  <th className="py-3 px-4 font-semibold">{locale === 'ar' ? 'الإطلالة والتهوئة' : 'Exposure / Orientation'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                {currentProperty.floorplan.map((room) => (
                  <tr key={room.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900 dark:text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span>{locale === 'ar' ? room.name.ar : room.name.en}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-600 dark:text-amber-400">
                      {room.areaSqM} م²
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500">
                      {room.dimensions}
                    </td>
                    <td className="py-3.5 px-4">
                      {room.features.join(' • ')}
                    </td>
                    <td className="py-3.5 px-4 text-emerald-600 dark:text-emerald-400 font-medium">
                      {locale === 'ar' ? 'واجهة بحرية / حدائق طبيعية' : 'Sea View / Private Landscaped Gardens'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
