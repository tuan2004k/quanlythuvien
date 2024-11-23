<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import router from './router';

onMounted(() => {
  const token = localStorage.getItem('jwt');
  const role = localStorage.getItem('role'); // Ví dụ: Lưu role trong localStorage

  if (!token) {
    // Nếu không có token, chuyển đến trang đăng nhập
    router.push('/login');
  } else {
    // Kiểm tra role và chuyển hướng
    if (role === 'admin') {
      router.push('/admin');
    } else if (role === 'docgia') {
      router.push('/docgia');
    } else {
      // Role không hợp lệ, logout và yêu cầu đăng nhập lại
      localStorage.removeItem('jwt');
      localStorage.removeItem('role');
      router.push('/login');
    }
  }
});
</script>
