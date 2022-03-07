import i18n, {CallbackError, ReadCallback, ResourceKey} from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import {initReactI18next} from 'react-i18next';

// async loading resources instead of loading them all at once
const importFn = async (language: string, namespace: string, callback: ReadCallback) => {
  try {
    const resources = (await import(`./resources/${language}.json`)) as ResourceKey;

    callback(null, resources);
  } catch (e) {
    callback(e as CallbackError, null);
  }
};

void i18n
  .use(
    resourcesToBackend((...args) => {
      void importFn(...args);
    })
  )
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',

    // Remove `translation` ns
    ns: [],

    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
  });

export default i18n;
