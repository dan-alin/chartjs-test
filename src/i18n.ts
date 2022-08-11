/* eslint-disable no-undef */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import httpBackend from 'i18next-http-backend';

const urlSearchParams = new URLSearchParams(window.location.search);
if (urlSearchParams) {
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.lang) {
    // eslint-disable-next-line no-constant-condition
    window.configLang =
      params.lang === 'it' || params.lang === 'IT' ? 'it' : 'en';
  }
}

i18n
  .use(httpBackend)
  .use(initReactI18next)
  .init({
    defaultNS: 'common',
    fallbackLng: 'it',
    lng: window.configLang || 'it',
    supportedLngs: ['it', 'en'],
    backend: {
      loadPath: `${__webpack_public_path__}locales/{{lng}}/{{ns}}.json`,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
  });

export default i18n;
