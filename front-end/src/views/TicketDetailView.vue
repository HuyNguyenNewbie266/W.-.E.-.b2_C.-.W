<template>
  <div class="ticket-detail-view max-w-7xl mx-auto w-full p-6 lg:p-8 pt-8">
    
    <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <router-link to="/tickets" class="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium mb-2 w-fit cursor-pointer">
          <span class="material-symbols-outlined text-sm">arrow_back</span>
          <span class="uppercase tracking-widest text-[10px]">Back to Ticket List</span>
        </router-link>
        <h1 class="text-[1.875rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {{ ticket.title }}
        </h1>
        <p class="text-slate-500 dark:text-slate-400 mt-1">
          Ticket #{{ ticket.id }} • Created {{ ticket.createdAt }}
        </p>
      </div>
      
      <div class="flex gap-3">
        <button class="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all text-sm flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">close</span>
          Close Ticket
        </button>
        <button class="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-blue-700 shadow-sm transition-all text-sm flex items-center gap-2">
          <span class="material-symbols-outlined text-lg">reply</span>
          Post Comment
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <div class="lg:col-span-8 space-y-8">
        
        <div class="glass rounded-xl p-6 dark:bg-slate-800/40">
          <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100 dark:border-slate-700">
            <img :src="ticket.author.avatar" alt="User Avatar" class="w-10 h-10 rounded-full shadow-md" />
            <div>
              <p class="text-slate-900 dark:text-white font-bold">{{ ticket.author.name }}</p>
              <p class="text-xs text-slate-500">Reported via {{ ticket.author.source }}</p>
            </div>
          </div>
          
          <div class="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed" v-html="ticket.description"></div>
          
          <div class="mt-6 flex items-center gap-2">
            <button class="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 dark:bg-slate-700/50 hover:bg-slate-200/50 dark:hover:bg-slate-600/50 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors">
              <span class="material-symbols-outlined text-base">attach_file</span>
              {{ ticket.attachment }}
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">Activity Feed</h3>
          
          <div v-for="(activity, index) in activities" :key="index">
            
            <div v-if="activity.type === 'reply'" class="relative pl-8 pb-8 border-l-2 border-slate-200/60 dark:border-slate-700 ml-4">
              <div class="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-primary flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div class="glass rounded-xl p-5 dark:bg-slate-800/40">
                <div class="flex justify-between items-start mb-3">
                  <div class="flex items-center gap-3">
                    <img :src="activity.avatar" alt="Avatar" class="w-8 h-8 rounded-full shadow-sm" />
                    <span class="text-slate-900 dark:text-white font-bold text-sm">
                      {{ activity.author }} <span class="text-slate-400 font-normal ml-1">responded</span>
                    </span>
                  </div>
                  <span class="text-xs text-slate-400">{{ activity.time }}</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {{ activity.content }}
                </p>
              </div>
            </div>

            <div v-else-if="activity.type === 'internal_note'" class="relative pl-8 pb-8 border-l-2 border-slate-200/60 dark:border-slate-700 ml-4">
              <div class="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-amber-500 flex items-center justify-center">
                <span class="material-symbols-outlined text-[12px] text-amber-500">lock</span>
              </div>
              <div class="bg-amber-50/50 dark:bg-amber-900/20 rounded-xl border border-amber-200/50 dark:border-amber-700/30 p-5">
                <div class="flex justify-between items-start mb-2">
                  <span class="text-amber-700 dark:text-amber-400 text-[10px] font-bold uppercase tracking-widest bg-amber-100 dark:bg-amber-900/50 px-2 py-0.5 rounded">Internal Note</span>
                  <span class="text-xs text-slate-400">{{ activity.time }}</span>
                </div>
                <p class="text-slate-600 dark:text-slate-300 text-sm italic">
                  {{ activity.content }}
                </p>
              </div>
            </div>

          </div>

          <div class="glass rounded-xl p-4 mt-6 dark:bg-slate-800/40">
            <textarea 
              v-model="newComment"
              class="w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-sm focus:ring-primary focus:border-primary min-h-[100px] p-3 placeholder:text-slate-400 border transition-colors" 
              placeholder="Type your update here..."
            ></textarea>
            <div class="flex flex-wrap justify-between items-center mt-3 gap-3">
              <div class="flex gap-1">
                <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><span class="material-symbols-outlined">format_bold</span></button>
                <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><span class="material-symbols-outlined">format_italic</span></button>
                <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><span class="material-symbols-outlined">link</span></button>
                <button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><span class="material-symbols-outlined">add_photo_alternate</span></button>
              </div>
              <div class="flex gap-3">
                <button class="px-4 py-2 text-slate-500 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">Attach File</button>
                <button class="px-4 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-all text-sm">Post Update</button>
              </div>
            </div>
          </div>

        </div>
      </div>

      <aside class="lg:col-span-4 space-y-6 sticky top-8">
        
        <div class="glass rounded-xl divide-y divide-slate-100 dark:divide-slate-700 dark:bg-slate-800/40">
          <div class="p-6">
            <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Ticket Properties</h3>
            <div class="space-y-6">
              
              <div class="flex justify-between items-center">
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</span>
                <div class="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 rounded-full text-xs font-bold ring-1 ring-blue-100 dark:ring-blue-500/20">
                  <div class="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400"></div>
                  {{ ticket.status }}
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Priority</span>
                <div class="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 rounded-full text-xs font-bold ring-1 ring-red-100 dark:ring-red-500/20">
                  <span class="material-symbols-outlined text-[14px]">priority_high</span>
                  {{ ticket.priority }}
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</span>
                <span class="text-slate-900 dark:text-white font-bold text-sm">{{ ticket.category }}</span>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Assigned To</span>
                <div class="flex items-center gap-2">
                  <img :src="ticket.assignedTo.avatar" alt="Assignee" class="w-6 h-6 rounded-full" />
                  <span class="text-slate-900 dark:text-white font-bold text-sm">{{ ticket.assignedTo.name }}</span>
                </div>
              </div>
              
              <div class="flex justify-between items-center">
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Updated</span>
                <span class="text-slate-900 dark:text-white font-bold text-sm">{{ ticket.lastUpdated }}</span>
              </div>
              
            </div>
          </div>
          
          <div class="p-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-b-xl">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xs font-bold uppercase tracking-widest text-slate-400">SLA Response</h3>
              <span class="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10 px-2 py-0.5 rounded">
                {{ ticket.sla.status }}
              </span>
            </div>
            <div class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div class="h-full bg-primary rounded-full" :style="{ width: ticket.sla.progress + '%' }"></div>
            </div>
            <p class="text-[11px] text-slate-500 mt-2">{{ ticket.sla.timeRemaining }}</p>
          </div>
        </div>

        <div class="glass rounded-xl p-6 dark:bg-slate-800/40">
          <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Suggested Articles</h3>
          <ul class="space-y-4">
            <li v-for="(article, index) in suggestedArticles" :key="index">
              <a href="#" class="group block">
                <p class="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                  {{ article.title }}
                </p>
                <p class="text-xs text-slate-500 mt-1">Updated {{ article.updatedAt }}</p>
              </a>
            </li>
          </ul>
        </div>
        
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Biến lưu comment mới
const newComment = ref('');

