<template>
  <div class="home-view">
    <section class="hero-gradient relative overflow-hidden px-6 py-20 lg:px-10 lg:py-32">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          
          <div class="z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h1 class="text-5xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white lg:text-[60px]">
              Having trouble? <span class="text-primary">QuickFix</span> solves it instantly.
            </h1>
            <p class="mt-6 text-lg font-medium text-slate-600 dark:text-slate-400 lg:text-xl">
              Submit a support request or find a solution in seconds. Our AI-powered desk is ready to assist.
            </p>
            
            <div class="mt-10 flex w-full max-w-lg flex-col gap-4 sm:flex-row">
              <router-link to="/tickets/new" class="flex h-14 flex-1 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-white shadow-xl shadow-primary/30 transition-all hover:translate-y-[-2px] hover:shadow-primary/40">
                Submit Ticket
              </router-link>
              
              <router-link to="/responses" class="flex h-14 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white/50 px-8 text-base font-bold text-slate-900 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/50 dark:text-white">
                Find Solution
              </router-link>
            </div>
            
            <div class="mt-12 w-full max-w-2xl">
              <div class="relative flex items-center group">
                <span class="material-symbols-outlined absolute left-4 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                <input v-model="searchQuery" class="h-16 w-full rounded-2xl border-slate-200 bg-white/80 pl-12 pr-6 text-lg shadow-sm backdrop-blur-md focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all dark:border-slate-700 dark:bg-slate-900/80" placeholder="What do you need help with?" type="text"/>
              </div>
            </div>
          </div>

          <div class="relative hidden lg:block">
            <div class="glass absolute -left-10 top-20 z-20 flex items-center gap-4 rounded-2xl p-4 shadow-2xl animate-bounce duration-[3000ms]">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                <span class="material-symbols-outlined">check_circle</span>
              </div>
              <div>
                <p class="text-sm font-bold">Issue Resolved</p>
                <p class="text-xs text-slate-500">Fixed in 2 minutes</p>
              </div>
            </div>
            <div class="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-[2rem] bg-gradient-to-tr from-primary to-blue-400 p-1 shadow-2xl">
              <div class="h-full w-full rounded-[1.9rem] bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlbkMTzk_G3dKDZuGUyV2ej5ZvF2FN97HpKYmFCRCXgjG1E2VXj-PtbAnEz9CrbOeoAgm7tCRtpTMCTJHr0NSXQU2WId2I0SFaXJwrwHea-CBYcBeCHGJkO89j-Gmdok8mE9Vbx3Y_GczA3EdowRvcQH1FQYeA-1LEvLRV9UXK1kp_hQXCKgc0kcNG5-NOgb6hhDLHIkJWVh4MCWSLJuyMqz8pZZddMO2AotNKWA9-LRYXFCLYIm3NIn-DdkD2WerTxPAq5P2jKw')"></div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <h2 class="mb-10 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Quick Actions</h2>
      <div class="grid gap-6 sm:grid-cols-3">
        
        <router-link to="/tickets/new" class="glass flex flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center transition-all hover:scale-[1.02] hover:bg-white dark:bg-slate-800/40 text-slate-900">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-4xl">edit_note</span>
          </div>
          <h3 class="text-xl font-bold">Submit Request</h3>
          <p class="text-sm text-slate-500">Need direct help? Open a new ticket.</p>
        </router-link>

        <router-link to="/tickets" class="glass flex flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center transition-all hover:scale-[1.02] hover:bg-white dark:bg-slate-800/40 text-slate-900">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-4xl">confirmation_number</span>
          </div>
          <h3 class="text-xl font-bold">Check Ticket</h3>
          <p class="text-sm text-slate-500">Track status of your existing requests.</p>
        </router-link>

        <div class="glass flex flex-col items-center justify-center gap-4 rounded-2xl p-10 text-center transition-all hover:scale-[1.02] hover:bg-white dark:bg-slate-800/40 cursor-pointer">
          <div class="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <span class="material-symbols-outlined text-4xl">chat</span>
          </div>
          <h3 class="text-xl font-bold">Live Chat</h3>
          <p class="text-sm text-slate-500">Speak with an agent right now.</p>
        </div>

      </div>
    </section>

    <section class="bg-slate-50 dark:bg-slate-900/50">
      <div class="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div class="flex items-center justify-between mb-10">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Knowledge Base</h2>
          <router-link to="/responses" class="text-sm font-bold text-primary hover:underline">View all categories</router-link>
        </div>
        
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div class="group relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:bg-slate-800">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">person</span>
            </div>
            <h3 class="text-lg font-bold leading-tight">Account Management</h3>
            <p class="text-sm text-slate-500">Security settings, profiles, and permissions.</p>
            <div class="absolute inset-0 rounded-2xl border-2 border-transparent transition-all group-hover:border-primary/20"></div>
          </div>
          
          <div class="group relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:bg-slate-800">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">payments</span>
            </div>
            <h3 class="text-lg font-bold leading-tight">Billing & Subscriptions</h3>
            <p class="text-sm text-slate-500">Invoices, payment methods, and plans.</p>
            <div class="absolute inset-0 rounded-2xl border-2 border-transparent transition-all group-hover:border-primary/20"></div>
          </div>
          
          <div class="group relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:bg-slate-800">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">settings</span>
            </div>
            <h3 class="text-lg font-bold leading-tight">Technical Support</h3>
            <p class="text-sm text-slate-500">Software issues, bug reports, and tools.</p>
            <div class="absolute inset-0 rounded-2xl border-2 border-transparent transition-all group-hover:border-primary/20"></div>
          </div>
          
          <div class="group relative flex flex-col gap-4 rounded-2xl bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 dark:bg-slate-800">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">api</span>
            </div>
            <h3 class="text-lg font-bold leading-tight">API Documentation</h3>
            <p class="text-sm text-slate-500">Developer guides, webhooks, and endpoints.</p>
            <div class="absolute inset-0 rounded-2xl border-2 border-transparent transition-all group-hover:border-primary/20"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Recent Issues</h2>
          <p class="text-sm text-slate-500">Common challenges solved by the community today.</p>
        </div>
      </div>
      
      <div class="grid gap-4">
        <div class="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary/30 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900/50">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
              <span class="material-symbols-outlined">error</span>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white">Database sync failure on production</h4>
              <p class="text-xs text-slate-500">Updated 2 hours ago • Technical</p>
            </div>
          </div>
          <button class="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 transition-all active:scale-95">
            View details <span class="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>

        <div class="flex flex-col items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors hover:border-primary/30 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900/50">
          <div class="flex items-center gap-4">
            <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800">
              <span class="material-symbols-outlined">credit_card_off</span>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white">Payment gateway timeout errors</h4>
              <p class="text-xs text-slate-500">Updated 5 hours ago • Billing</p>
            </div>
          </div>
          <button class="flex items-center gap-2 rounded-lg bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 transition-all active:scale-95">
            View details <span class="material-symbols-outlined text-lg">chevron_right</span>
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref } from 'vue';

// Biến lưu trữ giá trị từ thanh tìm kiếm
const searchQuery = ref('');

</script>

<style scoped>
/* Các class hero-gradient và glass đã được định nghĩa ở tailwind.css global nên ở đây không cần khai báo lại */
</style>