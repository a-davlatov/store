import { postFavorite } from '../api/favorites.js'
import { useAuthStore } from '@/store/authStore.js'

const authStore = useAuthStore()

export async function useAddToFavorites(product) {
  if (!authStore.isAuth) {
    return
  }

  try {
    const data = {
      product_id: product.id,
      user_id: authStore.data.id
    }

    const response = await postFavorite(data)
    product.isFavorite = true
    product.favoriteId = response.data.id
  } catch (error) {
    console.error('Error: ', error.message)
  }
}