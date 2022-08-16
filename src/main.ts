import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import './index.css'
import { router } from './router';
import { i18n } from './locale/i18n';



createApp(App).use(router).use(createPinia()).use(i18n).mount('#app')
