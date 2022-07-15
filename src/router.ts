import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = [
  {
    path: '/', name: 'Layout', component: () => import('./layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'Home', component: () => import('./views/Home.vue') },
      { path: '/archive', name: 'Archive', component: () => import('./views/Archive.vue') },
    ]
  },
  {
    path: '/', name: 'FormLayout', component: () => import('./layouts/FormLayout.vue'),
    children: [
      { path: '/add-todo/', name: 'NewTodoForm', component: () => import('./views/Form.vue') },
      { path: '/edit-todo/:id', name: 'EditTodoForm', component: () => import('./views/Form.vue'), props: true }
    ]
  }
] as RouteRecordRaw[];

export const router = createRouter({
  history: createWebHistory(),
  routes: routes
})