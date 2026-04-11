<template>
  <div class="search-results-view max-w-4xl mx-auto w-full p-6 lg:p-8">
    
    <div class="mb-10">
      <div class="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-bold mb-2">
        <span class="material-symbols-outlined text-sm">manage_search</span>
        Knowledge Base Search
      </div>
      
      <h1 class="text-[1.875rem] font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
        <span v-if="searchQuery">Search results for: <span class="text-primary">{{ searchQuery }}</span></span>
        <span v-else>All Articles</span>
      </h1>
      
      <div class="relative max-w-2xl">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input 
          v-model="searchQuery"
          @keyup.enter="triggerSearch"
          class="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white outline-none" 
          type="text" 
          placeholder="What are you looking for?"
        />
        <button @click="triggerSearch" class="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5  bg-primary dark:bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors ">
          Search
        </button>
      </div>
    </div>

    <div v-if="isLoading && searchResults?.length === 0" class="py-10 text-center text-slate-500">
      <span class="material-symbols-outlined animate-spin text-4xl mb-2">autorenew</span>
      <p>Searching...</p>
    </div>

    <div v-else class="space-y-4">
      <div v-if="searchResults?.length === 0" class="text-center py-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 text-slate-500">
        No matching articles found. Try adjusting your search terms.
      </div>

      <router-link 
        v-for="result in searchResults" 
        :key="result._id"
        :to="{ name: 'response-details', params: { id: result._id } }"
        class="glass block p-6 rounded-xl hover:shadow-md transition-all group cursor-pointer dark:bg-slate-800/40"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              {{ result.title }}
            </h2>
            <div class="flex items-center gap-3 mt-1 flex-wrap">
              <span :class="getThemeClasses(result.category)" class="flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded border">
                <span :class="getDotClass(result.category)" class="w-1.5 h-1.5 rounded-full"></span> 
                {{ result.category }}
              </span>
              <span class="text-[11px] text-slate-500 font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{{ result.key }}</span>
              <span class="text-[11px] text-slate-400 font-medium">Last updated: {{ formatDate(result.updatedAt) }}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_forward</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl line-clamp-2">
          {{ result.value }}
        </p>
      </router-link>
    </div>

    <div v-if="searchResults?.length > 0" class="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
      <div class="text-xs text-slate-500 font-medium">
        Showing <span class="text-slate-900 dark:text-white">{{ searchResults.length }}</span> of <span class="text-slate-900 dark:text-white">{{ totalResults }}</span> results
      </div>
      
      <button 
        v-if="nextCursor" 
        @click="loadMore" 
        :disabled="isLoadingMore"
        class="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2">
        <span v-if="isLoadingMore" class="material-symbols-outlined animate-spin text-sm">autorenew</span>
        {{ isLoadingMore ? 'Loading...' : 'Load More' }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
// Sửa lại đường dẫn import api nếu cần
import { api } from '../helpers/apiHelper'; 
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const searchQuery = ref('');
const searchResults = ref([]);
const totalResults = ref(0);

const isLoading = ref(true);
const isLoadingMore = ref(false);

const nextCursor = ref(null);
const LIMIT_PER_PAGE = 5;

// Hàm Fetch Data với fallback chống lỗi
const fetchResults = async (isLoadMore = false) => {
  try {
    if (isLoadMore) {
      isLoadingMore.value = true;
    } else {
      isLoading.value = true;
    }

    const response = await api.responses.search({
      q: searchQuery.value,
      limit: LIMIT_PER_PAGE,
      cursor: isLoadMore ? nextCursor.value : null
    });

    // Bọc lại bằng biến an toàn, nếu backend lỗi trả về undefined thì tự fallback về []
    const safeData = response?.data || [];

    if (isLoadMore) {
      searchResults.value = [...searchResults.value, ...safeData];
    } else {
      searchResults.value = safeData;
    }

    nextCursor.value = response?.nextCursor || null;
    totalResults.value = response?.total || 0;

  } catch (error) {
    console.error("Lỗi tìm kiếm:", error);
    toast.error('Failed to load search results.');
    searchResults.value = []; // Reset về mảng rỗng nếu có lỗi
  } finally {
    isLoading.value = false;
    isLoadingMore.value = false;
  }
};

// Gọi khi user bấm nút Search hoặc nhấn Enter
const triggerSearch = () => {
  router.replace({ query: { q: searchQuery.value } });
  nextCursor.value = null; // Reset con trỏ về null
  fetchResults(false);
};

// Gọi khi user bấm Load More
const loadMore = () => {
  if (nextCursor.value) {
    fetchResults(true);
  }
};

// Khởi chạy khi vào trang
onMounted(() => {
  searchQuery.value = route.query.q || '';
  fetchResults(false);
});

// --- HELPERS (Định dạng & Màu sắc) ---
const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Gán màu cho Category dựa vào enum của DB
const getThemeClasses = (category) => {
  switch (category) {
    case 'Account Management': return 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20';
    case 'Billing': return 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20';
    case 'Technical Support': return 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20';
    case 'Network': return 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-500/10 dark:border-purple-500/20';
    default: return 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:border-slate-700';
  }
};

const getDotClass = (category) => {
  switch (category) {
    case 'Account Management': return 'bg-emerald-500';
    case 'Billing': return 'bg-amber-500';
    case 'Technical Support': return 'bg-blue-500';
    case 'Network': return 'bg-purple-500';
    default: return 'bg-slate-400';
  }
};
</script>