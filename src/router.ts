import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/', name: 'Layout', component: () => import('./layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
      { path: '/add-todo', name: 'NewTodoForm', component: () => import('./views/Form.vue') }
    ]
  },
] as RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})