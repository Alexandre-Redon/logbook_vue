<template>
  <div class="Home">
    <article class="promo" :style="{ backgroundImage: `url(${background})` }">
      <div class="promo-content">
        <h2 class="promo-content-title">New Promo</h2>
        <p>
          Les soldes sont de retour ! Profitez de -50% sur tout le site avec le code promo : ALEX50
          N'hésitez pas à nous contacter pour plus d'informations.
        </p>
        <router-link to="/shop" class="btn-promo">Buy Now</router-link>
      </div>
    </article>
    <section class="categories">
      <h2 class="categories-title">Browse The Range</h2>
      <div class="categories-list">
        <router-link
          :to="`/shop/productsDetails/${category}`"
          v-for="category in categories.slice(0, 8)"
          :key="category"
          class="categories-list-item"
        >
          <img :src="getCategoryImage(category)" alt="" class="categories-list-item-img" />
          <p class="category-name">
            {{ category ? category.charAt(0).toUpperCase() + category.slice(1) : null }}
          </p>
        </router-link>
      </div>
    </section>
    <section class="products">
      <h2 class="products-title">Our Products</h2>
      <div class="products-list">
        <router-link
          :to="`/shop/productsDetails/${product.category}`"
          v-for="product in products.slice(0, showMore)"
          :key="product.id"
          class="products-list-item"
        >
          <img :src="product.images[0]" alt="" class="products-list-item-img" />
          <p class="products-list-item-title">
            {{ truncateText(product.title, 15) }}
          </p>
          <p class="products-list-item-price">{{ product.price }}€</p>
        </router-link>
        <button class="btn-products" @click="() => showMoreProducts()">See More</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { createApi } from '@/utils/context/api'
import { ref, onMounted, reactive } from 'vue'
import background from '@/assets/background3.jpg'
import { data } from '@/utils/data/data'
import type { Product } from '@/utils/types/products'

export default {
  name: 'HomeVue',
  setup() {
    const api = createApi()

    let products = reactive<Product[]>([])
    let categories = reactive<string[]>([])

    const fetchProducts = async () => {
      try {
        var resProduct: Product[] = await api.getAllProducts()
        resProduct.forEach((product) => {
          products.push(product)
        })
        var resCate: string[] = await api.getCategories()
        resCate.forEach((category) => {
          categories.push(category)
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    const showMore = ref(12)

    const getCategoryImage = (category: string) => {
      const categoryImg = data.find((img) => img.name === category)
      return categoryImg ? categoryImg.img : ''
    }

    const truncateText = (text: string, length: number) => {
      return text.length > length ? text.substring(0, length) + '...' : text
    }

    const showMoreProducts = () => {
      showMore.value += 4
    }

    onMounted(async () => {
      try {
        await fetchProducts()
        /* console.log('productd', products.value) */
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    })

    return {
      products,
      categories,
      showMore,
      showMoreProducts,
      getCategoryImage,
      truncateText,
      background
    }
  }
}
</script>

<style scoped>
@import '@/styles/home.css';
</style>
