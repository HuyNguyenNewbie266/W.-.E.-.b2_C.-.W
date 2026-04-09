<template>
  <div class="search-results-view max-w-4xl mx-auto w-full p-6 lg:p-8">
    
    <div class="mb-10">
      <div class="flex items-center gap-2 text-slate-500 text-xs uppercase tracking-wider font-bold mb-2">
        <span class="material-symbols-outlined text-sm">manage_search</span>
        Knowledge Base Search
      </div>
      <h1 class="text-[1.875rem] font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
        Search results for: <span class="text-primary">{{ searchQuery }}</span>
      </h1>
      
      <div class="relative max-w-2xl">
        <span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input 
          v-model="searchQuery"
          class="w-full pl-12 pr-4 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm text-slate-900 dark:text-white" 
          type="text" 
          placeholder="What are you looking for?"
        />
        <button class="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
          Refine
        </button>
      </div>
    </div>

    <div class="space-y-4">
      <div 
        v-for="result in searchResults" 
        :key="result.id"
        class="glass p-6 rounded-xl hover:shadow-md transition-all group cursor-pointer dark:bg-slate-800/40"
      >
        <div class="flex justify-between items-start mb-3">
          <div class="flex flex-col">
            <h2 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              {{ result.title }}
            </h2>
            <div class="flex items-center gap-3 mt-1">
              <span 
                :class="[
                  'flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase rounded border',
                  result.theme === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20' : '',
                  result.theme === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:border-blue-500/20' : '',
                  result.theme === 'amber' ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:border-amber-500/20' : ''
                ]"
              >
                <span 
                  :class="[
                    'w-1.5 h-1.5 rounded-full',
                    result.theme === 'emerald' ? 'bg-emerald-500' : '',
                    result.theme === 'blue' ? 'bg-blue-500' : '',
                    result.theme === 'amber' ? 'bg-amber-500' : ''
                  ]"
                ></span> 
                {{ result.category }}
              </span>
              <span class="text-[11px] text-slate-400 font-medium">Last updated: {{ result.date }}</span>
            </div>
          </div>
          <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">arrow_forward</span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-3xl">
          {{ result.excerpt }}
        </p>
      </div>
    </div>

    <div class="mt-8 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-6">
      <div class="text-xs text-slate-500 font-medium">
        Showing <span class="text-slate-900 dark:text-white">1-4</span> of <span class="text-slate-900 dark:text-white">24</span> results
      </div>
      <div class="flex gap-2">
        <button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-30 dark:text-slate-300" disabled>
          <span class="material-symbols-outlined text-lg">chevron_left</span>
        </button>
        <button class="px-3.5 py-2 bg-primary text-white text-xs font-bold rounded-lg shadow-sm">1</button>
        <button class="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:border-slate-300 transition-colors shadow-sm">2</button>
        <button class="px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:border-slate-300 transition-colors shadow-sm">3</button>
        <button class="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors dark:text-slate-300">
          <span class="material-symbols-outlined text-lg">chevron_right</span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('VPN connection issues');

const searchResults = ref([
  {
    id: 1,
    title: 'Troubleshooting VPN Connectivity on Windows 11',
    category: 'Technical',
    theme: 'emerald',
    date: 'Oct 24, 2023',
    excerpt: 'If you\'re experiencing intermittent disconnects while using QuickFix VPN, check your firewall settings and ensure the latest TAP drivers are installed. This guide covers common error codes like 807 and 691...'
  },
  {
    id: 2,
    title: 'Configuring MFA for VPN Access',
    category: 'Setup',
    theme: 'blue',
    date: 'Nov 12, 2023',
    excerpt: 'Enhanced security requires Multi-Factor Authentication. Learn how to pair your mobile device with the QuickFix VPN client to resolve "Authentication Failed" connection issues...'
  },
  {
    id: 3,
    title: 'VPN API Error Codes Reference',
    category: 'API Reference',
    theme: 'amber',
    date: 'Sep 30, 2023',
    excerpt: 'Comprehensive list of programmatic error responses from the VPN gateway. Includes descriptions for timeout errors, credential rejection, and endpoint unavailability...'
  },
  {
    id: 4,
    title: 'macOS Monterey VPN Client Patch',
    category: 'Technical',
    theme: 'emerald',
    date: 'Dec 05, 2023',
    excerpt: 'Resolves a known issue where the VPN connection drops after system sleep on macOS 12.0 and above. Requires administrative privileges for installation...'
  }
]);
</script>

<style scoped>
/* Glass class được kế thừa từ @layer utilities trong tailwind.css của bạn */
</style>