<template>
  <div class="bg-slate-50 text-slate-900 font-display min-h-screen dark:bg-slate-900 dark:text-white">
    
   

    <div class="pt-16 flex min-h-screen">
    

      <main class="flex-1 px-4 lg:px-12 py-8 bg-slate-50 dark:bg-slate-900">
        <div class="max-w-5xl mx-auto">
          
          <nav class="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500 mb-6 dark:text-slate-400">
            <a href="#" class="hover:text-primary transition-colors">Knowledge Base</a>
            <span class="material-symbols-outlined text-[12px]">chevron_right</span>
            <a href="#" class="hover:text-primary transition-colors">Security & Access</a>
            <span class="material-symbols-outlined text-[12px]">chevron_right</span>
            <span class="text-slate-900 dark:text-slate-200">VPN Configuration</span>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <div class="lg:col-span-8 space-y-6">
              <header class="mb-8">
                <h1 class="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                  How to configure your VPN for Remote Work
                </h1>
                <div class="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div class="flex items-center gap-2">
                    <img class="w-6 h-6 rounded-full" alt="Author" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbRBK90mKAzNR4cynWqtaRBCYssbiHV9ceCDTaUmZZGkB5SKeewuuOuYx98VtZi5on3MsAHJcTxPh7V1LhpXbJjMSNI7Z6zFMg8rNBBfLsO_8SsFMBhWrSv9NI_f8Dnn8X0EvFcLMJd3ETDk_4V5JtA0NfKyqg0B_2pNQ7dm7SzXprkIdlgBS0GwaPdplcnc7mnh0Xl974AFx_WblYXJmShdZZIwBt1c0Abrfe_bzePWRCGSuTbb8k_fElDMJH8hVG4szGbwvm5w" />
                    <span class="font-medium text-slate-700 dark:text-slate-300">Written by David Chen</span>
                  </div>
                  <span>•</span>
                  <span>Updated 2 days ago</span>
                  <span>•</span>
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">schedule</span> 5 min read
                  </span>
                </div>
              </header>

              <article class="glass rounded-xl p-8 lg:p-10 shadow-sm border border-white/30 dark:border-slate-700/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 leading-relaxed space-y-6">
                <p class="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  Our Enterprise VPN provides a secure, encrypted tunnel for your device to access corporate resources from anywhere in the world. Follow this guide to get set up in minutes.
                </p>
                
                <div class="relative w-full h-64 rounded-xl overflow-hidden mb-8">
                  <img class="w-full h-full object-cover" alt="Server room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXCr0oj3eJ2TVVGtOpdpNnN_xJ2ZNg9DDYV6MxnL5YUGf_jFHU__AXYPSQyk3I5Zy3OGzIiL-lsUn1XcMecC3tANFq_ZLEekOVTJR14Zr5kAadky3I8uj9z5cCSFs848p1xurbtYzmucmLb_jm-wLmmE293oI96ii3jnqHh-SFL9PlenwPuJHuOWEFw_fCdQBLGOkAJ8EhxNMgjOGYc41n7fm-V4FeS2mJKmzrEhGQAmbNfhIgdh5R84lTba6uo1jP5C6R2SjQBQ" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>

                <h2 id="prerequisites" class="text-2xl font-bold text-slate-900 dark:text-white pt-4">1. Prerequisites</h2>
                <p>Before beginning the installation, ensure you have the following credentials and software ready:</p>
                <ul class="space-y-3 list-none pl-2">
                  <li class="flex items-start gap-3">
                    <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 mt-1" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Active Enterprise SSO credentials (Email & Password)</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 mt-1" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Authenticator App (Okta, Authy, or Google Authenticator)</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 mt-1" style="font-variation-settings: 'FILL' 1;">check_circle</span>
                    <span>Administrator privileges on your local machine</span>
                  </li>
                </ul>

                <h2 id="installation" class="text-2xl font-bold text-slate-900 dark:text-white pt-4">2. Installation Steps</h2>
                <p>Navigate to the QuickFix Download Center and select the client compatible with your Operating System (Windows, macOS, or Linux).</p>
                
                <div class="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 font-mono text-sm text-blue-600 dark:text-blue-400 flex justify-between items-center relative overflow-hidden">
                  <code class="overflow-x-auto whitespace-nowrap pr-8">{{ commandText }}</code>
                  <button 
                    @click="copyCommand" 
                    class="absolute right-2 p-1.5 rounded bg-white/80 dark:bg-slate-800 text-slate-400 hover:text-primary dark:hover:text-blue-400 transition-colors shadow-sm"
                    :title="copied ? 'Copied!' : 'Copy to clipboard'"
                  >
                    <span class="material-symbols-outlined text-lg">{{ copied ? 'check' : 'content_copy' }}</span>
                  </button>
                </div>

                <h2 id="configuration" class="text-2xl font-bold text-slate-900 dark:text-white pt-4">3. Configuration</h2>
                <p>Once the client is installed, open the application and enter the server address provided by your regional IT head. Commonly, this will follow the format <code>vpn.[region].quickfix.com</code>.</p>
                
                <div class="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-400 dark:border-amber-500 p-4 rounded-r-lg flex gap-4">
                  <span class="material-symbols-outlined text-amber-600 dark:text-amber-500">warning</span>
                  <div>
                    <p class="text-sm font-bold text-amber-900 dark:text-amber-200">Security Note</p>
                    <p class="text-sm text-amber-800 dark:text-amber-300/80">Never share your VPN profile or certificates with anyone outside of the organization.</p>
                  </div>
                </div>

                <h2 id="troubleshooting" class="text-2xl font-bold text-slate-900 dark:text-white pt-4">4. Troubleshooting</h2>
                <p>If you encounter a "Handshake Failed" error, please verify your system clock is synchronized and that your ISP is not blocking port 443.</p>
              </article>

              <section class="glass rounded-xl p-8 border border-white/30 dark:border-slate-700/50 dark:bg-slate-800/40 text-center space-y-4 transition-all">
                <template v-if="!feedbackStatus">
                  <h3 class="text-lg font-bold text-slate-900 dark:text-white">Was this article helpful?</h3>
                  <div class="flex flex-wrap justify-center gap-4">
                    <button @click="submitFeedback('yes')" class="flex items-center gap-2 px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:border-emerald-200 dark:hover:border-emerald-500/30 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all font-semibold">
                      <span class="material-symbols-outlined">thumb_up</span> Yes
                    </button>
                    <button @click="submitFeedback('no')" class="flex items-center gap-2 px-6 py-2 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 dark:hover:border-red-500/30 hover:text-red-700 dark:hover:text-red-400 transition-all font-semibold">
                      <span class="material-symbols-outlined">thumb_down</span> No
                    </button>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400">1,248 people found this helpful</p>
                </template>
                <template v-else>
                  <div class="flex flex-col items-center justify-center gap-2 py-4">
                    <span class="material-symbols-outlined text-4xl text-emerald-500 mb-2">check_circle</span>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white">Thank you for your feedback!</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Your input helps us improve our knowledge base.</p>
                  </div>
                </template>
              </section>

            </div>

            <aside class="lg:col-span-4 space-y-8 sticky top-24">
             

              <div class="space-y-4">
                <h4 class="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Related Articles</h4>
                <div class="space-y-3">
                  <a v-for="article in relatedArticles" :key="article.title" href="#" class="block glass p-4 rounded-lg hover:shadow-md transition-shadow group dark:bg-slate-800/40 dark:border-slate-700/50 border border-white/30">
                    <p class="text-xs font-bold text-primary dark:text-blue-400 mb-1">{{ article.category }}</p>
                    <h5 class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{{ article.title }}</h5>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">{{ article.description }}</p>
                  </a>
                </div>
              </div>

              <div class="bg-primary rounded-xl p-6 text-white shadow-lg overflow-hidden relative">
                <div class="relative z-10">
                  <h4 class="text-lg font-bold mb-2">Still need help?</h4>
                  <p class="text-sm opacity-90 mb-4 leading-snug">Our technical support team is available 24/7 for Enterprise customers.</p>
                  <button class="w-full bg-white text-primary py-2 rounded-lg font-bold text-sm hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
                    Contact Support
                  </button>
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
import { ref } from 'vue';

