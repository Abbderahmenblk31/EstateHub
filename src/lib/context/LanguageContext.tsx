'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, Currency, TRANSLATIONS } from '../i18n/translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  t: typeof TRANSLATIONS.ar;
  formatPrice: (amount: number, overrideCurrency?: Currency) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'ar',
  setLocale: () => {},
  toggleLocale: () => {},
  currency: 'TND',
  setCurrency: () => {},
  t: TRANSLATIONS.ar,
  formatPrice: (a) => `${a.toLocaleString()} د.ت`,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');
  const [currency, setCurrencyState] = useState<Currency>('TND');

  useEffect(() => {
    try {
      const savedLoc = localStorage.getItem('estatehub-locale') as Locale | null;
      if (savedLoc === 'ar' || savedLoc === 'en') {
        setLocaleState(savedLoc);
        applyDirection(savedLoc);
      } else {
        setLocaleState('ar');
        applyDirection('ar');
      }

      const savedCur = localStorage.getItem('estatehub-currency') as Currency | null;
      if (savedCur === 'TND' || savedCur === 'USD' || savedCur === 'EUR') {
        setCurrencyState(savedCur);
      }
    } catch {}
  }, []);

  const applyDirection = (loc: Locale) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', loc);
      document.documentElement.setAttribute('dir', loc === 'ar' ? 'rtl' : 'ltr');
      if (loc === 'ar') {
        document.body.classList.add('rtl-layout');
      } else {
        document.body.classList.remove('rtl-layout');
      }
    }
  };

  const setLocale = (newLoc: Locale) => {
    setLocaleState(newLoc);
    applyDirection(newLoc);
    try {
      localStorage.setItem('estatehub-locale', newLoc);
    } catch {}
  };

  const toggleLocale = () => {
    const next = locale === 'ar' ? 'en' : 'ar';
    setLocale(next);
  };

  const setCurrency = (newCur: Currency) => {
    setCurrencyState(newCur);
    try {
      localStorage.setItem('estatehub-currency', newCur);
    } catch {}
  };

  const formatPrice = (amount: number, overrideCurrency?: Currency) => {
    const activeCur = overrideCurrency || currency;
    let converted = amount;

    // Standard conversion factor if switching currencies: 1 TND ≈ 0.32 USD ≈ 0.30 EUR
    if (activeCur === 'USD') converted = Math.round(amount * 0.32);
    if (activeCur === 'EUR') converted = Math.round(amount * 0.30);

    const formattedNum = converted.toLocaleString();

    if (activeCur === 'TND') {
      return locale === 'ar' ? `${formattedNum} د.ت` : `${formattedNum} TND`;
    }
    if (activeCur === 'EUR') {
      return `€${formattedNum}`;
    }
    return `$${formattedNum}`;
  };

  const t = TRANSLATIONS[locale] || TRANSLATIONS.ar;

  return (
    <LanguageContext.Provider
      value={{
        locale,
        setLocale,
        toggleLocale,
        currency,
        setCurrency,
        t,
        formatPrice,
      }}
    >
      <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
