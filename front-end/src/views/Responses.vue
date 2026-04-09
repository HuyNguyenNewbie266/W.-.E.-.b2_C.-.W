<!-- <template>
  <div>
    <h1>Response Library</h1>
    <table id="responses" class="ui celled compact table">
      <thead>
        <tr>
          <th>Key (Mã lỗi)</th>
          <th>Category (Danh mục)</th>
          <th>Value (Câu trả lời)</th>
          <th colspan="3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(res, i) in responses" :key="i">
          <td><div class="ui ribbon label">{{ res.key }}</div></td>
          <td>{{ res.category }}</td>
          <td>{{ res.value }}</td>
          
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'show', params: { id: res._id } }">Show</router-link>
          </td>
          <td width="75" class="center aligned">
            <router-link :to="{ name: 'edit', params: { id: res._id } }">Edit</router-link>
          </td>
          <td width="75" class="center aligned">
            <a href="#" @click.prevent="onDestroy(res._id)" style="color: red;">Destroy</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { api } from '../helpers/api'; // Dùng helper API chúng ta vừa viết
import { useToast } from 'vue-toastification';

// 1. Khai báo biến
const responses = ref([]); // ref() giúp biến này có tính "phản ứng" (reactive)
const toast = useToast();

// 2. Chạy khi trang vừa tải xong (tương đương mounted() ở Vue 2)
const fetchResponses = async () => {
  try {
    responses.value = await api.responses.getAll();
  } catch (error) {
    toast.error('Không thể tải danh sách Responses!');
  }
};

onMounted(() => {
  fetchResponses();
});

// 3. Hàm xử lý nút Xóa (Destroy)
const onDestroy = async (id) => {
  const isSure = window.confirm('Bạn có chắc chắn muốn xóa thư viện phản hồi này không?');
  if (isSure) {
    try {
      await api.responses.delete(id);
      toast.success('Đã xóa thành công!');
      await fetchResponses(); // Tải lại bảng sau khi xóa
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa!');
    }
  }
};
</script> -->


