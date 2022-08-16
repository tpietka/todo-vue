import { defineStore } from 'pinia';

interface StoreState {
  display: boolean;
  message: string;
  type: string;
}
export const useAlerts = defineStore('alerts', {
  state: (): StoreState => {
    return {
      display: false,
      message: '',
      type: '',
    };
  },
  getters: {},
  actions: {
    displayAlert(message: string, type: string): void {
      this.message = message;
      this.type = type;
      this.display = true;
      setTimeout(() => {
        this.display = false;
        this.message = '';
        this.type = '';
      }, 2000);
    },
  },
});
