import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/HomeView'
  },

  {
    path: '/tickets',
    name: 'tickets',
    component: () => import('../views/Tickets.vue')
  },

  {
    path: '/HomeView',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/responses',
    name: 'responses',
    component: () => import('../views/Responses.vue') 
  },
  {
    path: '/responses/new',
    name: 'new-response',
    component: () => import('../views/New.vue')
  },
  {
    path: '/responses/:id',
    name: 'show',
    component: () => import('../views/Show.vue')
  },
  {
    path: '/responses/:id/edit',
    name: 'edit',
    component: () => import('../views/Edit.vue')
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active', 
  routes
});

export default router;