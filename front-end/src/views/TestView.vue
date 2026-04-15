<template>
  <div class="bg-slate-50 text-slate-900 font-display antialiased relative dark:bg-slate-900 dark:text-white">
   
    <main class="pt-16 max-h-screen flex justify-center">
      <div class="max-w-7xl w-full mx-auto p-4 sm:p-8">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h1 class="text-[1.875rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-none mb-2">Knowledge Test</h1>
            <p class="text-slate-500 font-medium uppercase text-[0.75rem] tracking-wider dark:text-slate-400">Training Mode</p>
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

        <div v-if="isLoading" class="py-20 text-center text-slate-500">
          <span class="material-symbols-outlined animate-spin text-4xl mb-2">autorenew</span>
          <p>Generating test scenarios...</p>
        </div>

        <div v-else-if="!isCompleted" class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div class="lg:col-span-5 space-y-4">
            <h2 class="text-[0.75rem] font-bold text-slate-400 uppercase tracking-[0.1em] px-2 mb-4">Article Subjects</h2>
            
            <div 
              v-for="subject in availableSubjects" 
              :key="subject.id"
              draggable="true"
              @dragstart="startDrag($event, subject)"
              class="glass group cursor-grab active:cursor-grabbing p-4 rounded-lg border border-white/30 dark:border-slate-700/50 shadow-sm transition-all hover:translate-x-1 hover:shadow-md border-l-4 border-l-slate-300 hover:border-l-primary dark:bg-slate-800/40"
            >
              <div class="flex items-start gap-3">
                <span class="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors dark:text-slate-500 mt-1">drag_indicator</span>
                <div class="flex-1 min-w-0">
                  <div class="mb-1.5">
                    <span class="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded">{{ subject.key }}</span>
                  </div>
                  <div class="text-[0.875rem] font-semibold text-slate-800 dark:text-slate-200 break-words leading-snug">
                    {{ subject.title }}
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="availableSubjects.length === 0" class="text-sm text-slate-500 italic p-4 text-center border-2 border-dashed border-slate-200 rounded-lg dark:border-slate-700">
              All subjects allocated.
            </div>
          </div>

          <div class="lg:col-span-7 space-y-4">
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
                <div class="flex-1 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div class="flex-1 min-w-0 w-full">
                    <p class="text-[0.875rem] text-slate-600 dark:text-slate-300 italic line-clamp-3">"{{ article.content }}"</p>
                  </div>
                  <div class="flex items-start sm:items-center gap-2.5 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2.5 rounded-lg border border-emerald-100 dark:border-emerald-500/20 shrink-0 w-full sm:w-auto sm:max-w-[45%]">
                    <span class="material-symbols-outlined text-emerald-600 dark:text-emerald-400 text-sm mt-0.5 sm:mt-0">check_circle</span>
                    <span class="text-[0.875rem] font-bold text-emerald-700 dark:text-emerald-400 break-words flex-1">{{ article.matchedSubject.title }}</span>
                  </div>
                </div>
              </div>

              <div v-else class="relative group" :class="{'shake-animation': article.isError}">
                <div class="absolute inset-0 rounded-lg border-2 border-dashed transition-all"
                     :class="article.isError ? 'bg-red-50 border-red-500 dark:bg-red-900/20 dark:border-red-500' : 'bg-primary/5 border-primary/20 group-hover:border-primary/40 dark:border-slate-700 dark:group-hover:border-primary/50'">
                </div>
                <div class="relative flex items-center justify-between gap-4 p-4 sm:p-5">
                  <div class="flex-1">
                    <p class="text-[0.875rem] text-slate-600 dark:text-slate-300 line-clamp-3">"{{ article.content }}"</p>
                  </div>
                  <div class="shrink-0 flex items-center gap-2">
                    <div class="px-4 sm:px-6 py-3 border-2 border-dashed rounded-lg flex items-center gap-2 text-[0.875rem] font-medium transition-colors"
                         :class="article.isError ? 'border-red-500 text-red-500 bg-white dark:bg-slate-800' : 'border-slate-200 dark:border-slate-600 text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-800'">
                      <span class="material-symbols-outlined text-lg">{{ article.isError ? 'error' : 'add_circle' }}</span>
                      <span class="hidden sm:inline">{{ article.isError ? 'Incorrect Match' : 'Drop Here' }}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div v-else class="glass p-12 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/20 text-center mt-4 shadow-sm animate-fade-in">
          <div class="w-24 h-24 mx-auto bg-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
            <span class="material-symbols-outlined text-5xl">workspace_premium</span>
          </div>
          <h2 class="text-4xl font-black text-emerald-700 dark:text-emerald-400 mb-4">Excellent Work!</h2>
          <p class="text-slate-600 dark:text-slate-300 mb-8 text-lg max-w-lg mx-auto">
            You successfully mapped all 5 responses correctly. Your knowledge base is sharp!
          </p>
          <button @click="loadNewTest" class="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md transition-colors inline-flex items-center gap-2">
            <span class="material-symbols-outlined">refresh</span>
            Generate New Test
          </button>
        </div>

      </div>
    </main>

    <div class="fixed bottom-[-10rem] right-[-10rem] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    <div class="fixed top-[20%] left-[-5rem] w-[20rem] h-[20rem] bg-blue-400/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../helpers/apiHelper'; 
import { useToast } from 'vue-toastification';

const toast = useToast();

const isLoading = ref(true);

const availableSubjects = ref([]);
const articles = ref([]);

const draggedSubject = ref(null);

const matchedCount = computed(() => {
  return articles.value.filter(a => a.status === 'matched').length;
});

const progressPercentage = computed(() => {
  if (articles.value.length === 0) return 0;
  return Math.round((matchedCount.value / articles.value.length) * 100);
});

const isCompleted = computed(() => {
  return articles.value.length > 0 && matchedCount.value === articles.value.length;
});

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const loadNewTest = async () => {
  isLoading.value = true;
  availableSubjects.value = [];
  articles.value = [];

  try {
    const data = await api.responses.getRandomTest();

    if(data.length < 5) {
      toast.warning("System needs at least 5 responses to generate a full test.");
    }

    availableSubjects.value = shuffle(data.map(item => ({
      id: item._id,
      key: item.key,
      title: item.title
    })));

    articles.value = shuffle(data.map(item => ({
      id: item._id,
      content: item.excerpt,
      status: 'empty', 
      matchedSubject: null,
      isError: false
    })));

  } catch (error) {
    console.error("Error loading test", error);
    toast.error('Failed to load test data.');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadNewTest();
});

const startDrag = (event, subject) => {
  draggedSubject.value = subject;
  event.dataTransfer.effectAllowed = 'move';
};

const onDrop = (event, article) => {
  if (!draggedSubject.value || article.status === 'matched') return;

  if (draggedSubject.value.id === article.id) {
    article.matchedSubject = draggedSubject.value;
    article.status = 'matched';
    article.isError = false;
    
    availableSubjects.value = availableSubjects.value.filter(s => s.id !== draggedSubject.value.id);
    draggedSubject.value = null;
  } else {
    article.isError = true;
    
    setTimeout(() => {
      article.isError = false;
    }, 800);
  }
};
</script>

<style scoped>
.shake-animation {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
.dark ::-webkit-scrollbar-thumb { background: #334155; }
</style>