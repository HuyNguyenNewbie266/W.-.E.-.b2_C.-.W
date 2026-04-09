import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/Home',
    
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { 
      requiresAuth: false,
      hideLayout: true
    }
  },

    {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: { requiresAuth: false,
          hideLayout: true
    }

  },

  {
    path: '/article',
    name: 'article',
    component: () => import('../views/ArticleView.vue'),
    meta: { requiresAuth: true ,
          hideLayout: false
    }
  },

  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
    meta: { requiresAuth: true ,
          hideLayout: false
    }
  },


  {
    path: '/ticket-details',
    name: 'ticket-details',
    component: () => import('../views/TicketDetailView.vue'),
    meta: { requiresAuth: true ,
          hideLayout: false
    }
  },

  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
     }
  },

  {
    path: '/submit',
    name: 'Submit',
    component: () => import('../views/SubmitView.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
    }

  },

  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/SearchView.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
    }

  },

  {
    path: '/my-tickets',
    name: 'my-tickets',
    component: () => import('../views/Tickets.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
    }

  },







  {
    path: '/responses',
    name: 'responses',
    component: () => import('../views/Responses.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
    }
  },
  {
    path: '/responses/new',
    name: 'new-response',
    component: () => import('../views/New.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
    }
  },
  {
    path: '/responses/:id',
    name: 'show',
    component: () => import('../views/Show.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
    }
  },
  {
    path: '/responses/:id/edit',
    name: 'edit',
    component: () => import('../views/Edit.vue'),
    meta: { requiresAuth: true,
          hideLayout: false
    }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active', 
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = !!localStorage.getItem('token');

  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/Home');
  } else {
    next();
  }
});


export default router;