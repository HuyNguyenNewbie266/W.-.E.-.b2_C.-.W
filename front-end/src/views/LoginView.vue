<template>
  <main class=" flex items-center justify-center p-20 z-15">
    <div class="glass shadow-sm rounded-xl max-w-lg w-full p-10 flex flex-col items-center dark:bg-slate-800/40">
      
      <div class="flex items-center gap-2 mb-10">
        <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-primary">
          <img src="../assets/image-icon.png" alt="Logo" class="h-full w-full object-cover" />
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
  theme: 'filled_blue', 
  size: 'large', 
  shape: 'square', 
  width: '300', 
  locale: 'en',
  text: 'continue_with',
});


const emit = defineEmits(['login-success']);

const handleGoogleCallback = async (response) => {
  try {
    const res = await api.auth.googleLogin({
      credential: response.credential
    });
    
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    localStorage.setItem('role', res.user.role);
    
    toast.success('Login successful');
    
    router.push('/');
    emit('login-success');
    
  } catch (error) {
    console.error('Failed to login with Google:', error);
    toast.error('Failed to login. Please try again or contact your administrator.');
  }
};
</script>