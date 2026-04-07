<template>
  <div>
    <h1>Create New Response</h1>
    <div class="ui segment">
      <ResponseForm @submitForm="handleCreate" />
    </div>
  </div>
</template>

<script setup>
import ResponseForm from '../components/ResponseForm.vue';
import { api } from '../helpers/api';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter(); // Công cụ chuyển trang
const toast = useToast();

const handleCreate = async (payload) => {
  try {
    // Gọi API lưu vào DB
    await api.responses.create(payload);
    
    toast.success('Tạo Response thành công!');
    
    // Chuyển hướng về trang danh sách
    router.push('/responses');
  } catch (error) {
    toast.error('Lỗi khi tạo Response!');
  }
};
</script>