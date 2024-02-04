import { detectLanguageIsoFromDeviceSettings } from './detectLanguageIsoFromDeviceSettings';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import englishTranslations from './en';
import polishTranslations from './pl';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';
    resources: {
      en: typeof englishTranslations;
      pl: typeof polishTranslations;
    };
  }
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3', // keep it until Hermes engine does not support Intl.PluralRules
  resources: {
    en: { translation: englishTranslations },
    pl: { translation: polishTranslations },
  },
  lng: detectLanguageIsoFromDeviceSettings(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const language = i18n.language;
