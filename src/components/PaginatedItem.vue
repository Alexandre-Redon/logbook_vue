<template>
  <div>
    <Products :currentProducts="paginatedProducts" />
    <Paginator
      class="pagination"
      :totalRecords="products.length"
      :rows="productsPerPage"
      @onPageChange="handlePageClick"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Products from '@/components/ProductVue.vue'
import Paginator from 'primevue/paginator'
import type { Product } from '@/utils/types/products'
import { createApi } from '@/utils/context/api'

const products = ref<Product[]>([])
const itemOffset = ref(0)
const productsPerPage = ref(12)
const api = createApi()

console.log('Initial products', products)

const endOffset = computed(() => itemOffset.value + productsPerPage.value)

const paginatedProducts = computed(() => products.value.slice(itemOffset.value, endOffset.value))

const handlePageClick = (event: { page: number }) => {
  const newOffset = (event.page - 1) * productsPerPage.value
  itemOffset.value = newOffset
  console.log('Page changed. New offset:', newOffset)
}

onMounted(() => {
  fetchProducts()
})

// Example function to fetch products
async function fetchProducts() {
  try {
    const data = await api.getAllProducts()
    products.value = data
    console.log('Fetched new products', products.value)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>

<style scoped>
@import '@/styles/shop.css';
</style>
