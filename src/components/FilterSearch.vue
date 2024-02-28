<template>
  <article class="filter-search">
    <p class="filter-search-bar-text">
      Showing {{ startItem }} - {{ endItem }} of {{ totalProducts }} results
    </p>
    <div class="filter-search-bar-input">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search..."
        class="filter-search-bar-input-text"
      />
      <button @click="search" class="filter-search-bar-input-btn">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import { ref, watch } from 'vue'

export default {
  props: {
    totalProducts: Number
  },
  setup(props) {
    const startItem = ref(1)
    const endItem = ref(16) // Change this to the initial value based on your logic
    const searchQuery = ref('')

    // Watch for changes in searchQuery and update the displayed range accordingly
    watch(searchQuery, () => {
      startItem.value = 1 // Reset to the first item when search changes
      endItem.value = 16 // Update this based on your logic
    })

    const search = () => {
      // Implement your search logic here
      // You can use the searchQuery value to filter the products
    }

    return {
      startItem,
      endItem,
      searchQuery,
      search
    }
  }
}
</script>

<style scoped>
@import '@/styles/shop.css';
</style>
