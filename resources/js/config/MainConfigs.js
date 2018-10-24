import i18n from 'i18next';
import * as yup from 'yup';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../translations/locales/en.json';
import pt from '../translations/locales/pt.json';

// i18n settings
i18n.use(LanguageDetector).init({
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  debug: process.env.MIX_APP_DEBUG,
  cache: {
    enabled: !process.env.MIX_APP_DEBUG,
  },
  interpolation: {
    escapeValue: false,
  },
  resources: { en, pt },
});

// Yup Locale
yup.setLocale({
  mixed: {
    required: i18n.t('common:formValidation.required'),
  },
  string: {
    email: i18n.t('common:formValidation.email'),
    password: i18n.t('common:formValidation.password'),
  },
});

export { i18n, yup };
