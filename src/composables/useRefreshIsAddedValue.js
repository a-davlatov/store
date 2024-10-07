import { store } from './store.js'

export function useRefreshIsAddedValue() {
  store.products = store.products.map((product) => ({
    ...product,
    isAdded: store.cart.some((cartproduct) => cartproduct.id === product.id)
  }))
}