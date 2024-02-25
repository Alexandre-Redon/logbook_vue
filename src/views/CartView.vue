<template>
  <section class="cart">
    <article class="shop_accueil" :style="{ backgroundImage: `url(${background})` }">
      <h2>Cart</h2>
      <div class="shop_accueil_2">
        <router-link to="/">
          <p class="shop_accueil_text">Home &gt;</p>
        </router-link>
        <router-link to="/cart">
          <p class="shop_accueil_text">Cart</p>
        </router-link>
      </div>
    </article>
    <article class="cart_container">
      <div class="cart-product-colomn">
        <ul class="cart-colomn-template">
          <li class="colomn-template">Product</li>
          <li class="colomn-template">Price</li>
          <li class="colomn-template">Quantity</li>
          <li class="colomn-template">Subtotal</li>
          <li class="colomn-template"></li>
        </ul>
        <div v-for="(item, key) in cartItems" :key="key">
          <div class="cart_item">
            <p class="text-image-item">
              <img :src="item.images[0]" class="item-img" :alt="item.title" />
              {{ item.title }}
            </p>
            <p>{{ item.price }}</p>
            <p>{{ item.quantity }}</p>
            <p>{{ item.price * item.quantity }} €</p>
            <div class="add-remove-cart">
              <button class="button-more-less" @click="addToCart(item)">+</button>
              <p>{{ item.quantity }}</p>
              <button class="button-more-less" @click="removeFromCart(item)">-</button>
            </div>
          </div>
        </div>
      </div>
      <div class="cart_total">
        <div class="cart-area">
          <h3 class="cart-total-title">Cart Totals</h3>
          <div class="cart-total-totalprice">
            <p class="cart-total-total">Total</p>
            <p class="cart-total-price">{{ getCartTotal }} €</p>
          </div>
          <router-link class="cart-total-checkout" to="/checkout">
            <p>Check Out</p>
          </router-link>
          <button class="cart-total-clear" @click="clearCart()">Clear Cart</button>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/utils/stores/index'
import background from '@/assets/shop_background.jpg'
import type { Product } from '@/utils/types/products'

const cartItems = useCartStore().cartItems

console.log('Initial cart items', cartItems)

const addToCart = (item: Product): void => {
  useCartStore().addToCart(item)
}

const removeFromCart = (item: Product): void => {
  useCartStore().removeFromCart(item)
}

const getCartTotal = computed(() => useCartStore().cartTotal)

const clearCart = (): void => {
  useCartStore().clearCart()
}

const router = useRouter()

onMounted(() => {
  if (cartItems.length === 0) {
    alert('Your cart is empty ! You will be redirected to the shop page.')
    router.push('/shop')
  }
})
</script>

<style scoped>
@import '@/styles/cart.css';
@import '@/styles/shop.css';
</style>
