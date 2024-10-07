<script setup>

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

import { onMounted } from 'vue'

import ProductCard from '../components/ProductCard.vue'

import { useAddToCart } from '../composables/useAddToCart.js'
import { useAddToFavorites } from '../composables/useAddToFavorites.js'
import { useRemoveFromFavorites } from '../composables/useRemoveFromFavorites.js'
import { useRefreshIsAddedValue } from '../composables/useRefreshIsAddedValue.js'
import { store } from '../composables/store.js'
import { useFetchFavorites } from '../composables/useFetchFavorites.js'
import { getSaleProducts } from '../api/products.js'

onMounted( async () => {
  store.products = []
  try {
    const { data } = await getSaleProducts()
    store.products = data
    useRefreshIsAddedValue()
    useFetchFavorites()
  } catch (error) {
    console.error('An error accured: ', error.message)
  }
})
</script>

<template>
  <div class="container">

    <swiper
      class="swiper-intro mt-5"
      :slides-per-view="1"
      :space-between="20"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      :modules="[Autoplay]"
    >
      <swiper-slide>
        <div class="relative max-h-full">
          <img class="w-full h-full" src="/hoodies/main.jpg" alt="hoodies">
          <RouterLink class="text-xs sm:text-base absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition" to="/products/hoodies">Перейти в каталог</RouterLink>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="relative max-h-full">
          <img class="w-full max-h-full" src="/sneakers/main.jpg" alt="sneakers">
          <RouterLink class="absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition" to="/products/sneakers">Перейти в каталог</RouterLink>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="relative max-h-full">
          <img class="w-full max-h-full" src="/caps/main.jpg" alt="caps">
          <RouterLink class="absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition" to="/products/caps">Перейти в каталог</RouterLink>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="relative max-h-full">
          <img class="w-full max-h-full" src="/panamas/main.jpg" alt="panamas">
          <RouterLink class="absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition" to="/products/panamas">Перейти в каталог</RouterLink>
        </div>
      </swiper-slide>
    </swiper>

    <h2 class="text-xl sm:text-2xl font-bold mt-8 sm:mt-10">Скидки</h2>

    <swiper
      class="swiper-sales mt-3 sm:mt-4 mb-20"
      v-if="store.products.length > 0"
      :slides-per-view="1"
      :space-between="5"
      :loop="true"
      :autoplay="{ delay: 5000 }"
      :breakpoints="{
        450: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
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
        v-for="product in store.products"
        :key="product.id"
      >
        <ProductCard
          :title="product.title" 
          :price="product.price"
          :old-price="product.oldPrice"
          :image-url="product.imageUrl"
          :is-added="product.isAdded"
          :is-favorite="product.isFavorite"
          @on-click-add="useAddToCart(product, store.cart)"
          @add-to-favorites="useAddToFavorites(product)"
          @remove-from-favorites="useRemoveFromFavorites(product)"
        />
      </swiper-slide>
    </swiper>

  </div>
</template>

<style>
.swiper-intro {
  height: 600px;
}

.swiper-intro .swiper-slide div::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, .5);
  transition: opacity .2s linear;
  opacity: 0;
}

.swiper-intro .swiper-slide div:hover::before,
.swiper-intro .swiper-slide div:hover a {
  opacity: 1;
}

.swiper-sales .product__card .add-to-cart {
  position: static;
  padding-right: 0;
  padding-left: 0;
}

.swiper-sales .product__card:hover {
  box-shadow: none;
}

@media (max-width: 992px) {
  .swiper-intro {
    height: auto;
  }
}
</style>