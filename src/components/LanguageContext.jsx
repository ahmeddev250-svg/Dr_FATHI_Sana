import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations.js';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
  }, [lang]);

  const toggleLanguage = (targetLang) => {
    if (targetLang === 'fr' || targetLang === 'ar') {
      setLang(targetLang);
    } else {
      setLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
    }
  };

  const t = translations[lang] || translations.fr;
  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang: toggleLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
