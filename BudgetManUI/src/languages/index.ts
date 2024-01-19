import { createI18n } from 'vue-i18n'; //document: https://vue-i18n.intlify.dev/guide/introduction.html
// Import your language files
import enLanguage from './en.json';
import viLanguage from './vi.json';
import Cookies from 'js-cookie';

//  console.log(navigator.language);
//  console.log(Cookies.get('language'));
if (!Cookies.get('language'))
{
  const browserLanguage = navigator.language.substring(0,2);
  Cookies.set('language',browserLanguage, { expires: 365 });
}

export default createI18n({
  locale: Cookies.get('language'),
  fallbackLocale: "en",
      messages: {
      "en": enLanguage,
      "vi": viLanguage,
    },
  legacy: false
})