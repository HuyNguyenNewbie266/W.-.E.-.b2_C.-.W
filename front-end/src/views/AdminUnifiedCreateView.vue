<template>
  <main class="max-w-4xl mx-auto w-full px-4 py-8">
    
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-black text-slate-900 dark:text-white">Create New Record</h1>
        <p class="text-slate-500 mt-1">Select the type of record you want to add to the database.</p>
      </div>

    </div>

    <div class="flex gap-4 mb-8">
      <button 
        @click="selectedType = 'response'"
        :class="selectedType === 'response' ? 'bg-primary text-white shadow-lg shadow-primary/30 border-transparent' : 'glass text-slate-600 dark:text-slate-300 border-white/50 hover:border-primary/50'"
        class="flex-1 py-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
      >
        <span class="material-symbols-outlined text-3xl">auto_stories</span>
        <span class="font-bold">Knowledge Response</span>
      </button>

<button 
  @click="selectedType = 'user'"
  :class="selectedType === 'user' 
    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border-transparent' 
    : 'glass text-slate-600 dark:text-slate-300 border-white/50 hover:border-blue-500/50'"
  class="flex-1 py-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all active:scale-95"
>
  <span class="material-symbols-outlined text-3xl">manage_accounts</span>
  <span class="font-bold">System User</span>
</button>
    </div>

    <div class="glass rounded-2xl shadow-xl border border-white/50 dark:border-slate-800 p-8 dark:bg-slate-800/60 transition-all">
      <form @submit.prevent="submitForm" class="space-y-6">
        
        <template v-if="selectedType === 'response'">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Title</label>
              <input v-model="resForm.title" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="Article Title"/>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Category</label>
              <select v-model="resForm.category" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none">
                <option value="Account Management">Account Management</option>
                <option value="Billing">Billing</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Network">Network</option>
              </select>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Key (Optional - Auto generates if blank)</label>
            <input v-model="resForm.key" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none" type="text" placeholder="e.g. ERR-404"/>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Content (Value)</label>
            <textarea v-model="resForm.value" required rows="6" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Enter article content..."></textarea>
          </div>
        </template>

        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-1 gap-6">
            <!-- <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input v-model="userForm.name" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none focus:ring-2 focus:ring-purple-500" type="text" placeholder="John Doe"/>
            </div> -->
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input v-model="userForm.email" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none focus:ring-2 focus:ring-purple-500" type="email" placeholder="john@company.com"/>
            </div>
            <!-- <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Password</label>
              <input v-model="userForm.password" required class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none focus:ring-2 focus:ring-purple-500" type="password" placeholder="••••••••"/>
            </div> -->
            <div class="space-y-2">
              <label class="text-sm font-bold text-slate-700 dark:text-slate-300">Role</label>
              <select v-model="userForm.role" class="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-3 outline-none font-bold text-blue-600">
                <option value="staff">Staff</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>
        </template>

        <div class="pt-6 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
          <button type="button" @click="$router.back()" class="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancel</button>
          
          <button 
            :disabled="isSaving" 
            type="submit" 
            :class="selectedType === 'response' ? 'bg-primary hover:bg-blue-700 shadow-primary/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'"
            class="px-8 py-3 text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95"
          >
            {{ isSaving ? 'Creating...' : 'Create ' + (selectedType === 'response' ? 'Response' : 'User') }}
            <span class="material-symbols-outlined text-sm">add_circle</span>
          </button>
        </div>

      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '../helpers/apiHelper';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const selectedType = ref('response'); // Mặc định mở form Response
const isSaving = ref(false);

// Tách riêng 2 Form Data để ko bị lẫn lộn
const resForm = reactive({ title: '', category: 'Technical Support', key: '', value: '' });
const userForm = reactive({ name: '', email: '', password: '', role: 'staff' });

const submitForm = async () => {
  isSaving.value = true;
  try {
    if (selectedType.value === 'response') {
      const payload = { ...resForm };
      if (!payload.key) delete payload.key; // Xóa key để backend tự sinh mã
      
      await api.responses.create(payload);
      toast.success('Knowledge Base Response created successfully!');
    } else {
      await api.users.create(userForm);
      toast.success('System User created successfully!');
    }
    
    router.push('/admin/search'); // Xong việc thì đẩy về trang tìm kiếm
  } catch (error) {
    console.error(error);
    toast.error('Error creating record. Please check the data.');
  } finally {
    isSaving.value = false;
  }
};
</script>