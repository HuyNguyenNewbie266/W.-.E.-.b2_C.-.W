<template>
  <main class="flex-1 px-4 lg:px-8 py-10 max-w-7xl mx-auto w-full">
    
    <div class="mb-10 text-center max-w-3xl mx-auto">
      <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">Universal Search</h1>
      <p class="text-slate-500 mb-8">Search across Tickets, Knowledge Base, and Users instantly.</p>
      
      <div class="relative group">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-3xl">search</span>
        <input 
          v-model="searchQuery"
          @keyup.enter="performSearch"
          class="w-full pl-16 pr-6 py-5 text-lg glass rounded-2xl border-2 border-primary/20 focus:border-primary shadow-lg outline-none dark:bg-slate-800/80 dark:text-white transition-all"
          placeholder="Enter ticket number, user email, or keywords..."
        />
        <button @click="performSearch" class="absolute right-3 top-1/2 -translate-y-1/2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
          Search
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="text-center py-10 text-slate-500">
      <span class="material-symbols-outlined animate-spin text-4xl mb-2">autorenew</span>
      <p>Searching entirely database...</p>
    </div>

    <div v-else-if="results.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <div v-for="item in results" :key="item._id" class="glass p-6 rounded-2xl border border-white/50 dark:border-slate-700 hover:border-primary/50 transition-colors flex flex-col dark:bg-slate-800/40">
        
        <div class="flex justify-between items-start mb-4">
          <span class="text-xs font-black px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
            {{ item.code }}
          </span>
          <span class="text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-full border" :class="getBadgeClass(item.type)">
            {{ item.type }}
          </span>
        </div>

        <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{{ item.title }}</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 flex-1">{{ item.desc }}</p>

        <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4 mt-auto">

          
          <div class="flex gap-2">
            <button @click="deleteItem(item)" class="p-2 text-slate-400 hover:text-red-500 bg-slate-50 hover:bg-red-50 dark:bg-slate-800 rounded-lg transition-colors">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
              <router-link :to="`/admin/edit/${item._id}?type=${item.type}`" class="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">edit</span> Edit
              </router-link>

              <router-link v-if="item.type === 'Response'" :to="`/responses/${item._id}`" class="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">visibility</span> View
              </router-link>
              <router-link v-else :to="`/ticket-details/${item._id}`" class="px-4 py-2 bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1">
                <span class="material-symbols-outlined text-sm">visibility</span> View
              </router-link>

          </div>
        </div>
      </div>
    </div>

    <div v-else-if="hasSearched" class="text-center py-20 bg-slate-50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
      <span class="material-symbols-outlined text-6xl text-slate-300 mb-4">search_off</span>
      <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300">No records found</h3>
      <p class="text-slate-500 mt-2">Try searching with different keywords or check the ID format.</p>
    </div>

  </main>
</template>

<script setup>
import { ref } from 'vue';
import { api } from '../helpers/apiHelper';
import { useToast } from 'vue-toastification';
import router from '@/router';

const toast = useToast();
const searchQuery = ref('');
const results = ref([]);
const isLoading = ref(false);
const hasSearched = ref(false);

const performSearch = async () => {
  if (!searchQuery.value.trim()) return;
  isLoading.value = true;
  hasSearched.value = true;
  try {
    results.value = await api.universal.universalSearch(searchQuery.value);
  } catch (error) {
    toast.error("Error during search.");
  } finally {
    isLoading.value = false;
  }
};

const deleteItem = async (item) => {
  if (!confirm(`WARNING: Are you sure you want to delete this ${item.type}?`)) return;
  
  try {
    if (item.type === 'Response') await api.responses.delete(item._id);
    else if (item.type === 'Ticket') await api.tickets.delete(item._id);
    else await api.users.delete(item._id);
    
    toast.success(`${item.type} deleted successfully!`);
    performSearch(); 
  } catch (error) {
    toast.error("Delete failed!");
  }
};

const getBadgeClass = (type) => {
  if (type === 'Response') return 'bg-emerald-50 border-emerald-200 text-emerald-600';
  if (type === 'Ticket') return 'bg-blue-50 border-blue-200 text-blue-600';
  return 'bg-primary-50 border-primary-200 text-primary'; // User
};
</script>