import { createI18n } from 'vue-i18n';
import { messages } from './messages';

export const i18n = createI18n({
  locale: window.navigator.languages[0] ?? 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})