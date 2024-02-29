<template>
  <router-view />
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useCartStore } from './utils/stores'

onBeforeMount(() => {
  useCartStore().loadCartFromLocalStorage()
})
</script>

<style scoped>
@import '@/styles/app.css';
</style>
