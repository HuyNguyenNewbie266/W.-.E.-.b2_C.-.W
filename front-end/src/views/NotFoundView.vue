<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white">
    <h1 class="text-9xl font-extrabold text-primary mb-4">404</h1>
    <h2 class="text-3xl font-bold mb-6">Page Not Found</h2>
    <p class="text-slate-500 mb-8 max-w-md text-center">
      Sorry, the page you are looking for does not exist or has been moved.
    </p>
    <router-link 
      to="/home" 
      class="px-6 py-3 bg-primary text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 transition-colors"
    >
      Go Back Home
    </router-link>
  </div>
</template>