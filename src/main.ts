import { createApp } from 'vue'
import App from './App.vue'

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = [
    { path: '/', name: 'Home', component: () => import('./views/Home.vue') }
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

createApp(App).use(router).mount('#app')
