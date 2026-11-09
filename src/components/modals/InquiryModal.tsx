'use client';

import React, { useState } from 'react';
import { Property } from '@/lib/types';
import { useLanguage } from '@/lib/context/LanguageContext';

interface InquiryModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function InquiryModal({ property, isOpen, onClose, onSuccess }: InquiryModalProps) {
  const { t, locale } = useLanguage();
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('+216 ');
  const [clientEmail, setClientEmail] = useState('');
  const [inquiryType, setInquiryType] = useState<'BUY' | 'RENT' | 'SCHEDULE_TOUR'>('SCHEDULE_TOUR');
  const [tourDate, setTourDate] = useState('2026-11-15');
  const [notes, setNotes] = useState('Interested in visiting and reviewing ownership certificate.');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) {
      alert('Name and phone are required.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property.id,
          propertyTitle: locale === 'ar' ? property.title.ar : property.title.en,
          clientName,
          clientPhone,
          clientEmail,
          inquiryType,
          preferredTourDate: tourDate,
          budget: property.price,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        onSuccess();
      } else {
        alert(data.error || 'Failed to submit inquiry');
      }
    } catch (err: any) {
      alert(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <div className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">
              {property.id} • {property.location.district}
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              {locale === 'ar' ? property.title.ar : property.title.en}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {locale === 'ar' ? 'الاسم الكامل *' : 'Full Name *'}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Tarek Ben Amor"
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {locale === 'ar' ? 'رقم الهاتف *' : 'Phone Number *'}
              </label>
              <input
                type="tel"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {locale === 'ar' ? 'نوع الطلب' : 'Inquiry Type'}
              </label>
              <select
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="SCHEDULE_TOUR">{t.scheduleTour}</option>
                <option value="BUY">{locale === 'ar' ? 'شراء نهائي' : 'Acquisition / Buy'}</option>
                <option value="RENT">{locale === 'ar' ? 'كراء سنوي' : 'Lease / Rent'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {locale === 'ar' ? 'التاريخ المفضل للمعاينة' : 'Preferred Viewing Date'}
              </label>
              <input
                type="date"
                value={tourDate}
                onChange={(e) => setTourDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {locale === 'ar' ? 'ملاحظات وتفاصيل إضافية' : 'Specific Inquiries & Requirements'}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            />
          </div>

          {/* Assigned Broker Card */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="text-xs">
              <span className="text-[10px] text-slate-400 block uppercase font-bold">
                {locale === 'ar' ? 'الوسيط المسؤول:' : 'Dedicated Advisor:'}
              </span>
              <span className="font-bold text-slate-900 dark:text-white">{property.agent.name}</span>
              <span className="text-[10px] text-slate-400 ml-1">({property.agent.phone})</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
              Available
            </span>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white rounded-xl shadow-sm transition-all"
            >
              {submitting ? 'Transmitting...' : t.scheduleTour}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
