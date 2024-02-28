<template>
  <div class="products-list">
    <div v-for="product in currentProducts" :key="product.id">
      <div class="shop-products-card">
        <router-link :to="`/product/${product.id}`">
          <img :src="product.images[0]" :alt="product.title" class="shop-products-card-img" />
        </router-link>
        <div class="shop-products-card-text">
          <p class="shop-products-card-text-title">
            {{ truncateText(product.title, 15) }}
          </p>
          <p class="shop-products-card-text-price">{{ product.price }} €</p>
        </div>
        <button
          :class="{ 'added-to-cart': isAdded(product.id) }"
          class="shop-products-card-btn"
          @click="handleAddToCart(product)"
        >
          {{
            isAdded(product.id) ? 'Added' + ' x ' + getProductsQuantity(product.id) : 'Add to cart'
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useCartStore } from '@/utils/stores/index'
import type { Product } from '@/utils/types/products'

const showCheckmark = ref(false)

const { currentProducts } = defineProps(['currentProducts'])
const cartStore = useCartStore()

const truncateText = (text: string, length: number): string => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const isAdded = (productId: number): boolean => {
  showCheckmark.value = false
  setTimeout(() => {
    showCheckmark.value = true
  }, 1000)
  return cartStore.isAdded(productId)
}

const getProductsQuantity = (productId: number): number => {
  return cartStore.getQuantity(productId)
}

const handleAddToCart = (product: Product): void => {
  cartStore.addToCart(product)
}
</script>

<style scoped>
@import '@/styles/shop.css';
</style>
