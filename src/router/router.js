import { useAuthStore } from '@/store/authStore.js'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/HomeView.vue')
  },
  {
    path: '/products/:category',
    name: 'category',
    component: () => import('@/pages/ProductsView.vue'),
  },
  {
    path: '/products',
    name: 'search',
    component: () => import('@/pages/ProductsView.vue'),
  },
  {
    path: '/login',
    component: () => import('@/pages/LoginView.vue')
  },
  {
    path: '/register',
    component: () => import('@/pages/RegisterView.vue')
  },
  {
    path: '/favorites',
    component: () => import('@/pages/FavoritesView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/orders',
    component: () => import('@/pages/OrdersView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    component: () => import('@/pages/ProfileView.vue'),
    meta: { requiresAuth: true }
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuth) return '/login'
})