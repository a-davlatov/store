import { deleteFavorite } from '../api/favorites.js'
import { useProductsStore } from '@/store/productsStore'

export async function useRemoveFromFavorites(product, isFavoritesPage) {
  const productsStore = useProductsStore()

  try {
    await deleteFavorite(product)
    product.isFavorite = false

    if (isFavoritesPage) {
      productsStore.products = productsStore.products.filter(favorite => favorite.favoriteId !== product.favoriteId)
    }
  } catch (error) {
    console.error('Error: ', error.message)
  }

}