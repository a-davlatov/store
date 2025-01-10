import { getFavorites } from '../api/favorites.js'
import { useAuthStore } from '@/store/authStore.js'
import { useProductsStore } from '@/store/productsStore'

export async function useFetchFavorites() {
  const productsStore = useProductsStore()
  const authStore = useAuthStore()
  if (!authStore.isAuth) {
    return
  }

  try {
    const { data } = await getFavorites()
    productsStore.products = productsStore.products.map((product) => {
      const favorite = data.find(favorite => favorite.product_id === product.id)

      if (!favorite) {
        return product
      }

      return {
        ...product,
        isFavorite: true,
        favoriteId: favorite.id
      }
    })
  } catch (error) {
    console.error('Error: ', error.message)
  }
}