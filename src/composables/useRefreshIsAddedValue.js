import { useCartStore } from '@/store/cartStore.js'
import { useProductsStore } from '@/store/productsStore'

export function useRefreshIsAddedValue() {
  const cartStore = useCartStore()
  const productsStore = useProductsStore()
  productsStore.products = productsStore.products.map((product) => ({
    ...product,
    isAdded: cartStore.cart.some((cartproduct) => cartproduct.id === product.id)
  }))
}