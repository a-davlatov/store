import { createWebHistory , createRouter } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../pages/HomeView.vue') },
  { path: '/products/:category', component: () => import('../pages/ProductsView.vue'), name: 'category' },
  { path: '/products', component: () => import('../pages/ProductsView.vue'), name: 'search' },
  { path: '/login', component: () => import('../pages/LoginView.vue') },
  { path: '/register', component: () => import('../pages/RegisterView.vue') },
  { path: '/favorites', component: () => import('../pages/FavoritesView.vue') },
  { path: '/orders', component: () => import('../pages/OrdersView.vue') },
  { path: '/profile', component: () => import('../pages/ProfileView.vue') },
]

export const router = createRouter({
  history: createWebHistory ('/store'),
  routes
})