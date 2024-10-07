import { getFavorites } from '../api/favorites.js'
import { store } from '../composables/store.js'

export async function useFetchFavorites() {
  if (!store.userData) {
    return
  }

  try {
    const { data } = await getFavorites()
    store.products = store.products.map((product) => {
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