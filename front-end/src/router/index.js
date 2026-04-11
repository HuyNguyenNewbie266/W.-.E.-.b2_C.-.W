import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    redirect: '/home',
  },

  // --- CÁC ROUTE DÀNH CHO ADMIN ---
  {
    path: '/admin/search',
    name: 'AdminSearch',
    component: () => import('../views/AdminSearchView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/admin/edit/:id',
    name: 'AdminUnifiedEdit',
    component: () => import('../views/AdminUnifiedEditView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/create',
    name: 'AdminUnifiedCreate',
    component: () => import('../views/AdminUnifiedCreateView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  
  // --- CÁC ROUTE CHUNG (USER & ADMIN ĐỀU VÀO ĐƯỢC) ---
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

// --- CẬP NHẬT LOGIC KIỂM TRA ROLE ---
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin); // Kiểm tra xem route có cần quyền admin không
  
  const isAuthenticated = !!localStorage.getItem('token');
  
  // Giả sử bạn lưu role của user dưới dạng 'role' trong localStorage lúc đăng nhập (ví dụ: 'admin' hoặc 'user')
  const userRole = localStorage.getItem('role'); 

  if (requiresAuth && !isAuthenticated) {
    // 1. Nếu cần đăng nhập mà chưa có token -> Đẩy về Login
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    // 2. Nếu đã đăng nhập mà cố vào lại trang Login -> Đẩy về Home
    next('/home'); // Sửa lại chữ thường cho khớp với path '/home'
  } 
  else if (requiresAdmin && userRole !== 'admin') {
    // 3. Nếu route yêu cầu Admin, nhưng role không phải là admin -> Từ chối truy cập (Đẩy về Home hoặc trang báo lỗi 403)
    // Bạn có thể đổi '/home' thành '/403' nếu bạn có tạo một trang Unauthorized riêng
    next(`/home`); 
  }
   else {
    // 4. Hợp lệ -> Cho qua
    next();
  }
});

export default router;