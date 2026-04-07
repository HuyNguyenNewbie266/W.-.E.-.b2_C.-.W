<template>
  <div>
    <h1>Edit Response</h1>
    
    <div v-if="isLoading" class="ui active centered inline loader"></div>

    <div v-else class="ui segment">
      <ResponseForm 
        :initialData="responseToEdit" 
        @submitForm="handleUpdate" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ResponseForm from '../components/ResponseForm.vue';
import { api } from '../helpers/api';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();

const responseToEdit = ref({});
const isLoading = ref(true);

// Tải dữ liệu cũ khi vừa mở trang
onMounted(async () => {
  try {
    const id = route.params.id;
    responseToEdit.value = await api.responses.getById(id);
  } catch (error) {
    toast.error('Không tìm thấy Response để sửa!');
    router.push('/responses'); // Lỗi thì đẩy về trang chủ
  } finally {
    isLoading.value = false;
  }
});

// Hàm xử lý khi Form báo Submit
const handleUpdate = async (payload) => {
  try {
    const id = route.params.id;
    await api.responses.update(id, payload);
    
    toast.success('Cập nhật thành công!');
    router.push('/responses');
  } catch (error) {
    toast.error('Cập nhật thất bại!');
  }
};
</script>