// Dữ liệu Ticket (Mô phỏng API)
const ticket = ref({
  id: 'TK-8821',
  title: 'Unable to access VPN server',
  createdAt: 'Oct 24, 2023',
  status: 'Open',
  priority: 'High',
  category: 'Technical',
  lastUpdated: '2 hours ago',
  author: {
    name: 'Alex Thompson',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq6oqHONd_d-7EGHJODvk2C5Bqz1CEPagxyWdwJBczoM2lWlyoS0Rby-1aeFh7ir7yGvKBsQ2aCcOhx5Qrkbjm7fh9nV1oTg7AvJ1mB_QXT_Au0XEpb2kqTJCGA0k4HLPIGMEnl-Vlic9BxW02N356DJC3JXP2pzkesLIa0uDBqyjVrI2_8H1spuXoJXL6k8VzmKzkhYXkRwQfhPt5vQ8G1BAafZDR98gfvpaM5OXPNAJNWQCHLyJ3rxpuwgdWBqw7PSw0A2tzVg',
    source: 'Web Portal'
  },
  assignedTo: {
    name: 'Sarah Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQfOmpbHrMmfscBdJKbRAxKn-UxSfoIg-CB1t6WBFRe5GpKm7iQXgBFWidX3m89rxSH8-vmYT3Qk_vqHA0bMKxu59x-feqwp51ZiqXbRuJw6Uq1PwKgKHCNWCp_a0YUipJhKSVATux6dyFLd2rSACYDP8iCr9k56eDckRXjeZplqU7FBI0AxKGQGeF_9xRagXu1ADQ7RKnyK_aVY9q60HvqX5Nqwbg9QkKwrs6Timv8p___NW2Fj8-Q5xXleBx0gL4LCyqQh93Tw'
  },
  description: `
    <p>Hello Support Team,</p>
    <p class="mt-2">I've been trying to connect to the <strong>US-East VPN Node</strong> since 8:00 AM EST this morning but keep receiving a "Timed Out" error. I have checked my internet connection and it seems stable on other sites. I have also tried restarting the VPN client twice with no success.</p>
    <p class="mt-2">Error Code: <code class="bg-slate-100 dark:bg-slate-700 px-1 py-0.5 rounded text-sm">ERR_CONN_TIMEOUT_NODE_4</code></p>
    <p class="mt-2">Could you please look into this? I need access to the internal staging servers for today's deployment.</p>
  `,
  attachment: 'vpn_error_log.txt',
  sla: {
    status: 'On Track',
    progress: 75,
    timeRemaining: 'Due in 4 hours, 22 minutes'
  }
});

// Dữ liệu luồng hoạt động
const activities = ref([
  {
    type: 'reply',
    author: 'Sarah Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkouPdeNqrlqbROwL8mij3XkGsWFmxqQjPfzpecZYvzmKzr2H7icnwvAX1gdQn80uLvabr0700DL74BsbBZlGHmL1j2Qa24mSxXabRpbpiZH75W4_qLBh5Db29nrKfznaIzTNobvr1xY3EAUG7OXp5BVTqmm0vpz93WMKuQd72e7Ps002PaYH0W-3tXCpTWwiMeZrt4yz4wov19VwKaF2MjPRrB2JjKL5HmVrbpzkkWr-P_SjD4EWXWntwxTSLKf-C8WZg4936xw',
    time: '1 hour ago',
    content: "Hi Alex, I'm currently looking into the US-East node status. There was a brief maintenance window scheduled, but it might have overrun. I'm checking with the infra team now."
  },
  {
    type: 'internal_note',
    time: '45 mins ago',
    content: "Escalating to Infrastructure Team. Node 4 health checks are failing 30% of packets."
  }
]);

// Dữ liệu bài viết liên quan
const suggestedArticles = ref([
  {
    title: 'Troubleshooting VPN Node Failures',
    updatedAt: '2 days ago'
  },
  {
    title: 'Setting up Multi-Factor Authentication',
    updatedAt: '1 week ago'
  }
]);
</script>

<style scoped>
/* Không cần định nghĩa thêm vì .glass đã có sẵn ở global CSS của bạn */
</style>