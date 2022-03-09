import 'react-i18next';
import en from 'i18n/resources/en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    ns: [];
    // intellisense for i18n
    resources: {common: typeof en};
  }
}
