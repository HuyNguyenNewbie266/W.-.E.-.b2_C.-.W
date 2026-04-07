<template>
  <main class="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <aside class="lg:col-span-3 space-y-6">
        <div class="glass rounded-xl p-6 shadow-sm dark:bg-slate-900/40">
          <div class="flex flex-col items-center text-center">
            <div class="size-20 rounded-full border-4 border-white dark:border-slate-800 shadow-md mb-4 overflow-hidden">
              <img alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCprGdBxbWlDRBSU0n_jkq2ikC1Ww7c72Jdjoq8PFgkFbMYO4aOzOsgtI3nJIB8jToLfAiI9tXIZg9C1Tnow5HiU7UYZPzDOkB8lp9nj5EW6MO7ymcZpKYzjuglgfzoWbnfS3MZ0A1ZZQ5NAd3iDzTzAYx8yk7xAaYLOMl29Co46ViBbx-mn8fkeFA2KFmAu1rnz3AK7ewa0PyDSSaOET_pa8LOiRrA46CBhdz5S3aNt07HFakwAD6BlSdULrRNstgRPWn3jgVsg"/>
            </div>
            <h2 class="text-lg font-bold text-slate-900 dark:text-white leading-tight">Alex Johnson</h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">alex.j@quickfix.io</p>
          </div>
          
          <div class="mt-8 space-y-3">
            <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span class="material-symbols-outlined text-sm">confirmation_number</span>
                <span class="text-sm font-medium">Total Tickets</span>
              </div>
              <span class="text-sm font-bold text-primary">{{ totalTickets }}</span>
            </div>
            
            <div class="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
              <div class="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <span class="material-symbols-outlined text-sm">hourglass_empty</span>
                <span class="text-sm font-medium">Pending</span>
              </div>
              <span class="text-sm font-bold text-amber-500">{{ pendingTickets }}</span>
            </div>
          </div>
          
          <nav class="mt-8 space-y-1">
            <a class="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary font-semibold transition-colors" href="#">
              <span class="material-symbols-outlined">dashboard</span> Overview
            </a>
            <a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" href="#">
              <span class="material-symbols-outlined">history</span> Activity
            </a>
          </nav>
        </div>
      </aside>

      <section class="lg:col-span-9 space-y-6">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">My Tickets</h1>
            <p class="text-slate-500 dark:text-slate-400 mt-1">Track and manage your support requests in one place.</p>
          </div>
          
          <div class="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
            <button 
              v-for="status in ['All', 'Open', 'In Progress', 'Resolved']" 
              :key="status"
              @click="filterStatus = status"
              :class="filterStatus === status ? 'bg-white dark:bg-slate-700 shadow-sm text-primary' : 'text-slate-600 dark:text-slate-400 hover:text-primary'"
              class="px-4 py-1.5 rounded-md text-sm font-medium transition-colors">
              {{ status }}
            </button>
          </div>
        </div>

        <div class="glass rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
          
          <div v-if="isLoading" class="p-10 text-center text-slate-500">
            <span class="material-symbols-outlined animate-spin text-4xl mb-2">autorenew</span>
            <p>Loading tickets...</p>
          </div>

          <div v-else class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th class="px-6 py-4">Ticket ID</th>
                  <th class="px-6 py-4">Subject</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4">Created Date</th>
                  <th class="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
                
                <tr v-if="filteredTickets.length === 0">
                  <td colspan="5" class="px-6 py-10 text-center text-slate-500">
                    No tickets found in this category.
                  </td>
                </tr>

                <tr v-for="ticket in filteredTickets" :key="ticket._id" class="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td class="px-6 py-5 text-sm font-medium text-slate-400 group-hover:text-primary transition-colors">
                    {{ ticket.ticketNumber }}
                  </td>
                  <td class="px-6 py-5">
                    <p class="text-sm font-semibold text-slate-900 dark:text-white">{{ ticket.subject }}</p>
                    <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{{ ticket.category }} • {{ ticket.priority }} Priority</p>
                  </td>
                  <td class="px-6 py-5">
                    <span :class="getStatusClasses(ticket.status).pill" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold">
                      <span :class="getStatusClasses(ticket.status).dot" class="size-1.5 rounded-full"></span>
                      {{ ticket.status }}
                    </span>
                  </td>
                  <td class="px-6 py-5 text-sm text-slate-500 dark:text-slate-400">
                    {{ formatDate(ticket.createdAt) }}
                  </td>
                  <td class="px-6 py-5 text-right">
                    <router-link :to="{ name: 'show-ticket', params: { id: ticket._id } }" class="text-primary hover:text-primary/80 font-bold text-sm">
                      View
                    </router-link>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
          
          <div class="px-6 py-4 bg-slate-50/30 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Showing {{ filteredTickets.length }} of {{ totalTickets }} tickets
            </p>
          </div>

        </div>
      </section>
      
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { api } from '../helpers/api';
import { useToast } from 'vue-toastification';

const tickets = ref([]);
const isLoading = ref(true);
const filterStatus = ref('All'); // Trạng thái bộ lọc mặc định
const toast = useToast();

// 1. Lấy dữ liệu từ Backend
const fetchTickets = async () => {
  try {
    tickets.value = await api.tickets.getAll();
  } catch (error) {
    toast.error('Failed to load tickets');
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchTickets();
});

// 2. Computed Properties (Xử lý logic mượt mà)
// Lọc danh sách hiển thị dựa vào nút filter đang được bấm
const filteredTickets = computed(() => {
  if (filterStatus.value === 'All') return tickets.value;
  return tickets.value.filter(ticket => ticket.status === filterStatus.value);
});

// Đếm tổng số lượng
const totalTickets = computed(() => tickets.value.length);
// Đếm các ticket không phải là Resolved (nghĩa là đang Open hoặc In Progress)
const pendingTickets = computed(() => tickets.value.filter(t => t.status !== 'Resolved').length);


// 3. Hàm tiện ích (Helpers)
// Format ngày tháng cho đẹp
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

// Trả về CSS Classes tương ứng cho từng loại Status (dùng thiết kế màu của bạn)
const getStatusClasses = (status) => {
  const map = {
    'Open': { 
      pill: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', 
      dot: 'bg-blue-600' 
    },
    'In Progress': { 
      pill: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400', 
      dot: 'bg-amber-600' 
    },
    'Resolved': { 
      pill: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400', 
      dot: 'bg-emerald-600' 
    }
  };
  return map[status] || { pill: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400', dot: 'bg-slate-600' };
};
</script>