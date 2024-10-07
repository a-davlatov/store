import { deleteFavorite } from '../api/favorites.js'
import { store } from './store.js'

export async function useRemoveFromFavorites(product, isFavoritesPage) {

  try {
    await deleteFavorite(product)
    product.isFavorite = false

    if (isFavoritesPage) {
      store.products = store.products.filter(favorite => favorite.favoriteId !== product.favoriteId)
    }
  } catch (error) {
    console.error('Error: ', error.message)
  }

}