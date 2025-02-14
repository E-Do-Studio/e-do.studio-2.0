'use client'

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'fr',
        supportedLngs: ['fr', 'en'],
        ns: ['home', 'layout'],
        defaultNS: 'home',
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json'
        },
        detection: {
            order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
            lookupFromPathIndex: 0,
            caches: ['localStorage', 'cookie'],
            cookieMinutes: 43200,
            cookieOptions: {
                path: '/',
                sameSite: 'strict'
            }
        },
        interpolation: { escapeValue: false }
    });

export const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    document.documentElement.lang = lng;
};

export default i18n;
