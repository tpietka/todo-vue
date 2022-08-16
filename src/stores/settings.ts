import { defineStore } from 'pinia'
import { i18n } from '../locale/i18n'

interface StoreState {
  theme: string;
  locale: string;
}
export const useSettings = defineStore('settings', {
  state: (): StoreState => {
    return {
      theme: 'light',
      locale: 'en',
    }
  },
  getters: {
  },
  actions: {
    setLocale(locale: 'pl' | 'en'): void {
      localStorage.setItem('locale', locale);
      this.locale = locale;
      this.seti18nLocale(locale);
    },
    getLocale(): void {
      const localeToSet = localStorage.getItem('locale')?.toString() == 'pl' ? 'pl' : 'en';
      this.locale = localeToSet;
      this.seti18nLocale(localeToSet);
    },
    seti18nLocale(locale: 'pl' | 'en'): void {
      i18n.global.locale = locale;
    },
    setDark(): void {
      this.theme = 'dark';
      localStorage.setItem('theme', 'dark');
      this.isDark();
    },
    setLight(): void {
      this.theme = 'light';
      localStorage.setItem('theme', 'light');
      this.isDark();
    },
    setOSColorScheme() {
      localStorage.removeItem('theme');
      this.isDark();
    },
    isDark(): void {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
        this.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark')
        this.theme = 'light'
      }
    }
  },
})