<template>
  <div>
    <HeaderVue />
    <router-view />
    <FooterVue />
  </div>
</template>

<script lang="ts">
import HeaderVue from '@/components/HeaderVue.vue' // Remplacez le chemin par le bon chemin vers votre composant Header
import FooterVue from '@/components/FooterVue.vue' // Remplacez le chemin par le bon chemin vers votre composant Footer

export default {
  components: {
    HeaderVue,
    FooterVue
  }
}
</script>

<style scoped></style>
