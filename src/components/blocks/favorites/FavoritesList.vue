<script setup>
import { onMounted } from 'vue'

import ProductCard from '@/components/blocks/products/ProductCard.vue'
import EmptyInfoBlock from '@/components/EmptyInfoBlock.vue'

import { getFavoritesWithProducts } from '@/api/favorites.js'
import { useAddToCart } from '@/composables/useAddToCart.js'
import { useRefreshIsAddedValue } from '@/composables/useRefreshIsAddedValue.js'
import { useRemoveFromFavorites } from '@/composables/useRemoveFromFavorites.js'
import { useDrawerStore } from '@/store/drawerStore.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { useProductsStore } from '@/store/productsStore'

const productsStore = useProductsStore()
const drawerStore = useDrawerStore()
const loadingStore = useIsLoadingStore()

onMounted(async () => {
  productsStore.clear()
  loadingStore.loading = true

  try {
    const { data } = await getFavoritesWithProducts()
    productsStore.products = data.map((favorite) => {
      favorite.product.favoriteId = favorite.id
      return favorite.product
    })

    useRefreshIsAddedValue()
  } catch (error) {
    console.error('Error: ', error.message)
  } finally {
    loadingStore.loading = false
  }
})
</script>

<template>
  <section class="mt-5 sm:mt-10 relative">
    <div class="container">
      <div class="h-fit">
        <h1
          v-if="productsStore.products.length > 0 || loadingStore.loading"
          class="text-xl sm:text-2xl font-bold"
        >
          Избранное
        </h1>

        <EmptyInfoBlock
          v-else
          title="В избранном пусто"
          sub-title="Вы ничего не добавляли в Избранное"
        />

        <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-1 -mx-2 mt-5">
          <ProductCard
            v-for="product in productsStore.products"
            :key="product.id"
            :title="product.title"
            :price="product.price"
            :old-price="product.oldPrice"
            :image-url="product.imageUrl"
            :is-added="product.isAdded"
            :is-favorite="true"
            @on-click-add="useAddToCart(product, drawerStore.cart)"
            @remove-from-favorites="useRemoveFromFavorites(product, true)"
          />
        </ul>
      </div>
    </div>
  </section>
</template>