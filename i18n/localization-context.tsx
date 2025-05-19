import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './locales/en.json';
import hi from './locales/hi.json';

const translations = { en, hi };
const i18n = new I18n(translations);

const LocalizationContext = createContext({
  t: (key: string) => key,
  locale: 'en',
  setLocale: (locale: string) => {},
});

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState(getLocales()[0].languageCode ?? 'en');

  useEffect(() => {
    i18n.locale = locale;
    i18n.enableFallback = true;
  }, [locale]);

  return (
    <LocalizationContext.Provider value={{
      t: (key: string) => i18n.t(key),
      locale,
      setLocale,
    }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => useContext(LocalizationContext);
