<template>
  <main class="flex-1 px-4 md:px-10 lg:px-0 py-1">
    <div class="max-w-[1200px] mx-auto">
      
      <div class="mb-8">
        <nav class="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">
          <router-link to="/" class="hover:text-primary transition-colors">Home</router-link>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-900 dark:text-slate-100">Submit Request</span>
        </nav>
        <h1 class="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Submit a Request</h1>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div class="lg:col-span-2">
          <div class="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-300 dark:border-slate-800 overflow-hidden">
            <form @submit.prevent="submitTicket" class="p-6 md:p-8 space-y-6">
              
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="subject">Subject</label>
                <input v-model="form.subject" required class="w-full rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white p-3 transition-all outline-none" id="subject" placeholder="Briefly describe the issue" type="text"/>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="category">Category</label>
                  <select v-model="form.category" class="w-full rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white p-3 transition-all outline-none" id="category">
                    <option value="Account Management">Account Management</option>
                    <option value="Billing">Billing</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Network">Network</option>
                  </select>
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="priority">Priority Level</label>
                  <select v-model="form.priority" class="w-full rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white p-3 transition-all outline-none" id="priority">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300" for="description">Description</label>
                <textarea v-model="form.description" required class="w-full rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-1 focus:ring-primary focus:border-primary text-slate-900 dark:text-white p-3 transition-all outline-none" id="description" placeholder="Provide as much detail as possible..." rows="6"></textarea>
              </div>
              
              <!-- <div class="space-y-2">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-300">Attachments</label>
                <div @click="triggerFileInput" class="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center gap-3 bg-slate-50/50 dark:bg-slate-800/50 group cursor-pointer hover:border-primary transition-colors">
                  <div class="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <span class="material-symbols-outlined">cloud_upload</span>
                  </div>
                  <div class="text-center">
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-200">Drag and drop or <span class="text-primary">browse</span> to attach a file</p>
                    <p class="text-xs text-slate-500 mt-1">Maximum file size 25MB (PNG, JPG, PDF, ZIP)</p>
                  </div>
                  <input type="file" ref="fileInput" class="hidden" @change="handleFileUpload" />
                </div>
              </div> -->
              
              <div class="pt-4">
                <button :disabled="isSubmitting" class="w-full md:w-auto px-8 py-4 bg-primary text-white font-bold rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0" type="submit">
                  {{ isSubmitting ? 'Submitting...' : 'Submit Ticket' }}
                  <span v-if="!isSubmitting" class="material-symbols-outlined text-xl">send</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        <aside class="space-y-6">
          <div class="glass p-6 rounded-xl border border-slate-200 dark:border-slate-800 dark:bg-slate-800/70">
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2">Need an immediate answer?</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">Ask AI agent for instant solutions before submitting a ticket.</p>
            
            <!-- <div class="relative mb-6">
              <span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input v-model="searchQuery" class="w-full pl-10 pr-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 focus:ring-primary focus:border-primary text-sm" placeholder="Search knowledge base..." type="text"/>
            </div> -->
            
            
            <router-link to="/ai-chat" class="flex items-center justify-between p-4 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary font-semibold transition-all group" href="">
              <div class="flex items-center gap-3">
                <span class="material-symbols-outlined">forum</span>
                <span>Ask AI Agent</span>
              </div>
              <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </router-link>
          </div>

          <div class="p-6 rounded-xl bg-slate-900 text-white relative overflow-hidden">
            <div class="relative z-10">
              <h3 class="font-bold text-lg mb-2">Office Hours</h3>
              <p class="text-slate-400 text-sm mb-4">Monday - Friday<br/>9:00 AM - 6:00 PM EST</p>
              <div class="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Live Support Online
              </div>
            </div>
            <div class="absolute -right-4 -bottom-4 opacity-20">
              <span class="material-symbols-outlined text-8xl">schedule</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { api } from '../helpers/apiHelper'; 

const router = useRouter();
const toast = useToast();

const isSubmitting = ref(false);
// const searchQuery = ref('');

const fileInput = ref(null);
const triggerFileInput = () => {
  fileInput.value.click();
};
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log('File selected:', file.name);
  }
};

const form = reactive({
  subject: '',
  category: 'Technical Support',
  priority: 'Medium',
  description: ''
});

const submitTicket = async () => {
  isSubmitting.value = true;
  
  try {
    const userData = localStorage.getItem('user');
    if (!userData) {
      toast.error('You need to be logged in to perform this action!');
      router.push('/login');
      return;
    }
    
    const user = JSON.parse(userData);

    const payload = {
      submittedBy: user.id, 
      email: user.email,   
      subject: form.subject,
      category: form.category,
      priority: form.priority,
      description: form.description
    };

    await api.tickets.create(payload);
    
  
    toast.success('Your ticket has been submitted successfully!');
  
    router.push('/my-tickets'); 
    
  } catch (error) {
    console.error('Failed to submit ticket', error);
    toast.error('Failed to submit ticket. Please try again later.');
  } finally {
    isSubmitting.value = false;
  }
};
</script>