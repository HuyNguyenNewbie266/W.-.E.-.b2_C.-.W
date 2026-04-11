<template>
  <div class="knowledge-base-view">
    <section class="relative py-16 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50"></div>
      
      <div class="relative max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-black mb-6 tracking-tight">How can we help?</h1>
        
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div class="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden p-1.5">
            <div class="pl-4 flex items-center justify-center text-slate-400">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input 
              v-model="searchQuery" 
              @keyup.enter="handleSearch"
              class="w-full border-none focus:ring-0 bg-transparent text-lg py-3 px-3 outline-none placeholder:text-slate-400" 
              placeholder="Search for articles..." 
              type="text"
            />
            <button @click="handleSearch" class="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        
        <div class="flex-1">
          <div class="mb-16">
            <h2 class="text-2xl font-bold mb-8">Categories</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              
              <div @click="searchByCategory('Account Management')" class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
                  <span class="material-symbols-outlined">person</span>
                </div>
                <h3 class="text-lg font-bold mb-2">Account Management</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Security settings, profiles, and permissions.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View {{ counts['Account Management'] || 0 }} articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              <div @click="searchByCategory('Billing')" class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
                  <span class="material-symbols-outlined">payments</span>
                </div>
                <h3 class="text-lg font-bold mb-2">Billing</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Invoices, payment methods, and plans.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View {{ counts['Billing'] || 0 }} articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              <div @click="searchByCategory('Technical Support')" class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
                  <span class="material-symbols-outlined">settings</span>
                </div>
                <h3 class="text-lg font-bold mb-2">Technical Support</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Software issues, bug reports, and tools.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View {{ counts['Technical Support'] || 0 }} articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              <div @click="searchByCategory('Network')" class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
                <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
                  <span class="material-symbols-outlined">api</span>
                </div>
                <h3 class="text-lg font-bold mb-2">Network</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Connectivity issues, troubleshooting, and configuration.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View {{ counts['Network'] || 0 }} articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-bold">Recent Articles</h2>
            </div>
            
            <div v-if="recentArticles.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <router-link 
                v-for="article in recentArticles" 
                :key="article._id"
                :to="{ name: 'response-details', params: { id: article._id } }"
                class="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary transition-colors group cursor-pointer">
                <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">description</span>
                <span class="font-medium truncate flex-1">{{ article.title }}</span>
                <span class="material-symbols-outlined ml-auto text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </router-link>
            </div>
            <div v-else class="text-slate-500 italic">No recent articles found.</div>
          </div>
          
        </div>

        <aside class="w-full lg:w-64">
          <div class="sticky top-24 space-y-6">
            <div class="p-6 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden">
              <div class="absolute -right-8 -bottom-8 text-white/10">
                <span class="material-symbols-outlined text-[120px] rotate-12">help_center</span>
              </div>
              <div class="relative z-10">
                <h3 class="text-xl font-bold mb-2">Still need help?</h3>
                <p class="text-primary-100/80 mb-6 text-sm">Can't find what you're looking for? Our support team is ready to assist you.</p>
                <router-link to="/submit" class="block text-center w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                  Submit a Ticket
                </router-link>
              </div>
            </div>
          </div>
        </aside>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../helpers/apiHelper'; 

const router = useRouter();
const searchQuery = ref('');
const counts = ref({});
const recentArticles = ref([]);

onMounted(async () => {
  try {
    // Gọi song song 2 API đếm và lấy bài mới để load nhanh hơn
    const [countsData, recentData] = await Promise.all([
      api.responses.getCounts(),
      api.responses.getRecent(4)
    ]);
    counts.value = countsData;
    recentArticles.value = recentData;
  } catch (error) {
    console.error("Failed to fetch dashboard data", error);
  }
});

// Chuyển sang trang Search kèm theo từ khóa
const handleSearch = () => {
  router.push({ name: 'Search', query: { q: searchQuery.value } });
};

// Bấm vào cục Category cũng tự động chuyển sang trang search với category đó
const searchByCategory = (cat) => {
  router.push({ name: 'Search', query: { q: cat } });
};
</script>