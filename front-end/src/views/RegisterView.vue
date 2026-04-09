<template>
  <div class="bg-mesh min-h-screen flex items-center justify-center p-6 font-display selection:bg-primary/20 dark:bg-slate-900">
    
    <div class="fixed top-0 right-0 -z-10 w-[40vw] h-[409px] opacity-20 pointer-events-none dark:opacity-10">
      <img 
        class="w-full h-full object-cover blur-3xl" 
        alt="Abstract tech background" 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmzhOU9NeAHxcUijzIvvse8dCiEGUpJ6kJ5aeymmlc-9obLSUC9rmUfUnSXfUavo4Skg0-19skBO41ZapD2FE7Zqi4X1wVBXftz3oUMhNQHVyjRateegBvwiu4h-xajYVa7V9q_1g8QWgRAZdUlWY1xy590JKfS9DnxTv8CMIyEnNPtB9XLXx-dwMmeH9oznJzlokVzT6TmdhDc0HK9i3g0NtvkH61WlYDwgAEmCDD3EHvnyf-FTNvTB0hPwdwKQmeNMWRCO8tcg" 
      />
    </div>

    <main class="w-full max-w-lg z-10">
      
      <div class="text-center mb-10">
        <div class="inline-flex items-center justify-center mb-4">
          <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span class="material-symbols-outlined text-white text-2xl">construction</span>
          </div>
        </div>
        <h1 class="text-[1.875rem] font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">QuickFix</h1>
        <p class="text-slate-500 font-medium mt-1 dark:text-slate-400">Enterprise Support Ecosystem</p>
      </div>

      <section class="glass rounded-xl border border-white/30 dark:border-slate-700/50 shadow-sm overflow-hidden p-8 md:p-10 dark:bg-slate-800/40">
        <header class="mb-8">
          <h2 class="text-[1.25rem] font-semibold text-slate-900 dark:text-white">Create your account</h2>
          <p class="text-slate-600 text-sm mt-1 dark:text-slate-400">Start managing your tickets and enterprise assets today.</p>
        </header>

        <form @submit.prevent="handleRegister" class="space-y-6">
          
          <div class="space-y-1.5">
            <label for="full_name" class="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Full Name</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">person</span>
              </div>
              <input 
                v-model="form.fullName"
                id="full_name" 
                type="text"
                required
                class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-[0.875rem] focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:text-white placeholder:text-slate-400" 
                placeholder="John Doe" 
              />
            </div>
          </div>

          <div class="space-y-1.5">
            <label for="email" class="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Email Address</label>
            <div class="relative group">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                <span class="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input 
                v-model="form.email"
                id="email" 
                type="email"
                required
                class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-[0.875rem] focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:text-white placeholder:text-slate-400" 
                placeholder="john@enterprise.com" 
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div class="space-y-1.5">
              <label for="password" class="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Password</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input 
                  v-model="form.password"
                  id="password" 
                  type="password"
                  required
                  class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-[0.875rem] focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:text-white placeholder:text-slate-400" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <div class="space-y-1.5">
              <label for="confirm_password" class="text-[0.75rem] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400 block">Confirm</label>
              <div class="relative group">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                  <span class="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <input 
                  v-model="form.confirmPassword"
                  id="confirm_password" 
                  type="password"
                  required
                  class="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 text-[0.875rem] focus:ring-2 focus:ring-primary/10 focus:border-primary outline-none transition-all dark:bg-slate-900/50 dark:border-slate-700 dark:text-white placeholder:text-slate-400" 
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>
          
          <p v-if="errorMessage" class="text-red-500 text-xs font-medium mt-1">
            {{ errorMessage }}
          </p>

          <div class="flex items-start gap-3 pt-2">
            <div class="flex items-center h-5">
              <input 
                v-model="form.terms"
                id="terms" 
                type="checkbox"
                required
                class="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 dark:border-slate-600 dark:bg-slate-800" 
              />
            </div>
            <div class="text-[0.75rem] text-slate-600 dark:text-slate-400">
              <label for="terms" class="font-medium text-slate-500 dark:text-slate-300 cursor-pointer">
                I agree to the <a href="#" class="text-primary hover:underline">Terms of Service</a> and <a href="#" class="text-primary hover:underline">Privacy Policy</a>.
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Creating Account...' : 'Create Account' }}
            <span v-if="!isLoading" class="material-symbols-outlined text-[18px]">arrow_forward</span>
            <span v-else class="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-slate-100/60 dark:border-slate-700/50 text-center">
          <p class="text-[0.875rem] text-slate-500 dark:text-slate-400">
            Already have an account? 
            <a href="#" class="text-primary font-semibold hover:text-blue-700 transition-colors ml-1 dark:hover:text-blue-400">Log in here</a>
          </p>
        </div>
      </section>

      <footer class="mt-12 flex flex-wrap justify-center gap-6 opacity-60">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[16px] text-slate-500 dark:text-slate-400">shield</span>
          <span class="text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">Enterprise Grade Security</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[16px] text-slate-500 dark:text-slate-400">cloud_done</span>
          <span class="text-[0.7rem] font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">99.9% Uptime SLA</span>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';

// Trạng thái form
const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
});

const isLoading = ref(false);
const errorMessage = ref('');

// Xử lý logic đăng ký
const handleRegister = async () => {
  // Reset lỗi
  errorMessage.value = '';

  // Validate mật khẩu
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Passwords do not match. Please try again.';
    return;
  }

  isLoading.value = true;
  
  try {
    // Giả lập gọi API đăng ký
    console.log('Đang gửi thông tin đăng ký:', form);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Thành công
    alert('Tài khoản đã được tạo thành công!');
    // router.push('/login'); // Chuyển hướng về trang đăng nhập
    
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    errorMessage.value = 'Registration failed. Please try again later.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
/* Tạo lại hiệu ứng nền bg-mesh từ HTML gốc */
.bg-mesh {
  background-color: #f6f6f8;
  background-image: 
    radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(37, 99, 235, 0.08) 0px, transparent 50%);
}

/* Hỗ trợ bg-mesh cho Dark Mode (nếu có class dark trên thẻ html) */
:global(.dark) .bg-mesh {
  background-color: #111621; /* background-dark từ tailwind.config.js */
  background-image: 
    radial-gradient(at 0% 0%, rgba(37, 99, 235, 0.1) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(245, 158, 11, 0.05) 0px, transparent 50%); /* Amber tint */
}

/* Lưu ý: class .glass đã được khai báo ở file tailwind.css global của bạn */
</style>