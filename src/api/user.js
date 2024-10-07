import axios from 'axios'
import { store } from '../composables/store.js'

export function authUser() {
  axios.get(`${store.API_URL}/auth_me`, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}

export function patchUser(userData) {
  return axios.patch(`${store.API_URL}/users/${store.userData.data.id}`, userData, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}

export function loginUser(data) {
  return axios.post(`${store.API_URL}/auth`, data)
}

export function registerUser(userData) {
  return axios.post(`${store.API_URL}/register`, userData)
}