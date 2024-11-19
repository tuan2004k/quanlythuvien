<template>
  <router-view/>
</template>
<script setup lang="ts">
import router from './router'
const token = localStorage.getItem('jwt');
if(token == null){
  router.push('./')
}
else router.push('./');
</script>