<template>
  <div class="ticket-detail-view max-w-7xl mx-auto w-full p-6 lg:p-8 pt-8">
    
    <div v-if="isLoading" class="p-10 text-center text-slate-500">
      <span class="material-symbols-outlined animate-spin text-4xl mb-2">autorenew</span>
      <p>Loading ticket details...</p>
    </div>

    <div v-else>
      <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <router-link to="/my-tickets" class="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors font-medium mb-2 w-fit cursor-pointer">
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span class="uppercase tracking-widest text-[10px]">Back to Ticket List</span>
          </router-link>
          <h1 class="text-[1.875rem] font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {{ ticket.subject }} </h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1">
            Ticket {{ ticket.ticketNumber }} • Created {{ formatDate(ticket.createdAt) }}
          </p>
        </div>
        
        <div class="flex gap-3">
          <button 
            v-if="ticket.status !== 'Resolved'"
            @click="closeTicket"
            class="px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all text-sm flex items-center gap-2">
            <span class="material-symbols-outlined text-lg">close</span>
            Close Ticket
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div class="lg:col-span-8 space-y-8">
          
          <div class="glass rounded-xl p-6 dark:bg-slate-800/40">
            <div class="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{{ ticket.description }}</div>
            
            <div v-if="ticket.attachmentUrl" class="mt-6 flex items-center gap-2">
              <a :href="ticket.attachmentUrl" target="_blank" class="flex items-center gap-2 px-3 py-1.5 bg-slate-100/50 dark:bg-slate-700/50 hover:bg-slate-200/50 dark:hover:bg-slate-600/50 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors">
                <span class="material-symbols-outlined text-base">attach_file</span>
                View Attachment
              </a>
            </div>
          </div>

          <div class="space-y-6">
            <h3 class="text-sm font-bold uppercase tracking-widest text-slate-400 px-1">Activity Feed</h3>
            
            <div v-if="activities.length === 0" class="text-sm text-slate-500 italic px-1">
              No comments yet.
            </div>

            <div v-for="activity in activities" :key="activity._id">
              <div class="relative pl-8 pb-8 border-l-2 border-slate-200/60 dark:border-slate-700 ml-4">
                <div class="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-primary flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div class="glass rounded-xl p-5 dark:bg-slate-800/40">
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex items-center gap-3">
                      <span class="text-slate-900 dark:text-white font-bold text-sm">
                        {{ activity.sender.name || 'User' }} 
                      </span>
                    </div>
                    <span class="text-xs text-slate-400">{{ formatTime(activity.createdAt) }}</span>
                  </div>
                  <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {{ activity.message }}
                  </p>
                </div>
              </div>
            </div>

            <div v-if="nextCursor" class="text-center mt-2 mb-6">
              <button 
                @click="loadMoreMessages" 
                :disabled="isLoadingMore"
                class="px-5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 rounded-full shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2 mx-auto">
                <span v-if="isLoadingMore" class="material-symbols-outlined animate-spin text-sm">autorenew</span>
                <span v-else class="material-symbols-outlined text-sm">history</span>
                {{ isLoadingMore ? 'Loading...' : 'View older comments' }}
              </button>
            </div>

            <div v-if="ticket.status !== 'Resolved'" class="glass rounded-xl p-4 mt-6 dark:bg-slate-800/40">
              <textarea 
                v-model="newComment"
                class="w-full bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-lg text-sm focus:ring-primary focus:border-primary min-h-[100px] p-3 placeholder:text-slate-400 border transition-colors outline-none" 
                placeholder="Type your update or comment here..."
              ></textarea>
              <div class="flex flex-wrap justify-end items-center mt-3 gap-3">
                <button 
                  @click="postComment" 
                  :disabled="isPosting"
                  class="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:bg-blue-700 shadow-md transition-all text-sm disabled:opacity-70">
                  {{ isPosting ? 'Posting...' : 'Post Reply' }}
                </button>
              </div>
            </div>
            <div v-else class="text-center p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm text-slate-500">
              This ticket has been resolved and is closed to new comments.
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
                  <div :class="getStatusClasses(ticket.status).pill" class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ring-1 ring-opacity-20">
                    <div :class="getStatusClasses(ticket.status).dot" class="w-1.5 h-1.5 rounded-full"></div>
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
                  <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last Updated</span>
                  <span class="text-slate-900 dark:text-white font-bold text-sm">{{ formatDate(ticket.updatedAt) }}</span>
                </div>
                
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
// Đảm bảo import api đúng với đường dẫn trong project của bạn
import { api } from '../helpers/apiHelper'; 

