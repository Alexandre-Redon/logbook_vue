import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Layout from './components/LayoutVue.vue'
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Shop from './views/Shop.vue'
import Cart from './views/CartView.vue'
import PrimeVue from 'primevue/config'

const app = createApp(App)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: '/shop', component: Shop },
      { path: '/cart', component: Cart }
      /*
      { path: '/product/:id', component: ProductDetails },
      { path: '/cart', component: Cart },
      { path: '/checkout', component: Checkout },
      { path: '/contact', component: Contact },
      { path: '/blog', component: Blog },
      { path: '*', component: ErrorPage },
      { path: '/success', component: SuccessPage },
      { path: '/cancel', component: CancelPage } */
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
