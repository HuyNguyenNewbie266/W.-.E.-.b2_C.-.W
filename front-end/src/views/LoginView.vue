<template>
  <main class=" flex items-center justify-center p-20 z-15">
    <div class="glass shadow-sm rounded-xl max-w-lg w-full p-10 flex flex-col items-center dark:bg-slate-800/40">
      
      <div class="flex items-center gap-2 mb-10">
        <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-primary">
          <img src="../assets/image-icon.png" alt="QuickFix Logo" class="h-full w-full object-cover" />
        </div>
        <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">HelpDesk-GCS230465</span>
      </div>

      <div class="w-full text-center mb-6">
        <h2 class="text-2xl font-bold text-slate-800 dark:text-white mb-2">Welcome Back</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">Please sign in with your company account</p>
      </div>

      <div class="w-full flex justify-center mt-4">
        <GoogleLogin :callback="handleGoogleCallback" :button-config="googleButtonConfig"/>
      </div>

      <div class="mt-10 pt-8 border-t border-slate-200 w-full text-center dark:border-slate-700">
        <p class="text-xs text-slate-400">Don't have an account? Contact your administrator.</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { api } from '../helpers/apiHelper';
import { ref } from 'vue';

const router = useRouter();
const toast = useToast();

const googleButtonConfig = ref({
   // Ép tiếng Anh
  theme: 'filled_blue', // Giao diện màu đen (rất hợp với Dark Mode)
  size: 'large', // Nút to ra
  shape: 'square', // Bo góc nhẹ (có thể đổi thành 'pill' để bo tròn hẳn)
  width: '400', // Đặt chiều rộng cố định để nút trông cân đối
  locale: 'zh_CN',
  text: 'continue_with',
  logo_alignment: 'center',
});


const emit = defineEmits(['login-success']);

// Hàm này tự động chạy khi người dùng chọn tài khoản Google thành công
const handleGoogleCallback = async (response) => {
  try {
    // response.credential chính là ID Token do Google cấp
    const res = await api.auth.googleLogin({
      credential: response.credential
    });
    
    // Lưu Token và thông tin User vào localStorage
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('role', res.user.role);
    
    toast.success('Login successful');
    
    // Chuyển hướng về trang chủ
    router.push('/');
    emit('login-success');
    
  } catch (error) {
    console.error('Failed to login with Google:', error);
    toast.error('Failed to login. Please try again or contact your administrator.');
  }
};
</script>