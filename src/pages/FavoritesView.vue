<script setup>
import { onMounted } from 'vue'

import ProductCard from '../components/ProductCard.vue'
import EmptyInfoBlock from '../components/EmptyInfoBlock.vue'

import { useAddToCart } from '../composables/useAddToCart.js'
import { useRemoveFromFavorites } from '../composables/useRemoveFromFavorites.js'
import { useRefreshIsAddedValue } from '../composables/useRefreshIsAddedValue.js'
import { store } from '../composables/store.js'
import { getFavoritesWithProducts } from '../api/favorites.js'

onMounted( async () => {
  store.products = []
  if (store.signedIn) {
    store.loading = true

    try {
      const { data } = await getFavoritesWithProducts()
      store.products = data.map((favorite) => {
        favorite.product.favoriteId = favorite.id
        return favorite.product
      })
      
      useRefreshIsAddedValue()
    } catch (error) {
      console.error('Error: ', error.message)
    } finally {
      store.loading = false
    }
  }
})

</script>

<template>
  <div class="mt-10 relative">
  <div class="container">
    <div class="h-fit">
      <h1 
        v-if="store.products.length > 0 || store.loading" 
        class="text-2xl font-bold"
      >
        Избранное
      </h1>

      <EmptyInfoBlock 
        v-else
        title="В избранном пусто"
        sub-title="Вы ничего не добавляли в Избранное"
      />

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-1 -mx-2 mt-5">
        <ProductCard 
          v-for="product in store.products" 
          :key="product.id"
          :title="product.title" 
          :price="product.price"
          :old-price="product.oldPrice"
          :image-url="product.imageUrl"
          :is-added="product.isAdded"
          :is-favorite="true"
          @on-click-add="useAddToCart(product, store.cart)"
          @remove-from-favorites="useRemoveFromFavorites(product, true)"
        />
      </div>
    </div>
  </div>
  </div>
</template>