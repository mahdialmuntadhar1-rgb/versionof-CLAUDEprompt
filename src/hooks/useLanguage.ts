import { useState, useEffect, useCallback } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('iraq-compass-lang');
    return (saved as Language) || 'en';
  });

  const isRTL = language === 'ar' || language === 'ku';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('iraq-compass-lang', language);
  }, [language, isRTL]);

  const t = useCallback((key: string): string => {
    return TRANSLATIONS[language][key] || key;
  }, [language]);

  return { language, setLanguage, isRTL, t };
};
