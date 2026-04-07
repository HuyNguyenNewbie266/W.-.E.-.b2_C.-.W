<template>
  <form class="ui form" action="#" @submit.prevent="onSubmit">
    <div class="ui negative message" v-if="errorsPresent">
      <div class="header">Lỗi nhập liệu!</div>
      <p>Vui lòng điền đầy đủ Category, Câu trả lời và Chọn mức độ ưu tiên.</p>
    </div>

    <div class="field">
      <label>Category (Danh mục)</label>
      <input type="text" placeholder="Ví dụ: Billing, Support..." v-model="formData.category" />
    </div>

    <div class="field">
      <label>Priority (Độ ưu tiên)</label>
      <select class="ui dropdown" v-model="formData.priority">
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    <div class="field">
      <label>Value (Nội dung câu trả lời mẫu)</label>
      <textarea rows="3" placeholder="Nhập câu trả lời..." v-model="formData.value"></textarea>
    </div>

    <div class="field">
      <label>Tags (Cách nhau bằng dấu phẩy - Không bắt buộc)</label>
      <input type="text" placeholder="Ví dụ: login, password_reset" v-model="formData.tags" />
    </div>

    <button class="ui positive button" type="submit">Submit (Lưu)</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

// 1. Nhận dữ liệu từ component cha (truyền xuống khi Edit)
const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({ category: '', priority: 'Medium', value: '', tags: '' })
  }
});

// 2. Định nghĩa sự kiện sẽ gửi ngược lại lên cha
const emit = defineEmits(['submitForm']);

// 3. Quản lý trạng thái form cục bộ
const formData = ref({ ...props.initialData });
const errorsPresent = ref(false);

// Theo dõi nếu cha truyền dữ liệu mới (khi API getById tải xong ở trang Edit)
watch(
  () => props.initialData,
  (newVal) => {
    if (newVal && Object.keys(newVal).length > 0) {
      // Chuyển mảng tags thành chuỗi để hiển thị trên input
      const tagsString = Array.isArray(newVal.tags) ? newVal.tags.join(', ') : '';
      formData.value = { ...newVal, tags: tagsString };
    }
  },
  { immediate: true }
);

// 4. Xử lý Submit
const onSubmit = () => {
  // Validate cơ bản
  if (!formData.value.category || !formData.value.value || !formData.value.priority) {
    errorsPresent.value = true;
    return;
  }
  errorsPresent.value = false;

  // Chuẩn bị dữ liệu để gửi lên backend (Tách chuỗi tags thành mảng)
  const payload = {
    ...formData.value,
    tags: formData.value.tags ? formData.value.tags.split(',').map(tag => tag.trim()) : []
  };

  // Phát sự kiện 'submitForm' mang theo dữ liệu lên cho cha xử lý
  emit('submitForm', payload);
};
</script>