const route = useRoute();
const router = useRouter();
const toast = useToast();

const ticket = ref({});
const activities = ref([]); // Danh sách bình luận
const newComment = ref('');
const currentUser = ref(null);

const isLoading = ref(true);
const isPosting = ref(false);
const isLoadingMore = ref(false);

// Con trỏ phân trang cho Comments
const nextCursor = ref(null);
const LIMIT_PER_PAGE = 5;

// 1. Khởi tạo
onMounted(async () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    currentUser.value = JSON.parse(userData);
  } else {
    router.push('/login');
    return;
  }

  await loadData();
});

// 2. Tải dữ liệu trang
const loadData = async () => {
  try {
    isLoading.value = true;
    const ticketId = route.params.id;

    // Lấy Ticket Info
    ticket.value = await api.tickets.getById(ticketId);

    // Lấy Messages (Comments) lần đầu
    await fetchMessages(false);

  } catch (error) {
    console.error("Lỗi lấy chi tiết vé:", error);
    toast.error("Không thể tải thông tin vé.");
  } finally {
    isLoading.value = false;
  }
};

// 3. Hàm Fetch Messages (Xử lý Pagination)
const fetchMessages = async (isLoadMore = false) => {
  try {
    if (isLoadMore) {
      isLoadingMore.value = true;
    }

    // Gọi API getByTicket kèm params phân trang
    const response = await api.messages.getByTicket(ticket.value._id, {
      limit: LIMIT_PER_PAGE,
      cursor: isLoadMore ? nextCursor.value : null
    });

    if (isLoadMore) {
      // Nối thêm bình luận cũ xuống dưới
      activities.value = [...activities.value, ...response.data];
    } else {
      // Tải lại trang đầu tiên (khi mới vào hoặc vừa gửi tin nhắn mới)
      activities.value = response.data;
    }

    // Cập nhật con trỏ cho lần bấm tiếp theo
    nextCursor.value = response.nextCursor;

  } catch (error) {
    console.error("Lỗi tải bình luận:", error);
    toast.error("Không thể tải danh sách bình luận.");
  } finally {
    isLoadingMore.value = false;
  }
};

// Hàm gọi khi bấm "View older comments"
const loadMoreMessages = () => {
  if (nextCursor.value) {
    fetchMessages(true);
  }
};

// 4. Gửi Comment mới
const postComment = async () => {
  if (!newComment.value.trim()) return;
  
  isPosting.value = true;
  try {
    const payload = {
      ticket: ticket.value._id,
      sender: currentUser.value.id,
      message: newComment.value
    };

    await api.messages.create(payload);
    toast.success("Bình luận đã được gửi!");
    newComment.value = ''; // Xoá ô text
    
    // Đặt lại cursor và tải lại từ đầu để hiện tin nhắn mới nhất lên trên
    nextCursor.value = null;
    await fetchMessages(false);
    
  } catch (error) {
    console.error("Lỗi gửi tin nhắn:", error);
    toast.error("Không thể gửi bình luận.");
  } finally {
    isPosting.value = false;
  }
};

// 5. Đóng Ticket
const closeTicket = async () => {
  if(!confirm("Bạn có chắc chắn muốn đóng ticket này không?")) return;
  
  try {
    await api.tickets.update(ticket.value._id, {
      ...ticket.value,
      status: 'Resolved'
    });
    toast.success("Ticket đã được đóng.");
    await loadData(); 
  } catch (error) {
    toast.error("Lỗi khi cập nhật trạng thái.");
  }
};

// --- CÁC HÀM TIỆN ÍCH ---
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleString('en-GB', { hour: '2-digit', minute:'2-digit', day: 'numeric', month: 'short' });
};

const getStatusClasses = (status) => {
  const map = {
    'Open': { pill: 'bg-blue-50 text-blue-600 ring-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20', dot: 'bg-blue-600 dark:bg-blue-400' },
    'In Progress': { pill: 'bg-amber-50 text-amber-600 ring-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20', dot: 'bg-amber-600 dark:bg-amber-400' },
    'Resolved': { pill: 'bg-emerald-50 text-emerald-600 ring-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20', dot: 'bg-emerald-600 dark:bg-emerald-400' }
  };
  return map[status] || { pill: 'bg-slate-50 text-slate-600 ring-slate-200', dot: 'bg-slate-600' };
};
</script>