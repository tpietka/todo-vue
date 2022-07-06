import { defineStore } from 'pinia'

interface StoreState {
  theme: string;
}
export const useSettings = defineStore('settings', {
  state: (): StoreState => {
    return {
      theme: 'light',
    }
  },
  getters: {
  },
  actions: {
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