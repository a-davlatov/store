import { useDrawerStore } from '@/store/drawerStore.js'
import { useProductsStore } from '@/store/productsStore'

export function useRefreshIsAddedValue() {
  const drawerStore = useDrawerStore()
  const productsStore = useProductsStore()
  productsStore.products = productsStore.products.map((product) => ({
    ...product,
    isAdded: drawerStore.cart.some((cartproduct) => cartproduct.id === product.id)
  }))
}