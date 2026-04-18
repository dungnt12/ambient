import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en.json';
import vi from './locales/vi.json';

export const supportedLanguages = ['en', 'vi'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const defaultLanguage: SupportedLanguage = 'en';

function resolveInitialLanguage(): SupportedLanguage {
  const deviceLocales = Localization.getLocales();
  for (const loc of deviceLocales) {
    const tag = loc.languageCode as SupportedLanguage | null;
    if (tag && supportedLanguages.includes(tag)) return tag;
  }
  return defaultLanguage;
}

// eslint-disable-next-line import/no-named-as-default-member -- official i18next API
void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: resolveInitialLanguage(),
  fallbackLng: defaultLanguage,
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
  returnNull: false,
});

export { i18n };
export { useTranslation, Trans } from 'react-i18next';
