import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },

  // Admin's routes
  {
    path: '/admin/search',
    name: 'AdminSearch',
    component: () => import('../views/AdminSearchView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideLayout: false }
  },
  {
    path: '/admin/edit/:id',
    name: 'AdminUnifiedEdit',
    component: () => import('../views/AdminUnifiedEditView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideLayout: false }
  },
  {
    path: '/admin/create',
    name: 'AdminUnifiedCreate',
    component: () => import('../views/AdminUnifiedCreateView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, hideLayout: false }
  },

  // Common routes
  {
    path: '/ai-chat',
    name: 'ai-chat',
    component: () => import('../views/AiChatView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false, hideLayout: true, requiresAdmin: false }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },
  {
    path: '/ticket-details/:id',
    name: 'ticket-details',
    component: () => import('../views/TicketDetailView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },
  {
    path: '/submit',
    name: 'Submit',
    component: () => import('../views/SubmitView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },
  {
    path: '/my-tickets',
    name: 'my-tickets',
    component: () => import('../views/TicketsView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },
  {
    path: '/responses',
    name: 'responses',
    component: () => import('../views/ResponsesView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  },

  {
    path: '/responses/:id',
    name: 'response-details',
    component: () => import('../views/ResponseDetailsView.vue'),
    meta: { requiresAuth: true, hideLayout: false, requiresAdmin: false }
  }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes
});

router.beforeEach((to, from) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  const isAuthenticated = !!localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (requiresAuth && !isAuthenticated) {
    return '/login';
  }

  if (to.path === '/login' && isAuthenticated) {
    return '/home';
  }

  if (requiresAdmin && userRole !== 'admin') {
    return '/home';
  }

});

export default router;