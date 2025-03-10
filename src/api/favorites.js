import { useAuthStore } from '@/store/authStore.js'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export function postFavorite(data) {
  const authStore = useAuthStore()
  return axios.post(`${API_URL}/favorites`, data, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function deleteFavorite(product) {
  const authStore = useAuthStore()
  return axios.delete(`${API_URL}/favorites/${product.favoriteId}`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function getFavoritesWithProducts() {
  const authStore = useAuthStore()
  return axios.get(`${API_URL}/favorites?user_id=${authStore.data.id}&_relations=products`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function getFavorites() {
  const authStore = useAuthStore()
  return axios.get(`${API_URL}/favorites?user_id=${authStore.data.id}`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}