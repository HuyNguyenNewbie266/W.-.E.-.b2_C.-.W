<template>
  <div class="bg-slate-50 text-slate-900 font-display min-h-screen dark:bg-slate-900 dark:text-white">
    
    <div class="pt-16 flex min-h-screen">
      <main class="flex-1 px-4 lg:px-12 py-8 bg-slate-50 dark:bg-slate-900">
        
        <div v-if="isLoading" class="max-w-5xl mx-auto py-20 text-center text-slate-500">
          <span class="material-symbols-outlined animate-spin text-4xl mb-2">autorenew</span>
          <p>Loading article...</p>
        </div>

        <div v-else class="max-w-5xl mx-auto">
          
          <nav class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6 dark:text-slate-400">
            <router-link :to="{ name: 'Search' }" class="hover:text-primary transition-colors">Knowledge Base</router-link>
            <span class="material-symbols-outlined text-[12px]">chevron_right</span>
            <span class="text-slate-600 dark:text-slate-300">{{ article.category }}</span>
            <span class="material-symbols-outlined text-[12px]">chevron_right</span>
            <span class="text-slate-900 dark:text-slate-200">{{ article.key }}</span>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div class="lg:col-span-8 space-y-6">
              <header class="mb-8">
                <h1 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                  {{ article.title }}
                </h1>
                
                <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div class="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-bold text-xs">
                    <span class="material-symbols-outlined text-[14px]">tag</span>
                    {{ article.key }}
                  </div>
                  
                  <span>•</span>
                  
                  <div class="flex items-center gap-1.5 text-primary font-medium">
                    <span class="material-symbols-outlined text-[16px]">folder_open</span>
                    {{ article.category }}
                  </div>
                  
                  <span>•</span>
                  
                  <div class="flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]">update</span>
                    <span>Updated {{ formatDate(article.updatedAt) }}</span>
                  </div>
                </div>
              </header>

              <article class="glass rounded-xl p-8 lg:p-10 shadow-sm border border-white/30 dark:border-slate-700/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
                <div class="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap" v-html="article.value"></div>
              </article>

            </div>

            <aside class="lg:col-span-4 space-y-8 sticky top-24">
              
              <div class="bg-primary rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                <div class="relative z-10">
                  <h4 class="text-lg font-bold mb-2">Still need help?</h4>
                  <p class="text-sm opacity-90 mb-4 leading-snug">If this article didn't solve your issue, our support team is available 24/7.</p>
                  <router-link to="/submit" class="block text-center w-full bg-white text-primary py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
                    Submit a Ticket
                  </router-link>
                </div>
                <span class="material-symbols-outlined absolute -bottom-4 -right-4 text-white/10 text-8xl rotate-12 select-none">support_agent</span>
              </div>
              
            </aside>

          </div>
        </div>
      </main>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../helpers/apiHelper'; 
import { useToast } from 'vue-toastification';

const route = useRoute();
const toast = useToast();

const article = ref({});
const isLoading = ref(true);

onMounted(async () => {
  try {
    const articleId = route.params.id; 
    article.value = await api.responses.getById(articleId);
  } catch (error) {
    console.error("Error loading article:", error);
    toast.error('Failed to load the article.');
  } finally {
    isLoading.value = false;
  }
});

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
};
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>