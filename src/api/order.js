import axios from 'axios'
import { useAuthStore } from '@/store/authStore.js'

const API_URL = import.meta.env.VITE_API_URL

export function postOrder(data) {
  const authStore = useAuthStore()
  return axios.post(`${API_URL}/orders`, data, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function getOrders() {
  const authStore = useAuthStore()
  return axios.get(`${API_URL}/orders?user_id=${authStore.data.id}&_select=-user,-user_id`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}