<template>
  <div class="bg-slate-50 text-slate-900 font-display antialiased h-[80vh] relative dark:bg-slate-900 dark:text-white flex flex-col">
    
    <div class="fixed bottom-[-10rem] right-[-10rem] w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    <div class="fixed top-[20%] left-[-5rem] w-[20rem] h-[20rem] bg-blue-400/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

    <main class="flex-1 flex flex-col max-w-4xl mx-auto w-full pt-12 relative h-screen">
      
      <header class="mb-6 px-6 shrink-0 text-center">

        <h1 class="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Knowledge AI</h1>
        <p class="text-slate-500 text-sm">Ask me anything about internal procedures, troubleshooting, or technical docs.</p>
      </header>

      <div 
        ref="chatContainer"
        class="max-h-[70vh] overflow-y-auto space-y-6 px-6 pb-40 scroll-smooth custom-scrollbar"
      >
        <div v-for="(msg, index) in chatHistory" :key="index">
          
          <div v-if="msg.role === 'ai'" class="flex gap-4 max-w-3xl">
            <div class="flex-shrink-0 mt-1">
              <div class="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
              </div>
            </div>
            <div>
              <div class="glass p-5 rounded-2xl rounded-tl-none shadow-sm dark:bg-slate-800/60 border border-white/40 dark:border-slate-700/50">
                <p class="text-[0.9rem] text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{{ msg.text }}</p>
                
                <div v-if="msg.sources && msg.sources.length > 0" class="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                  <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sources Found:</p>
                  <div class="flex flex-wrap gap-2">
                    <router-link 
                      v-for="source in msg.sources" 
                      :key="source.id"
                      :to="{ name: 'response-details', params: { id: source.id } }"
                      class="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-primary hover:bg-primary/5 hover:border-primary/30 transition-colors group"
                    >
                      <span class="material-symbols-outlined text-[14px] text-slate-400 group-hover:text-primary">article</span>
                      {{ source.title }}
                    </router-link>
                  </div>
                </div>
              </div>
              <span class="text-[10px] font-bold text-slate-400 uppercase mt-2 ml-2 block">Huy AI • {{ msg.time }}</span>
            </div>
          </div>

          <div v-else class="flex gap-4 max-w-3xl ml-auto flex-row-reverse">
            <div class="flex-shrink-0 mt-1">
              <div class="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 shadow-sm border-2 border-white dark:border-slate-800">
                <span class="material-symbols-outlined text-xl">person</span>
              </div>
            </div>
            <div>
              <div class="bg-primary text-white p-5 rounded-2xl rounded-tr-none shadow-md shadow-primary/20">
                <p class="text-[0.9rem] leading-relaxed font-medium whitespace-pre-wrap">{{ msg.text }}</p>
              </div>
              <span class="text-[10px] font-bold text-slate-400 uppercase mt-2 mr-2 block text-right">You • {{ msg.time }}</span>
            </div>
          </div>

        </div>

        <div v-if="isThinking" class="flex gap-4 max-w-3xl">
          <div class="flex-shrink-0 mt-1">
            <div class="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
              <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">smart_toy</span>
            </div>
          </div>
          <div class="glass p-5 rounded-2xl rounded-tl-none shadow-sm dark:bg-slate-800/60 border border-white/40 dark:border-slate-700/50 flex items-center gap-3">
            <div class="flex gap-1.5 items-center">
              <div class="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></div>
              <div class="h-2 w-2 rounded-full bg-blue-500 animate-pulse" style="animation-delay: 150ms;"></div>
              <div class="h-2 w-2 rounded-full bg-blue-600 animate-pulse" style="animation-delay: 300ms;"></div>
            </div>
            <span class="text-xs text-slate-500 italic font-medium">Analyzing documents...</span>
          </div>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent dark:from-slate-900 dark:via-slate-900/95 shrink-0">
        <div class="max-w-3xl mx-auto space-y-3">
          
          <div class="glass rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-none p-2 flex items-end gap-2 border border-white/50 dark:border-slate-700/80 dark:bg-slate-800/80">
            <textarea 
              v-model="userQuery"
              @keydown.enter.prevent="handleEnter"
              class="flex-1 bg-transparent border-none focus:ring-0 text-[0.95rem] py-3 px-4 resize-none max-h-32 text-slate-900 dark:text-white placeholder-slate-400 outline-none" 
              placeholder="Ask a question or enter keywords..." 
              rows="1"
            ></textarea>
            
            <div class="flex items-center p-1 shrink-0">
              <button 
                @click="sendMessage"
                :disabled="!userQuery.trim() || isThinking"
                class="h-12 w-12 bg-primary text-white rounded-xl flex items-center justify-center shadow-md hover:bg-blue-700 transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100"
              >
                <span class="material-symbols-outlined text-xl">send</span>
              </button>
            </div>
          </div>
          
          <p class="text-[10px] text-center text-slate-400 font-medium">
            AI can make mistakes. Please verify critical information from the provided sources.
          </p>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';
import { api } from '../helpers/apiHelper'; 
import { useToast } from 'vue-toastification';

const toast = useToast();
const userQuery = ref('');
const isThinking = ref(false);
const chatContainer = ref(null);

// Hàm lấy giờ hiện tại (Format: 10:24 AM)
const getCurrentTime = () => {
  return new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// Khởi tạo Chat History với câu chào đúng chuẩn
const chatHistory = ref([
  { 
    role: 'ai', 
    text: 'Hello! Please enter any keywords or questions you have, and I will search through the internal knowledge base for you.',
    
    time: getCurrentTime(),
    sources: []
  }
]);

// Cuộn màn hình xuống đáy
const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Bấm Enter để gửi (Shift+Enter để xuống dòng)
const handleEnter = (e) => {
  if (e.shiftKey) return; // Cho phép xuống dòng
  sendMessage();
};

// Gửi tin nhắn
const sendMessage = async () => {
  const query = userQuery.value.trim();
  if (!query || isThinking.value) return;

  // 1. Thêm câu hỏi của User vào UI
  chatHistory.value.push({
    role: 'user',
    text: query,
    time: getCurrentTime()
  });
  
  userQuery.value = ''; // Clear ô nhập
  isThinking.value = true;
  scrollToBottom();

  try {
    // 2. Gọi API gửi cho RAG AI (Đã code ở Backend)
    const response = await api.responses.askAI({ question: query });

    // 3. Nhận kết quả và đẩy vào UI
    chatHistory.value.push({
      role: 'ai',
      text: response.answer,
      time: getCurrentTime(),
      sources: response.sources || [] // Mảng chứa { id, title } của bài viết
    });

  } catch (error) {
    console.error("Lỗi khi gọi AI:", error);
    chatHistory.value.push({
      role: 'ai',
      text: 'Sorry, there was an error connecting to the AI server. Please try again later.',
      time: getCurrentTime(),
      sources: []
    });
  } finally {
    isThinking.value = false;
    scrollToBottom();
  }
};

onMounted(() => {
  scrollToBottom();
});
</script>

<style scoped>
/* Làm mượt thanh cuộn trong khung chat */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 10px;
}
.dark .custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(51, 65, 85, 0.5);
}
</style>