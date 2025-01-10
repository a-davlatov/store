import axios from 'axios'
import { useAuthStore } from '@/store/authStore.js'

const API_URL = import.meta.env.VITE_API_URL

export function authUser() {
  const authStore = useAuthStore()
  axios.get(`${API_URL}/auth_me`, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function patchUser(userData) {
  const authStore = useAuthStore()
  return axios.patch(`${API_URL}/users/${authStore.data.id}`, userData, {
    headers: {
      'Authorization': `Bearer ${authStore.token}`
    }
  })
}

export function loginUser(data) {
  return axios.post(`${API_URL}/auth`, data)
}

export function registerUser(userData) {
  return axios.post(`${API_URL}/register`, userData)
}