<template>
  <div class="knowledge-base-view">
    <section class="relative py-16 px-4 overflow-hidden">
      <div class="absolute inset-0 bg-primary/5 dark:bg-primary/10"></div>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-gradient-to-b from-primary/10 to-transparent blur-3xl opacity-50"></div>
      
      <div class="relative max-w-3xl mx-auto text-center">
        <h1 class="text-4xl md:text-5xl font-black mb-6 tracking-tight">How can we help?</h1>
        
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/30 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div class="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden p-1.5">
            <div class="pl-4 flex items-center justify-center text-slate-400">
              <span class="material-symbols-outlined">search</span>
            </div>
            <input 
              v-model="searchQuery" 
              class="w-full border-none focus:ring-0 bg-transparent text-lg py-3 px-3 placeholder:text-slate-400" 
              placeholder="Search for articles..." 
              type="text"
            />
            <button class="bg-primary text-white font-bold px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Search
            </button>
          </div>
        </div>

        <div class="mt-4 flex flex-wrap justify-center gap-2 text-sm text-slate-500">
          <span>Popular:</span>
          <a class="hover:text-primary underline decoration-primary/30 cursor-pointer" @click="searchQuery = 'Password Reset'">Password Reset</a>
          <a class="hover:text-primary underline decoration-primary/30 cursor-pointer" @click="searchQuery = 'API Docs'">API Docs</a>
          <a class="hover:text-primary underline decoration-primary/30 cursor-pointer" @click="searchQuery = 'Pricing'">Pricing</a>
        </div>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        
        <div class="flex-1">
          
          <div class="mb-16">
            <h2 class="text-2xl font-bold mb-8">Categories</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              
              <div class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">person</span>
            </div>
                <h3 class="text-lg font-bold mb-2">Account Management</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Security settings, profiles, and permissions.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View 12 articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              <div class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">payments</span>
            </div>
                <h3 class="text-lg font-bold mb-2">Billing</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Invoices, payment methods, and plans.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View 8 articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              <div class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">settings</span>
            </div>
                <h3 class="text-lg font-bold mb-2">Technical Support</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Software issues, bug reports, and tools.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View 15 articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>

              <div class="group relative flex flex-col p-6 rounded-xl border border-white/40 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_20px_rgba(36,99,235,0.1)] transition-all duration-300 cursor-pointer">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors group-hover:bg-primary group-hover:text-white dark:bg-slate-700">
              <span class="material-symbols-outlined">api</span>
            </div>
                <h3 class="text-lg font-bold mb-2">Network</h3>
                <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Connectivity issues, troubleshooting, and configuration.</p>
                <div class="mt-4 text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                  View 24 articles <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
              
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-8">
              <h2 class="text-2xl font-bold">Popular Articles</h2>
              <a class="text-primary font-semibold text-sm hover:underline cursor-pointer">View all</a>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a class="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary transition-colors group cursor-pointer">
                <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">description</span>
                <span class="font-medium">How to reset your password</span>
                <span class="material-symbols-outlined ml-auto text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </a>
              
              <a class="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary transition-colors group cursor-pointer">
                <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">credit_card</span>
                <span class="font-medium">Updating payment methods</span>
                <span class="material-symbols-outlined ml-auto text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </a>
              
              <a class="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary transition-colors group cursor-pointer">
                <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">integration_instructions</span>
                <span class="font-medium">API integration guide</span>
                <span class="material-symbols-outlined ml-auto text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </a>
              
              <a class="flex items-center gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-primary transition-colors group cursor-pointer">
                <span class="material-symbols-outlined text-slate-400 group-hover:text-primary">receipt_long</span>
                <span class="font-medium">Understanding your invoice</span>
                <span class="material-symbols-outlined ml-auto text-slate-300 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </a>
            </div>
          </div>
          
        </div>

        <aside class="w-full lg:w-64">
          <div class="sticky top-24 space-y-6">
            
            <div class="p-6 rounded-2xl bg-primary text-white shadow-xl shadow-primary/20 relative overflow-hidden">
              <div class="absolute -right-8 -bottom-8 text-white/10">
                <span class="material-symbols-outlined text-[120px] rotate-12">help_center</span>
              </div>
              <div class="relative z-10">
                <h3 class="text-xl font-bold mb-2">Still need help?</h3>
                <p class="text-primary-100/80 mb-6 text-sm">Can't find what you're looking for? Our support team is ready to assist you.</p>
                <router-link to="/submit" class="block text-center w-full bg-white text-primary font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                  Submit a Ticket
                </router-link>
              </div>
            </div>
            
            <div class="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <h4 class="font-bold mb-4">Support Hours</h4>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between text-slate-500">
                  <span>Mon - Fri</span>
                  <span class="text-slate-900 dark:text-slate-100 font-medium">9am - 6pm</span>
                </div>
                <div class="flex justify-between text-slate-500">
                  <span>Saturday</span>
                  <span class="text-slate-900 dark:text-slate-100 font-medium">10am - 4pm</span>
                </div>
                <div class="flex justify-between text-slate-500">
                  <span>Sunday</span>
                  <span class="text-slate-900 dark:text-slate-100 font-medium">Closed</span>
                </div>
              </div>
              
              <hr class="my-4 border-slate-100 dark:border-slate-800"/>
              
              <div class="flex items-center gap-3">
                <div class="flex -space-x-2">
                  <div class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-200">
                    <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-8Uj6p7hDaC04xmi-yLvAI8KDfY10He29vEh2LQ4ikpeKe6EuY7udj7KDqYFMcjBOat_0vJAbLYJPvtsgiD4Qq7-v0tAcx1OFTJ8HauwlEpQg619HbOHYdUxOJD8gv2RTiiBw1f23aFylZC4vhmzZRwsgTUlw9N1BvG4vmtaqGiEGWIT6vziFIhsOPux4VeL3Xka0-fAMF1-VUY_acQqF0HQr0diG1cCxChSp6JlNS3cNMeVHP4gDj6hexV7lSwwC9B0PEeD0lQ" alt="Support 1"/>
                  </div>
                  <div class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-200">
                    <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7yFcnmMjMndO1JajOnOPCsiZvnZamQ0KrD5vT9DaFgyJKjE_4u9gd_LHAfkEZfB4lnq85DtID_MoF4s9NyZKfa6jahzzS-UnZZJbrKVjBYHvJysQkobkxPuFrbdJzcIElwTiXtji_GAnoK50_UMwc3Ef3_cKa74ju0ErmI9tdhnuCLa6ALSI7GTLXi7iMxjC3-Q4jex-OYBDsgUcPKqGbVj0U2273o5JTU3u1kwgtov33WhEWLvL2WisMvcJm6-N3iChtEG81VA" alt="Support 2"/>
                  </div>
                  <div class="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 overflow-hidden bg-slate-200">
                    <img class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOeQrlQ7r5cNiLM5f3NIAOYp4JwTu9L3G-pGTkmF4acHtMc5aYS4YBHh05LLoA3l8mlySPkKJm3I-7rGpZ2iCdBb1FPNrVmVlLJ1j5Wz5uFaw1Az74q4hvYla5XWWGr3QNJyKaBqMaB6G6OQOBDZraGPlHaEBIcnf8NBrP8tSew1IOFLPQyoEsMO8xwlNCvXm4rlV2dBhvNpKurcHDagcNqPO7lx0jrKFOVpwtyn6srjJ3Y8l4hF4uipfe4BBChHanlU-wjMRwCQ" alt="Support 3"/>
                  </div>
                </div>
                <span class="text-xs text-slate-500 font-medium">Avg response: <span class="text-primary">2h</span></span>
              </div>
            </div>
            
          </div>
        </aside>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Khai báo biến reactive để hứng dữ liệu người dùng gõ vào ô tìm kiếm
const searchQuery = ref('');

</script>