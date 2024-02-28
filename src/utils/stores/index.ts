import { defineStore } from 'pinia'
import type { Product } from '@/utils/types/products'
import type { Order } from '@/utils/types/order'

interface CartState {
  cartItems: Product[]
  order: Order
}

export const useCartStore = defineStore({
  id: 'cart',
  state: (): CartState => ({
    cartItems: [],
    order: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
      cartItems: [],
      status: '',
      created_at: '',
      updated_at: ''
    }
  }),
  getters: {
    cartTotal: (state) => {
      return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    },
    cartLength: (state) => {
      return state.cartItems.length
    },
    isAdded:
      (state) =>
      (productId: number): boolean => {
        return state.cartItems.some((item) => item.id === productId)
      },
    getQuantity:
      (state) =>
      (productId: number): number => {
        const item = state.cartItems.find((item) => item.id === productId)
        return item ? item.quantity : 0
      }
  },
  actions: {
    addToCart(item: Product) {
      const isItemInCart = this.cartItems.find((cartItem) => cartItem.id === item.id)

      if (isItemInCart) {
        this.cartItems = this.cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      } else {
        this.cartItems = [...this.cartItems, { ...item, quantity: 1 }]
      }
    },
    removeFromCart(item: Product) {
      const isItemInCart = this.cartItems.find((cartItem) => cartItem.id === item.id)

      if (isItemInCart && isItemInCart.quantity === 1) {
        this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id)
      } else {
        this.cartItems = this.cartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
        )
      }
    },
    clearCart() {
      this.cartItems = []
    },
    setOrderData(newOrder: Order) {
      this.order = newOrder
    }
  }
})
