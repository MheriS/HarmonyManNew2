import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { id } from './id';
import { en } from './en';
import type { Translations } from './id';

export type Language = 'id' | 'en';

const translations: Record<Language, Translations> = { id, en };

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'id',
  setLanguage: () => {},
  t: id,
});

const STORAGE_KEY = 'heri_portfolio_lang';

function getSavedLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') return saved;
  } catch (_) {}
  return 'id'; // Default: Indonesian
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getSavedLanguage);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (_) {}
    // Update document lang attribute for SEO & accessibility
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
