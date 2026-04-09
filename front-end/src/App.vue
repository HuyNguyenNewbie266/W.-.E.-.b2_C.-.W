<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
    
    <header v-if="!$route.meta.hideLayout" class="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        <div class="flex items-center gap-2">
          <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-primary">
            <img 
              src="./assets/image-icon.png" 
              alt="QuickFix Logo" 
              class="h-full w-full object-cover"
            />
          </div>
          <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HelpDesk-GCS230465</span>
        </div>

        <nav class="hidden flex-1 justify-center gap-10 md:flex">
          <router-link to="/" class="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Home</router-link>
          <router-link to="/responses" class="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Knowledge Base</router-link>
          <router-link to="/my-tickets" class="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">My Tickets</router-link>
        </nav>

        <div class="flex items-center gap-4">


          <div v-if="$route.meta.requiresAuth" class="relative">
            <button @click="toggleMenu" class="flex items-center focus:outline-none">
              <div 
                class="h-10 w-10 rounded-full border-2 border-slate-200 bg-cover bg-center cursor-pointer hover:border-primary transition-colors" 
                :style="{ backgroundImage: `url(${user.avatar || 'https://ui-avatars.com/api/?name=' + user.name})` }"
              ></div>
            </button>

            <div v-if="showMenu" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 z-50">
               <div class="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                  <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ user.name }}</p>
                  <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
               </div>
              <button 
                @click="handleLogout" 
                class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
          
          <router-link v-else-if="$route.meta.requiresAuth" to="/login" class="flex items-center justify-center rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-95 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
            Login
          </router-link>

        </div>
      </div>
    </header>

    <main  class="flex-1 w-full mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <router-view @login-success="handleLoginSuccess" />
    </main>

    
    <footer class="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-background-dark">
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-4">
          
          <div class="lg:col-span-1">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <span class="material-symbols-outlined text-lg">bolt</span>
              </div>
              <span class="text-lg font-bold text-slate-900 dark:text-white">QuickFix</span>
            </div>
            <p class="mt-4 text-sm text-slate-500 leading-relaxed">
              Empowering teams with instant solutions and intelligent support tools since 2021.
            </p>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Contact Support</h4>
            <ul class="mt-4 space-y-3">
              <li class="flex items-center gap-2 text-sm text-slate-500">
                <span class="material-symbols-outlined text-base">mail</span> support@quickfix.io
              </li>
              <li class="flex items-center gap-2 text-sm text-slate-500">
                <span class="material-symbols-outlined text-base">call</span> +1 (888) QFIX-NOW
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Socials</h4>
            <div class="mt-4 flex gap-4">
              <span class="text-sm text-slate-500">Facebook | Twitter | LinkedIn</span>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Status</h4>
            <div class="mt-4 flex items-center gap-2">
              <span class="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400">All Systems Operational</span>
            </div>
          </div>

        </div>
        
        <div class="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
          <p class="text-center text-xs text-slate-400">
            © 2026 QuickFix Inc. All rights reserved. Built with precision for your productivity.
          </p>
        </div>
      </div>
    </footer>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref(null);
const showMenu = ref(false);

// Kiểm tra và lấy dữ liệu user khi component mount
const checkUser = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      user.value = JSON.parse(userData);
    } catch (e) {
      console.error("Lỗi parse dữ liệu user:", e);
      user.value = null;
    }
  } else {
    user.value = null;
  }
};

onMounted(() => {
  checkUser();
  
  // Lắng nghe sự kiện để cập nhật lại trạng thái user nếu thay đổi ở tab khác hoặc ngay sau khi login
  window.addEventListener('storage', checkUser);
});

onUnmounted(() => {
  window.removeEventListener('storage', checkUser);
});

// Toggle dropdown menu
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

// Đóng menu khi click ra ngoài (Optional nhưng nên có cho UX tốt hơn)
const closeMenuOnClickOutside = (e) => {
  if (showMenu.value && !e.target.closest('.relative')) {
    showMenu.value = false;
  }
};
onMounted(() => window.addEventListener('click', closeMenuOnClickOutside));
onUnmounted(() => window.removeEventListener('click', closeMenuOnClickOutside));


const handleLogout = () => {
  // Xóa dữ liệu local
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  
  // Cập nhật state
  user.value = null;
  showMenu.value = false;

  // Đẩy về trang login
  router.push('/login');
};

const handleLoginSuccess = () => {
  checkUser();
};
</script>