import axios from 'axios'
import { useAuthStore } from '@/store/authStore.js'

const authStore = useAuthStore()
const API_URL = import.meta.env.VITE_API_URL

export function postFavorite(data) {
  return axios.post(`${API_URL}/favorites`, data, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function deleteFavorite(product) {
  return axios.delete(`${API_URL}/favorites/${product.favoriteId}`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function getFavoritesWithProducts() {
  return axios.get(`${API_URL}/favorites?user_id=${authStore.data.id}&_relations=products`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function getFavorites() {
  return axios.get(`${API_URL}/favorites?user_id=${authStore.data.id}`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}