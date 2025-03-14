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

// Define a type for language options
// type LanguageOption = {
//   value: 'en' | 'vi';
//   label: string;
// };

// // Define language options
// const languageOptions: LanguageOption[] = [
//   { value: 'en', label: 'English' },
//   { value: 'vi', label: 'Tiếng Việt' }
// ];

// const languageOptions = {
//   "en": {
//     label: 'English',
//     content: enLanguage
//   }, // English messages
//   "vi": {
//     label: 'English',
//     content: viLanguage 
//    } // Vietnamese messages
// }

// Get the locale from cookies or fallback to 'en'
const locale = Cookies.get('language') || 'en';

// Define messages for each language
const languageOptions = {
  "en": enLanguage, // English messages
  "vi": viLanguage  // Vietnamese messages
};

// Create the i18n instance
const languages = createI18n({
  locale,
  fallbackLocale: 'en',
  messages : languageOptions,
  legacy: false
});

  export {languages, languageOptions}