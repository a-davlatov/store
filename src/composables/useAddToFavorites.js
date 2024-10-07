import { store } from './store.js'
import { postFavorite } from '../api/favorites.js'

export async function useAddToFavorites(product) {

  if (!store.signedIn) {
    return
  }

  try {
    const data = {
      product_id: product.id,
      user_id: store.userData.data.id
    }

    const response = await postFavorite(data)
    product.isFavorite = true
    product.favoriteId = response.data.id
  } catch (error) {
    console.error('Error: ', error.message)
  }

}