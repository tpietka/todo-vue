import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = [
    {
        path: '/', name: 'Layout', component: () => import('./layouts/MainLayout.vue'),
        children: [
            { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
            { path: '/add-todo', name: 'Form', component: () => import('./views/Form.vue') }
        ]
    },
] as RouteRecordRaw[];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

createApp(App).use(router).use(createPinia()).mount('#app')
