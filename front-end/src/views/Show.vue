<template>
  <div>
    <h1>Show Response</h1>

    <div v-if="isLoading" class="ui active centered inline loader"></div>

    <div v-else class="ui card fluid">
      <div class="content">
        <div class="header">
          <i class="key icon"></i> {{ response.key }}
        </div>
        <div class="meta">
          <span class="category">Category: {{ response.category }}</span> | 
          <span class="priority">Priority: {{ response.priority || 'N/A' }}</span>
        </div>
        <div class="description" style="margin-top: 20px; font-size: 1.1em;">
          <strong>Nội dung phản hồi:</strong> <br/>
          {{ response.value }}
        </div>
      </div>
      <div class="extra content">
        <router-link :to="{ name: 'edit', params: { id: response._id } }" class="ui button primary">
          Edit Response
        </router-link>
        <router-link to="/responses" class="ui button">
          Back to List
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; // Công cụ móc URL của Vue Router 4
import { api } from '../helpers/api';
import { useToast } from 'vue-toastification';

const route = useRoute();
const toast = useToast();

const response = ref({});
const isLoading = ref(true); // Biến để làm hiệu ứng xoay xoay (loading)

onMounted(async () => {
  try {
    // Lấy ID từ URL (VD: localhost:8080/responses/12345 -> id là 12345)
    const id = route.params.id; 
    
    // Gọi API getById
    response.value = await api.responses.getById(id);
  } catch (error) {
    toast.error('Không tìm thấy dữ liệu!');
  } finally {
    isLoading.value = false; // Tải xong rồi thì tắt loading đi
  }
});
</script>