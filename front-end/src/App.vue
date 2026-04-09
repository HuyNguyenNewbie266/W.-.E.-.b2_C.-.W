<template>
  <div class="relative flex min-h-screen w-full flex-col overflow-x-hidden">
    
    <header class="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-background-dark/80">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        
        <div class="flex items-center gap-2">
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <span class="material-symbols-outlined text-2xl">bolt</span>
          </div>
          <span class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">QuickFix</span>
        </div>

        <nav class="hidden flex-1 justify-center gap-10 md:flex">
          <router-link to="/" class="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Home</router-link>
          <router-link to="/responses" class="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">Knowledge Base</router-link>
          <router-link to="/my-tickets" class="text-sm font-semibold text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-primary transition-colors">My Tickets</router-link>
        </nav>

        <div class="flex items-center gap-4">
          <router-link to="/tickets/new" class="hidden sm:flex min-w-[120px] items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95">
            Submit Request
          </router-link>
          <!-- <div class="h-10 w-10 rounded-full border-2 border-slate-200 bg-cover bg-center" style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYmigNQaIZTxD1rFLAqRLsnXApkjH_1glcEhYqrKrXPWZDtNrWYD2FE_33mUioYnk4Db9UzjnNNoYgyQZZG0UycIH_f7MvM0v7oIATMaD8qYCekUd891O0E2BSSiS1iNB9RJMeHz8O8vaESVM_BcH_-1H7aF7F1c3cpgnLXX7X9COK8d7EMJmXxxdynjxlWH4-g7_XrbDskrF5WvPjMJdPm6CjYkSgNXNEToQqvffWOisZMiLw313xz3GvATDDMn06w7iPTHr77Q')"></div> -->
        </div>

      </div>
    </header>

    <main class="flex-1 w-full mx-auto max-w-7xl px-6 py-10 lg:px-10">
      <router-view />
    </main>

    <footer class="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-background-dark">
      <div class="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-4">
          
          <div class="lg:col-span-1">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white">
                <span class="material-symbols-outlined text-lg">bolt</span>
              </div>
              <span class="text-lg font-bold text-slate-900 dark:text-white">QuickFix</span>
            </div>
            <p class="mt-4 text-sm text-slate-500 leading-relaxed">
              Empowering teams with instant solutions and intelligent support tools since 2021.
            </p>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Contact Support</h4>
            <ul class="mt-4 space-y-3">
              <li class="flex items-center gap-2 text-sm text-slate-500">
                <span class="material-symbols-outlined text-base">mail</span> support@quickfix.io
              </li>
              <li class="flex items-center gap-2 text-sm text-slate-500">
                <span class="material-symbols-outlined text-base">call</span> +1 (888) QFIX-NOW
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Socials</h4>
            <div class="mt-4 flex gap-4">
              <span class="text-sm text-slate-500">Facebook | Twitter | LinkedIn</span>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Status</h4>
            <div class="mt-4 flex items-center gap-2">
              <span class="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <span class="text-sm font-medium text-slate-600 dark:text-slate-400">All Systems Operational</span>
            </div>
          </div>

        </div>
        
        <div class="mt-12 border-t border-slate-100 pt-8 dark:border-slate-800">
          <p class="text-center text-xs text-slate-400">
            © 2026 QuickFix Inc. All rights reserved. Built with precision for your productivity.
          </p>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
// Layout chính không cần logic xử lý phức tạp
</script>