import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const i18nConfig = {
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: 'fr',
  supportedLngs: ['fr', 'en'],
  defaultNS: 'common',
  ns: ['common', 'popup'],

  detection: {
    order: ['localStorage', 'navigator'],
    lookupLocalStorage: 'i18nextLng',
    caches: ['localStorage'],
  },

  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },

  interpolation: {
    escapeValue: false,
  },
};

// Éviter l'initialisation côté serveur
if (typeof window !== 'undefined') {
  i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(i18nConfig);
}

export default i18next;

export const defaultNS = 'common'

export const resources = {
  en: {
    popup: {
      "Enter your e-mail address to subscribe to the newsletter:": "Enter your e-mail address to subscribe to the newsletter:",
      "Thank you for registering!": "Thank you for registering!"
    }
  },
  // autres langues...
} 