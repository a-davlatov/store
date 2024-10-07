import axios from 'axios'
import { store } from '../composables/store.js'

export function postFavorite(data) {
  return axios.post(`${store.API_URL}/favorites`, data, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}

export function deleteFavorite(product) {
  return axios.delete(`${store.API_URL}/favorites/${product.favoriteId}`, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}

export function getFavoritesWithProducts() {
  return axios.get(`${store.API_URL}/favorites?user_id=${store.userData.data.id}&_relations=products`, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}

export function getFavorites() {
  return axios.get(`${store.API_URL}/favorites?user_id=${store.userData.data.id}`, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}