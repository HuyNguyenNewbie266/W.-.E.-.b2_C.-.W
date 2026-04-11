<template>
  <main class="max-w-4xl mx-auto w-full px-4 py-8">
    
    <div class="mb-8 flex items-center justify-between">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <span class="material-symbols-outlined text-sm">edit_document</span>
          Editing {{ entityType }}
        </div>
        <!-- <h1 class="text-3xl font-black text-slate-900 dark:text-white">Record: {{ code }}</h1> -->
      </div>
      <button @click="$router.back()" class="text-slate-500 hover:text-primary font-bold text-sm flex items-center gap-1 glass px-4 py-2 rounded-lg">
        <span class="material-symbols-outlined text-sm">arrow_back</span> Back
      </button>
    </div>

    <div v-if="isLoading" class="py-20 text-center text-slate-500">
      <span class="material-symbols-outlined animate-spin text-4xl mb-2">autorenew</span>
      <p>Loading record data...</p>
    </div>

    <div v-else class="glass rounded-2xl shadow-xl border border-white/50 dark:border-slate-800 p-8 dark:bg-slate-800/60">
      <form @submit.prevent="submitSave" class="space-y-6">
        
        <template v-if="entityType === 'response'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Title</label>
              <input v-model="formData.title" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none focus:ring-2 focus:ring-primary" type="text" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Category</label>
              <select v-model="formData.category" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none">
                <option value="Account Management">Account Management</option>
                <option value="Billing">Billing</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Network">Network</option>
              </select>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Content (Value)</label>
            <textarea v-model="formData.value" required rows="8" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-primary"></textarea>
          </div>
        </template>

        <template v-else-if="entityType === 'ticket'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Subject</label>
              <input v-model="formData.subject" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none" type="text" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Status</label>
              <select v-model="formData.status" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none font-bold text-primary">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Priority</label>
              <select v-model="formData.priority" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
            <textarea v-model="formData.description" required rows="6" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-4 outline-none"></textarea>
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input v-model="formData.name" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none" type="text" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input v-model="formData.email" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none" type="email" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Role</label>
              <select v-model="formData.role" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none font-bold text-primary-600">
                <option value="staff">Staff</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>
        </template>

        <div class="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button type="button" @click="$router.back()" class="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
          <button :disabled="isSaving" type="submit" class="px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95">
            {{ isSaving ? 'Saving...' : 'Save Changes' }}
            <span class="material-symbols-outlined text-sm">save</span>
          </button>
        </div>

      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '../helpers/apiHelper';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const isLoading = ref(true);
const isSaving = ref(false);
const formData = ref({});

// Lấy id và type từ thanh URL
const id = route.params.id;
const typeParam = route.query.type || ''; 

// Chuyển type về chữ thường và so sánh chính xác
const entityType = computed(() => {
  const t = typeParam.toLowerCase();
  if (t === 'response') return 'response';
  if (t === 'ticket') return 'ticket';
  return 'user'; // Mặc định còn lại là user
});

onMounted(async () => {
  try {
    if (entityType.value === 'response') formData.value = await api.responses.getById(id);
    else if (entityType.value === 'ticket') formData.value = await api.tickets.getById(id);
    else formData.value = await api.users.getById(id);
  } catch (error) {
    console.error("Load Error:", error);
    toast.error('Failed to load record details');
    router.back();
  } finally {
    isLoading.value = false;
  }
});

const submitSave = async () => {
  isSaving.value = true;
  try {
    if (entityType.value === 'response') await api.responses.update(id, formData.value);
    else if (entityType.value === 'ticket') await api.tickets.update(id, formData.value);
    else await api.users.update(id, formData.value);
    
    toast.success(`${entityType.value.toUpperCase()} updated successfully!`);
    router.back();
  } catch (error) {
    console.error("Save Error:", error);
    toast.error('Error saving data');
  } finally {
    isSaving.value = false;
  }
};
</script>