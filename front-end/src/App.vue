<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
    
    

    <header v-if="!$route.meta.hideLayout" class="fixed top-0 left-0 w-full z-50 border-b border-slate-200/60  backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80 " :class="user?.role === 'admin'? 'bg-primary' : ''">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        <div class="flex items-center gap-2">
          <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-primary">
            <img 
              src="./assets/image-icon.png" 
              alt="QuickFix Logo" 
              class="h-full w-full object-cover"
            />
          </div>
          <span :class="user?.role === 'admin' ? 'text-xl font-bold tracking-tight text-slate-900 text-white' : 'text-xl font-bold tracking-tight text-slate-900 dark:text-white'">{{ user?.role === 'admin' ? 'Admin' : 'HelpDesk-GCS230465' }}</span>
        </div>

        <nav class="hidden flex-1 justify-center gap-10 md:flex text-white">
          <router-link to="/" class="text-sm font-semibold  dark:text-slate-300 dark:hover:text-primary transition-colors" :class="user?.role === 'admin' ? 'text-white hover:text-slate-400' : 'text-slate-600 hover:text-primary'">Home</router-link>
          <router-link v-if="user?.role === 'admin'" to="/admin/search" class="text-sm font-semibold   dark:text-slate-300 dark:hover:text-primary transition-colors" :class="user?.role === 'admin' ? 'text-white hover:text-slate-400' : 'text-slate-600 hover:text-primary'">Admin Search</router-link>
          <router-link v-if="user?.role === 'admin'" to="/admin/create" class="text-sm font-semibold   dark:text-slate-300 dark:hover:text-primary transition-colors" :class="user?.role === 'admin' ? 'text-white hover:text-slate-400' : 'text-slate-600 hover:text-primary'">Admin Create</router-link>
          <router-link v-if="user?.role !== 'admin'" to="/responses" class="text-sm font-semibold   dark:text-slate-300 dark:hover:text-primary transition-colors" :class="user?.role === 'admin' ? 'text-white hover:text-slate-400' : 'text-slate-600 hover:text-primary'">Knowledge Base</router-link>
          <router-link v-if="user?.role !== 'admin'" to="/my-tickets" class="text-sm font-semibold   dark:text-slate-300 dark:hover:text-primary transition-colors" :class="user?.role === 'admin' ? 'text-white hover:text-slate-400' : 'text-slate-600 hover:text-primary'">My Tickets</router-link>
          <router-link v-if="user?.role !== 'admin'" to="/test" class="text-sm font-semibold   dark:text-slate-300 dark:hover:text-primary transition-colors" :class="user?.role === 'admin' ? 'text-white hover:text-slate-400' : 'text-slate-600 hover:text-primary'">Test</router-link>
          
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

    <main  class="flex-1 w-full mx-auto max-w-7xl px-6 pt-20 pb-20 lg:px-10">
      <router-view @login-success="handleLoginSuccess" />
    </main>

    
    <footer class="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-background-dark">
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-3">
          
          <div class="lg:col-span-1">
        <div class="flex items-center gap-2">
          <div class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-primary">
            <img 
              src="./assets/image-icon.png" 
              alt="Logo" 
              class="h-full w-full object-cover"
            />
          </div>
          <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HelpDesk-GCS230465</span>
        </div>
            <p class="mt-4 text-sm text-slate-500 leading-relaxed">
              This is a demo helpdesk system built for the Web Programming 2 course. It allows users to submit support tickets, view their ticket history, and access a knowledge base of common issues and solutions.
            </p>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Contact Support</h4>
            <ul class="mt-4 space-y-3">
              <li class="flex items-center gap-2 text-sm text-slate-500">
                <span class="material-symbols-outlined text-base">mail</span> huynguyen2662005@gmail.com
              </li>
              <li class="flex items-center gap-2 text-sm text-slate-500">
                <span class="material-symbols-outlined text-base">call</span> +84 347 849 872
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Socials</h4>
            <div class="mt-4 flex gap-4">
              <a href="https://www.facebook.com/nguyen.tan.huy.259851" target="_blank">
              <span class="text-sm text-slate-500">Facebook</span>
              </a>
            </div>
          </div>



        </div>
        
        <div class="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
          <p class="text-center text-xs text-slate-400">
            © 2026 Nguyen Tan Huy - GCS230465. All rights reserved.
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
      console.error("Error:", e);
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