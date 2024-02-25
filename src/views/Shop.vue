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
    <PaginatedItems :products="products" :productsPerPage="16" v-model:itemOffset="itemOffset" />
    <!-- Add the modal here to indicate that the item has been added to the cart -->
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
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

    const products = ref<Product[]>([])
    const itemOffset = ref(0)

    const fetchProduct = async () => {
      try {
        products.value = await api.getAllProducts()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    onMounted(async () => {
      try {
        await fetchProduct()
        console.log('productd', products.value)
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
