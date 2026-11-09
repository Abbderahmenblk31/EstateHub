'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/context/LanguageContext';
import { INITIAL_LEADS, INITIAL_PROPERTIES } from '@/lib/data/mock-estate-data';
import { LeadInquiry } from '@/lib/types';

type LeadStatus = 'NEW' | 'CONTACTED' | 'TOUR_SCHEDULED' | 'OFFER_MADE' | 'CLOSED';

export default function BrokerCrmPage() {
  const { t, locale, formatPrice } = useLanguage();

  const [leads, setLeads] = useState<LeadInquiry[]>(INITIAL_LEADS);
  const [filterQuery, setFilterQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New lead form state
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('+216 ');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newPropertyId, setNewPropertyId] = useState(INITIAL_PROPERTIES[0].id);
  const [newBudget, setNewBudget] = useState(INITIAL_PROPERTIES[0].price);
  const [newInquiryType, setNewInquiryType] = useState<'BUY' | 'RENT' | 'SCHEDULE_TOUR'>('SCHEDULE_TOUR');
  const [newNotes, setNewNotes] = useState('');

  const columns: { key: LeadStatus; labelAr: string; labelEn: string; color: string; badge: string }[] = [
    { key: 'NEW', labelAr: 'طلبات جديدة', labelEn: 'New Inquiries', color: 'border-blue-500', badge: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
    { key: 'CONTACTED', labelAr: 'تم التواصل والتأهيل', labelEn: 'Contacted', color: 'border-amber-500', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
    { key: 'TOUR_SCHEDULED', labelAr: 'معاينة مجدولة', labelEn: 'Tour Scheduled', color: 'border-purple-500', badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' },
    { key: 'OFFER_MADE', labelAr: 'تقديم عرض رسمي', labelEn: 'Offer Made', color: 'border-rose-500', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' },
    { key: 'CLOSED', labelAr: 'صفقة منجزة وتوثيق', labelEn: 'Deal Closed', color: 'border-emerald-500', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  ];

  const totalPipelineValue = leads.reduce((sum, l) => sum + (l.budget || 0), 0);
  const estimatedCommission = Math.round(totalPipelineValue * 0.03); // 3% standard broker fee

  const moveStatus = (id: string, newStatus: LeadStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
    );
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newClientPhone.trim()) return;

    const prop = INITIAL_PROPERTIES.find((p) => p.id === newPropertyId) || INITIAL_PROPERTIES[0];
    const createdLead: LeadInquiry = {
      id: `LEAD-${Date.now().toString().slice(-4)}`,
      propertyId: prop.id,
      propertyTitle: locale === 'ar' ? prop.title.ar : prop.title.en,
      clientName: newClientName,
      clientPhone: newClientPhone,
      clientEmail: newClientEmail || 'client@vip-investor.tn',
      inquiryType: newInquiryType,
      budget: Number(newBudget),
      status: 'NEW',
      notes: newNotes || 'Direct walk-in / phone VIP inquiry.',
      createdAt: new Date().toISOString(),
    };

    setLeads([createdLead, ...leads]);
    setIsAddModalOpen(false);
    setNewClientName('');
    setNewClientPhone('+216 ');
    setNewClientEmail('');
    setNewNotes('');
  };

  const filteredLeads = leads.filter(
    (l) =>
      l.clientName.toLowerCase().includes(filterQuery.toLowerCase()) ||
      l.propertyTitle.toLowerCase().includes(filterQuery.toLowerCase()) ||
      l.clientPhone.includes(filterQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <span>💼</span>
            <span>{locale === 'ar' ? 'منظومة إدارة علاقات العملاء والصفقات' : 'Broker CRM & Deal Pipeline Engine'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 dark:text-white">
            {locale === 'ar' ? 'لوحة كانبان لصفقات العقارات الفاخرة' : 'Prime Real Estate Deal Pipeline'}
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-sm max-w-2xl">
            {locale === 'ar'
              ? 'متابعة مسار العملاء المميزين، جدولة المعاينات الميدانية للفيلات والقصور، وتتبع العروض الرسمية وإغلاق الصفقات.'
              : 'Track VIP investor leads, schedule private villa viewings, manage formal binding offers, and execute notary closings.'}
          </p>
        </div>

        {/* Quick Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md shadow-amber-900/20 flex items-center gap-2 transition-all"
          >
            <span className="text-base font-bold">+</span>
            <span>{locale === 'ar' ? 'إضافة عميل / صفقة جديدة' : 'Add New Deal Lead'}</span>
          </button>
        </div>
      </div>

      {/* Pipeline KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
            {locale === 'ar' ? 'قيمة الصفقات بالمسار' : 'Pipeline Volume'}
          </span>
          <span className="text-2xl font-bold font-serif text-amber-600 dark:text-amber-400 mt-1 block">
            {formatPrice(totalPipelineValue)}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            {leads.length} {locale === 'ar' ? 'صفقات نشطة قيد التفاوض' : 'active deals under negotiation'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
            {locale === 'ar' ? 'العمولة التقديرية (3%)' : 'Estimated Commission'}
          </span>
          <span className="text-2xl font-bold font-serif text-emerald-600 dark:text-emerald-400 mt-1 block">
            {formatPrice(estimatedCommission)}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            {locale === 'ar' ? 'نسبة الوساطة العقارية الرسمية' : '3.0% standard broker advisory fee'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
            {locale === 'ar' ? 'معدل التحويل للإغلاق' : 'Closing Rate'}
          </span>
          <span className="text-2xl font-bold font-serif text-stone-900 dark:text-white mt-1 block">
            28.4%
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            {locale === 'ar' ? 'متوسط سرعة الإغلاق: 22 يوماً' : 'Avg. 22 days lead-to-close'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
            {locale === 'ar' ? 'سرعة الاستجابة للطلب' : 'First Response Time'}
          </span>
          <span className="text-2xl font-bold font-serif text-stone-900 dark:text-white mt-1 block">
            18 {locale === 'ar' ? 'دقيقة' : 'mins'}
          </span>
          <span className="text-[11px] text-stone-500 mt-1 block">
            {locale === 'ar' ? 'اتصال مباشر عبر الواتساب' : 'Direct VIP Concierge response'}
          </span>
        </div>
      </div>

      {/* Filter bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center gap-3">
        <svg className="w-4 h-4 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder={locale === 'ar' ? 'بحث بالاسم، رقم الهاتف، أو اسم العقار...' : 'Search leads by client name, phone or property...'}
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          className="flex-1 bg-transparent text-xs text-stone-900 dark:text-white focus:outline-hidden"
        />
        {filterQuery && (
          <button
            onClick={() => setFilterQuery('')}
            className="text-stone-400 hover:text-stone-600 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* 5-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {columns.map((col, colIdx) => {
          const columnLeads = filteredLeads.filter((l) => l.status === col.key);
          const colValue = columnLeads.reduce((s, l) => s + (l.budget || 0), 0);

          return (
            <div
              key={col.key}
              className={`rounded-2xl bg-stone-100/70 dark:bg-stone-900/60 border-t-4 ${col.color} border-x border-b border-stone-200 dark:border-stone-800 p-3 space-y-3 min-w-[240px]`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <h3 className="text-xs font-bold text-stone-900 dark:text-white">
                    {locale === 'ar' ? col.labelAr : col.labelEn}
                  </h3>
                  <div className="text-[10px] text-stone-400 font-mono">
                    {formatPrice(colValue)}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${col.badge}`}>
                  {columnLeads.length}
                </span>
              </div>

              {/* Lead Cards in this column */}
              <div className="space-y-3">
                {columnLeads.length === 0 ? (
                  <div className="py-8 text-center text-[11px] text-stone-400 border border-dashed border-stone-200 dark:border-stone-800 rounded-xl">
                    {locale === 'ar' ? 'لا توجد صفقات هنا' : 'No deals in this stage'}
                  </div>
                ) : (
                  columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700/60 shadow-xs space-y-2.5 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs font-bold text-stone-900 dark:text-white">
                            {lead.clientName}
                          </div>
                          <a
                            href={`tel:${lead.clientPhone}`}
                            className="text-[11px] text-amber-600 dark:text-amber-400 font-mono hover:underline flex items-center gap-1"
                          >
                            <span>📞</span>
                            <span>{lead.clientPhone}</span>
                          </a>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-700 text-stone-500 font-mono">
                          {lead.inquiryType}
                        </span>
                      </div>

                      <div className="text-[11px] text-stone-600 dark:text-stone-300 font-medium line-clamp-1">
                        🏢 {lead.propertyTitle}
                      </div>

                      {lead.budget && (
                        <div className="text-xs font-bold font-mono text-emerald-600 dark:text-emerald-400">
                          {formatPrice(lead.budget)}
                        </div>
                      )}

                      <p className="text-[10px] text-stone-400 bg-stone-50 dark:bg-stone-900/50 p-2 rounded-lg line-clamp-2">
                        {lead.notes}
                      </p>

                      {/* Transition controls */}
                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-700 text-[10px]">
                        {colIdx > 0 ? (
                          <button
                            onClick={() => moveStatus(lead.id, columns[colIdx - 1].key)}
                            className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
                            title="Move back"
                          >
                            {locale === 'ar' ? 'السابق ←' : '← Back'}
                          </button>
                        ) : (
                          <span></span>
                        )}

                        {colIdx < columns.length - 1 ? (
                          <button
                            onClick={() => moveStatus(lead.id, columns[colIdx + 1].key)}
                            className="px-2 py-0.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-medium shadow-xs"
                            title="Move forward"
                          >
                            {locale === 'ar' ? '→ التالي' : 'Next →'}
                          </button>
                        ) : (
                          <span className="text-emerald-500 font-bold">✓ {locale === 'ar' ? 'منجز' : 'Done'}</span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add New Deal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-base font-bold font-serif text-stone-900 dark:text-white">
                {locale === 'ar' ? 'تسجيل عميل وصفقة استثمارية جديدة' : 'Register New Investor Lead'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-600 dark:text-stone-300 mb-1">
                  {locale === 'ar' ? 'اسم العميل / المستثمر:' : 'Client Full Name:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. سليم الماجري"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-600 dark:text-stone-300 mb-1">
                    {locale === 'ar' ? 'الهاتف (واتساب):' : 'Phone:'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-stone-600 dark:text-stone-300 mb-1">
                    {locale === 'ar' ? 'البريد الإلكتروني:' : 'Email:'}
                  </label>
                  <input
                    type="email"
                    placeholder="investor@domain.tn"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-600 dark:text-stone-300 mb-1">
                  {locale === 'ar' ? 'العقار المستهدف:' : 'Target Property:'}
                </label>
                <select
                  value={newPropertyId}
                  onChange={(e) => {
                    setNewPropertyId(e.target.value);
                    const p = INITIAL_PROPERTIES.find((item) => item.id === e.target.value);
                    if (p) setNewBudget(p.price);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                >
                  {INITIAL_PROPERTIES.map((p) => (
                    <option key={p.id} value={p.id}>
                      {locale === 'ar' ? p.title.ar : p.title.en} - ({formatPrice(p.price)})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-stone-600 dark:text-stone-300 mb-1">
                    {locale === 'ar' ? 'نوع المعاملة:' : 'Inquiry Type:'}
                  </label>
                  <select
                    value={newInquiryType}
                    onChange={(e) => setNewInquiryType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                  >
                    <option value="SCHEDULE_TOUR">{locale === 'ar' ? 'معاينة ميدانية' : 'Schedule Tour'}</option>
                    <option value="BUY">{locale === 'ar' ? 'شراء وتمليك' : 'Direct Purchase'}</option>
                    <option value="RENT">{locale === 'ar' ? 'إيجار سنوي فاخر' : 'Long Lease'}</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-stone-600 dark:text-stone-300 mb-1">
                    {locale === 'ar' ? 'الميزانية المقدرة:' : 'Budget:'}
                  </label>
                  <input
                    type="number"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-stone-600 dark:text-stone-300 mb-1">
                  {locale === 'ar' ? 'ملاحظات وتفاصيل الطلب:' : 'Notes & Qualifications:'}
                </label>
                <textarea
                  rows={2}
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder={locale === 'ar' ? 'تفضيلات العميل، أوقات الزيارة المناسبة، مصدر التمويل...' : 'Client preferences, availability, financing channel...'}
                  className="w-full px-3.5 py-2 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold"
                >
                  {locale === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-md shadow-amber-900/20"
                >
                  {locale === 'ar' ? 'حفظ الصفقة في المسار' : 'Save to Pipeline'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
