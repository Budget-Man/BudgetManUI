import { createI18n } from 'vue-i18n';
// Import your language files
import enLanguage from './en.json';
import vnLanguage from './vn.json';

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
      messages: {
      en: enLanguage,
      vn: vnLanguage,
    },
})

