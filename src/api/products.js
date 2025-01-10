import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export function getSaleProducts() {
  return axios.get(`${API_URL}/products?oldPrice=*`)
}

export function getProducts(params) {
  return axios.get(`${API_URL}/products`, {
    params
  })
}