// Menu Sidebar state
const sideLinks = [
  { name: 'Home', icon: 'home', active: false },
  { name: 'Articles', icon: 'menu_book', active: true },
  { name: 'Categories', icon: 'category', active: false },
  { name: 'Saved', icon: 'bookmark', active: false },
  { name: 'History', icon: 'history', active: false }
];

// Mục lục bài viết (TOC)
const tableOfContents = [
  { id: '#prerequisites', title: '1. Prerequisites', active: true },
  { id: '#installation', title: '2. Installation Steps', active: false },
  { id: '#configuration', title: '3. Configuration', active: false },
  { id: '#troubleshooting', title: '4. Troubleshooting', active: false }
];

// Bài viết liên quan
const relatedArticles = [
  { category: 'Security', title: 'Setting up Two-Factor Authentication', description: 'Learn how to protect your account with Okta SSO.' },
  { category: 'Connectivity', title: 'Troubleshooting Network Latency', description: 'Optimizing your remote connection speeds.' },
  { category: 'Tools', title: 'Accessing the Internal File Share', description: 'How to map network drives on your corporate laptop.' }
];

// Logic Copy to Clipboard
const commandText = "curl -sSL https://get.quickfix.com/vpn-install.sh | sudo bash";
const copied = ref(false);

const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(commandText);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000); // Reset icon sau 2s
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// Logic form feedback
const feedbackStatus = ref(null);

const submitFeedback = (type) => {
  // Thực tế ở đây sẽ call API gửi feedback (type: 'yes' | 'no')
  feedbackStatus.value = type;
};
</script>

<style scoped>
/* Có thể dùng CSS mượt mà cuộn cho anchor links ở đây */
html {
  scroll-behavior: smooth;
}
</style>