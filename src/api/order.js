import axios from 'axios'
import { store } from '../composables/store.js'

export function postOrder(data) {
  return axios.post(`${store.API_URL}/orders`, data, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}

export function getOrders() {
  return axios.get(`${store.API_URL}/orders?user_id=${store.userData.data.id}&_select=-user,-user_id`, {
    headers: {
      'Authorization': `Bearer ${store.userData.token}`
    }
  })
}