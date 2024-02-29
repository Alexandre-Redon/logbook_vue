<template>
  <div>
    <Products :currentProducts="paginatedProducts" />
    <Paginate
      :pageCount="Math.ceil(products.length / productsPerPage)"
      :clickHandler="handlePageClick"
      :prevLabel="'Previous'"
      :nextLabel="'Next'"
      :breakView="'...'"
      :pageRange="3"
      :marginPages="1"
      :containerClass="'pagination'"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import Products from '@/components/ProductVue.vue'
import Paginate from 'vuejs-paginate-next'
import type { Product } from '@/utils/types/products'
import { createApi } from '@/utils/context/api'

const products = reactive<Product[]>([])
const itemOffset = ref(0)
const productsPerPage = ref(12)
const api = createApi()

console.log('Initial products', products)

const endOffset = computed(() => itemOffset.value + productsPerPage.value)

console.log('products', products)
let paginatedProducts = computed(() => products.slice(itemOffset.value, endOffset.value))
console.log('paginated products', paginatedProducts.value)

const handlePageClick = (event: { page: number }) => {
  const newOffset = (event.page - 1) * productsPerPage.value
  itemOffset.value = newOffset

  // Recalculate paginatedProducts based on the new offset
  const newEndOffset = newOffset + productsPerPage.value
  paginatedProducts = computed(() => products.slice(newOffset, newEndOffset))

  console.log('new page products', paginatedProducts.value)
}

onMounted(() => {
  fetchProducts()
})

async function fetchProducts() {
  try {
    const data: Product[] = await api.getAllProducts()
    data.forEach((product) => {
      products.push(product)
    })
    console.log('Fetched new products', products)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>

<style scoped>
@import '@/styles/shop.css';
.pagination {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 0.5rem;
}

.pagination li {
  display: inline-block;
  padding: 0.5rem;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
