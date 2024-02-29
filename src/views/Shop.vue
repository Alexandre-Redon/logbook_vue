<template>
  <div class="shop">
    <article class="shop_accueil" :style="{ backgroundImage: `url(${background})` }">
      <h2>Shop</h2>
      <div class="shop_accueil_2">
        <router-link to="/">
          <p class="shop_accueil_text">Home &gt;</p>
        </router-link>
        <router-link to="/shop">
          <p class="shop_accueil_text">Shop</p>
        </router-link>
      </div>
    </article>
    <FilterSearch :totalProducts="products.length" />
    <PaginatedItems />
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from 'vue'
import FilterSearch from '@/components/FilterSearch.vue'
import PaginatedItems from '@/components/PaginatedItem.vue'
import { createApi } from '@/utils/context/api'
import background from '@/assets/shop_background.jpg'
import type { Product } from '@/utils/types/products'

export default {
  name: 'ShopVue',
  components: {
    FilterSearch,
    PaginatedItems
  },
  setup() {
    const api = createApi()

    const products = reactive<Product[]>([])
    const itemOffset = ref(0)

    const fetchProduct = async () => {
      try {
        var resProduct: Product[] = await api.getAllProducts()
        resProduct.forEach((product) => {
          products.push(product)
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(async () => {
      try {
        await fetchProduct()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })
    return {
      products,
      itemOffset,
      background
    }
  }
}
</script>

<style scoped>
@import '@/styles/shop.css';
</style>
