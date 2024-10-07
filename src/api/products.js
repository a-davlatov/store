import axios from 'axios'
import { store } from '../composables/store.js'

export function getSaleProducts() {
  return axios.get(`${store.API_URL}/products?oldPrice=*`)
}

export function getProducts(params) {
  return axios.get(`${store.API_URL}/products`, {
    params
  })
}