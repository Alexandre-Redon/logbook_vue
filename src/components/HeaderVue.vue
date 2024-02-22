<template>
  <nav class="navbar">
    <img src="@/assets/logo2.jpg" alt="logo" class="logo" />
    <div class="item">
      <router-link to="/" class="desktopMenuItemListItem">Home</router-link>
      <router-link to="/shop" class="desktopMenuItemListItem">Shop</router-link>
      <router-link to="/blog" class="desktopMenuItemListItem">Blog</router-link>
      <router-link to="/contact" class="desktopMenuItemListItem">Contact</router-link>
    </div>
    <div class="item">
      <img src="@/assets/user.png" class="itemNav" />
      <img src="@/assets/search-interface-symbol.png" class="itemNav" />
      <img src="@/assets/heart.png" class="itemNav" />
      <router-link to="/cart" class="desktopMenuItemListItem">
        <img src="@/assets/shopping-cart.png" class="itemNav" alt="Panier" />
        <span v-if="cartTotalLength > 0" class="cartItemCount">{{ cartTotalLength }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useCartStore } from '@/utils/stores/index'

export default {
  name: 'HeaderVue',
  setup() {
    const cartStore = useCartStore()
    const cartTotalLength = computed(() => cartStore.cartLength)

    return {
      cartTotalLength
    }
  }
}
</script>

<style scoped>
/* Importez le fichier CSS si nécessaire */
@import '@/styles/home.css';

/* Vos styles ici */
</style>
