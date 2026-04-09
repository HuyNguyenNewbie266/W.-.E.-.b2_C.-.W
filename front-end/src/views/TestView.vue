<template>
  <div class="bg-slate-50 text-slate-900 font-display antialiased min-h-screen relative dark:bg-slate-900 dark:text-white">
    

   

    <main class="ml-64 pt-16 min-h-screen">
      <div class="max-w-6xl mx-auto p-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 class="text-[1.875rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-2">Staff Portal: Article Validation</h1>
            <p class="text-slate-500 font-medium uppercase text-[0.75rem] tracking-wider dark:text-slate-400">Matching Engine • Batch #4209</p>
          </div>
          
          <div class="glass p-5 rounded-xl border border-white/30 dark:border-slate-700/50 shadow-sm w-full md:w-80 dark:bg-slate-800/40">
            <div class="flex justify-between items-center mb-2">
              <span class="text-[0.875rem] font-semibold text-slate-700 dark:text-slate-300">{{ matchedCount }}/{{ articles.length }} Matched</span>
              <span class="text-[0.75rem] font-bold text-primary">{{ progressPercentage }}% Complete</span>
            </div>
            <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                class="bg-primary h-full transition-all duration-500 ease-out" 
                :style="{ width: progressPercentage + '%', boxShadow: '0 0 12px rgba(37, 99, 235, 0.3)' }"
              ></div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-4 space-y-4">
            <h2 class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-[0.1em] px-2 mb-4">Article Subjects</h2>
            
            <div 
              v-for="subject in availableSubjects" 
              :key="subject.id"
              draggable="true"
              @dragstart="startDrag($event, subject)"
              class="glass group cursor-grab active:cursor-grabbing p-4 rounded-lg border border-white/30 dark:border-slate-700/50 shadow-sm transition-all hover:translate-x-1 hover:shadow-md border-l-4 border-l-slate-300 hover:border-l-primary dark:bg-slate-800/40"
            >
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors dark:text-slate-500">drag_indicator</span>
                <span class="text-[0.875rem] font-semibold text-slate-800 dark:text-slate-200">{{ subject.title }}</span>
              </div>
            </div>
            
            <div v-if="availableSubjects.length === 0" class="text-sm text-slate-500 italic p-4 text-center border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-700">
              All subjects allocated.
            </div>
          </div>

          <div class="lg:col-span-8 space-y-4">
            <h2 class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-[0.1em] px-2 mb-4">Content Drop Zones</h2>
            
            <div 
              v-for="article in articles" 
              :key="article.id"
              @dragover.prevent
              @dragenter.prevent
              @drop="onDrop($event, article)"
            >
              
              <div v-if="article.status === 'matched'" class="glass rounded-lg border border-emerald-200/50 shadow-sm overflow-hidden flex transition-all dark:bg-slate-800/40 dark:border-emerald-500/30">
                <div class="w-2 bg-emerald-500"></div>
                <div class="flex-1 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div class="flex-1">
                    <p class="text-[0.875rem] text-slate-600 dark:text-slate-300 italic line-clamp-2">"{{ article.content }}"</p>
                  </div>
                  <div class="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-100 dark:border-emerald-500/20 shrink-0">
                    <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm">check_circle</span>
                    <span class="text-[0.875rem] font-bold text-emerald-700 dark:text-emerald-400">{{ article.matchedSubject.title }}</span>
                    <button @click="removeMatch(article)" class="text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>
                </div>
              </div>

              <div v-else-if="article.status === 'flagged'" class="glass rounded-lg border border-amber-200/50 shadow-sm overflow-hidden flex transition-all dark:bg-slate-800/40 dark:border-amber-500/30">
                <div class="w-2 bg-amber-400"></div>
                <div class="flex-1 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div class="flex-1">
                    <p class="text-[0.875rem] text-slate-600 dark:text-slate-300 line-clamp-2">"{{ article.content }}"</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <button @click="unflagArticle(article)" class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-200 text-amber-700 dark:text-amber-400 dark:border-amber-500/30 text-[0.75rem] font-bold hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors">
                      <span class="material-symbols-outlined text-base">flag</span>
                      Flagged (Click to clear)
                    </button>
                    <div class="px-6 py-3 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg text-slate-400 flex items-center gap-2 text-[0.875rem] font-medium transition-colors hover:bg-white dark:hover:bg-slate-800 cursor-pointer">
                      Drop Subject
                    </div>
                  </div>
                </div>
              </div>

              <div v-else class="relative group">
                <div class="absolute inset-0 bg-primary/5 rounded-lg border-2 border-dashed border-primary/20 group-hover:border-primary/40 transition-all dark:border-slate-700 dark:group-hover:border-primary/50"></div>
                <div class="relative flex items-center justify-between gap-4 p-5">
                  <div class="flex-1">
                    <p class="text-[0.875rem] text-slate-600 dark:text-slate-300 line-clamp-2">"{{ article.content }}"</p>
                  </div>
                  <div class="shrink-0 flex items-center gap-2">
                    <button @click="flagArticle(article)" class="p-2 text-slate-400 hover:text-amber-500 transition-colors" title="Flag as Ambiguous">
                      <span class="material-symbols-outlined text-lg">flag</span>
                    </button>
                    <div class="px-6 py-3 border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg text-slate-400 flex items-center gap-2 text-[0.875rem] font-medium group-hover:bg-white dark:group-hover:bg-slate-800 transition-colors">
                      <span class="material-symbols-outlined text-lg">add_circle</span>
                      Drop Subject Here
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="mt-12 flex items-center justify-end gap-4 p-6 glass rounded-xl border border-white/40 shadow-md dark:bg-slate-800/40 dark:border-slate-700/50">
          <button class="px-6 py-2.5 rounded-lg text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-[0.875rem]">
            Save Progress
          </button>
          <button class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:opacity-95 transition-opacity text-[0.875rem] active:scale-95">
            Submit Validation
            <span class="material-symbols-outlined text-lg">send</span>
          </button>
        </div>

      </div>
    </main>

    <div class="fixed bottom-[-10rem] right-[-10rem] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    <div class="fixed top-[20%] left-[-5rem] w-[20rem] h-[20rem] bg-blue-400/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Menu Links
const navLinks = [
  { name: 'Current Batch', icon: 'assignment', active: true },
  { name: 'Historical Tests', icon: 'history', active: false },
  { name: 'Flagged Sets', icon: 'flag', active: false },
  { name: 'Validation Logic', icon: 'rule', active: false },
  { name: 'Archive', icon: 'inventory_2', active: false },
];

// Dữ liệu mẫu ban đầu
const initialSubjects = [
  { id: 'subj-1', title: 'VPN Setup' },
  { id: 'subj-2', title: 'Reset Password' },
  { id: 'subj-3', title: 'Email Sync' },
  { id: 'subj-4', title: '2FA Guide' },
  { id: 'subj-5', title: 'Billing FAQ' }
];

// Danh sách Subject chưa được match
const availableSubjects = ref([...initialSubjects]);

// Các Content Drop Zones
const articles = ref([
  {
    id: 'art-1',
    content: "To secure your account, navigate to settings and toggle the multifactor authentication switch. You will need a mobile app...",
    status: 'empty', 
    matchedSubject: null
  },
  {
    id: 'art-2',
    content: "Instructions for configuring the corporate Tunnel-Pro client on Windows 11 and MacOS Ventura devices to access internal servers...",
    status: 'empty', 
    matchedSubject: null
  },
  {
    id: 'art-3',
    content: "View your recent invoices, update credit card details, and manage recurring subscription tiers for your team accounts...",
    status: 'empty', 
    matchedSubject: null
  },
  {
    id: 'art-4',
    content: "If you cannot remember your credentials, enter your employee ID in the portal and follow the link sent to your work email address...",
    status: 'empty', 
    matchedSubject: null
  },
  {
    id: 'art-5',
    content: "Sync your Outlook or Gmail calendar with the corporate dashboard to see meeting schedules and availability in real-time...",
    status: 'empty', 
    matchedSubject: null
  }
]);

// Drag & Drop State
const draggedSubject = ref(null);

const startDrag = (event, subject) => {
  draggedSubject.value = subject;
  event.dataTransfer.effectAllowed = 'move';
};

const onDrop = (event, article) => {
  if (draggedSubject.value && article.status !== 'matched') {
    // Cập nhật trạng thái bài viết
    article.matchedSubject = draggedSubject.value;
    article.status = 'matched';
    
    // Loại bỏ khỏi danh sách available
    availableSubjects.value = availableSubjects.value.filter(s => s.id !== draggedSubject.value.id);
    draggedSubject.value = null;
  }
};

const removeMatch = (article) => {
  if (article.matchedSubject) {
    // Trả subject về danh sách bên trái
    availableSubjects.value.push(article.matchedSubject);
    
    // Xóa match
    article.matchedSubject = null;
    article.status = 'empty';
  }
};

// Flagging logic
const flagArticle = (article) => {
  article.status = 'flagged';
};

const unflagArticle = (article) => {
  article.status = 'empty';
};

// Computed Properties cho Progress Bar
const matchedCount = computed(() => {
  return articles.value.filter(a => a.status === 'matched').length;
});

const progressPercentage = computed(() => {
  return Math.round((matchedCount.value / articles.value.length) * 100);
});

</script>

<style scoped>
/* Không cần cấu hình style quá nhiều vì class glass đã nằm trong @layer utilities của bạn.
   Tuy nhiên có thể thêm css ẩn scrollbar nếu cần thiết */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.dark ::-webkit-scrollbar-thumb {
  background: #334155;
}
</style>