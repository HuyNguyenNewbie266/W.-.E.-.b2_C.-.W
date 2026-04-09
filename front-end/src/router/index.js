import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/Home'
  },

  {
    path: '/ticket-details',
    name: 'ticket-details',
    component: () => import('../views/TicketDetailView.vue')
  },

  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },

  {
    path: '/submit',
    name: 'Submit',
    component: () => import('../views/SubmitView.vue')
  },

  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchView.vue')
  },

  {
    path: '/my-tickets',
    name: 'my-tickets',
    component: () => import('../views/Tickets.vue')
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