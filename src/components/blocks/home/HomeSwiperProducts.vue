<script setup>
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { onMounted } from 'vue'

import ProductCard from '@/components/products/ProductCard.vue'

import { getSaleProducts } from '@/api/products.js'
import { useAddToCart } from '@/composables/useAddToCart.js'
import { useAddToFavorites } from '@/composables/useAddToFavorites.js'
import { useFetchFavorites } from '@/composables/useFetchFavorites.js'
import { useRefreshIsAddedValue } from '@/composables/useRefreshIsAddedValue.js'
import { useRemoveFromFavorites } from '@/composables/useRemoveFromFavorites.js'
import { useCartStore } from '@/store/cartStore.js'
import { useProductsStore } from '@/store/productsStore'

const productsStore = useProductsStore()
const cartStore = useCartStore()

onMounted(async () => {
  productsStore.clear()
  try {
    const { data } = await getSaleProducts()
    productsStore.products = data
    useRefreshIsAddedValue()
    useFetchFavorites()
  } catch (error) {
    console.error('An error accured: ', error.message)
  }
})
</script>

<template>
	<div class="mt-8 sm:mt-10 sm:mb-20">
		<div class="container">
		  <h2 class="text-xl sm:text-2xl font-bold">Скидки</h2>

			<swiper
				class="swiper-sales mt-3 sm:mt-4"
				v-if="productsStore.products.length > 0"
				:slides-per-view="1"
				:space-between="0"
				:loop="true"
				:autoplay="{ delay: 5000 }"
				:breakpoints="{
					300: {
						slidesPerView: 2,
					},
					640: {
						slidesPerView: 3,
						spaceBetween: 5,
					},
					760: {
						slidesPerView: 4,
					},
					1000: {
						slidesPerView: 5,
					},
				}"
				:modules="[Autoplay]"
			>
				<swiper-slide
					v-for="product in productsStore.products"
					:key="product.id"
				>
					<ProductCard
						:title="product.title"
						:price="product.price"
						:old-price="product.oldPrice"
						:image-url="product.imageUrl"
						:is-added="product.isAdded"
						:is-favorite="product.isFavorite"
						@on-click-add="useAddToCart(product, cartStore.cart)"
						@add-to-favorites="useAddToFavorites(product)"
						@remove-from-favorites="useRemoveFromFavorites(product)"
					/>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>