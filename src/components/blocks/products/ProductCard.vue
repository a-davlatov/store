<script setup>
import { useAuthStore } from '@/store/authStore.js'

const authStore = useAuthStore()

defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  oldPrice: Number,
  isAdded: Boolean,
  isFavorite: Boolean,
})

</script>

<template>
  <div class="product__card relative sm:hover:shadow-2xl p-2 h-full transition flex flex-col">
    <div class="product__card-img w-full">
      <img
        class="w-full"
        v-lazy="{ src: imageUrl }"
        :alt="title"
      >
      <div
        v-if="oldPrice"
        class="absolute top-0 left-0 bg-orange-500 p-1.5 sm:p-2 rounded-full text-sm text-white font-medium"
      >
        Sale
      </div>
      <button
        class="icon-heart absolute top-5 right-5 hover:text-orange-400 transition sm:text-xl"
        @click="isFavorite ? $emit('removeFromFavorites') : $emit('addToFavorites')"
      >
        <i :class="!isFavorite ? 'bi bi-heart' : 'bi bi-heart-fill text-red-500'"></i>
      </button>

      <div
        v-show="!authStore.isAuth"
        class="product-prompt absolute opacity-0 invisible transition top-5 right-12 text-xs text-white px-2 py-1 rounded bg-black/60"
      >
        Войдите сначала на сайт
      </div>
    </div>
    <div class="flex items-end gap-2">
      <div
        v-if="oldPrice"
        class="text-sm sm:text-base text-slate-400 my-1 line-through"
      >
        {{ oldPrice }} ₽
      </div>
      <div class="sm:text-lg font-bold my-1">{{ price }} ₽</div>
    </div>
    <div class="text-sm flex-1">{{ title }}</div>
    <div class="mt-2 opacity-0 add-to-cart absolute z-20 bg-white start-0 end-0 p-2 transition">
      <button
        class="py-1 text-sm px-5 rounded hover:bg-gray-800 bg-black text-white transition w-full"
        @click="$emit('onClickAdd')"
      >
        {{ !isAdded ? 'В корзину' : 'Добавить еще' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.swiper-sales .product__card .add-to-cart {
  position: static;
  padding-right: 0;
  padding-left: 0;
}

.swiper-sales .product__card:hover {
  box-shadow: none;
}

.product__card .add-to-cart {
  top: 97%;
  visibility: hidden;
}

.product__card:hover .add-to-cart {
  opacity: 1;
  visibility: visible;
}

.icon-heart:hover {
  animation: heartbeat .8s infinite;
}

@keyframes heartbeat {
  20% {
    transform: scale(.9);
  }

  40% {
    transform: scale(1);
  }
}

.icon-heart:hover+.product-prompt {
  opacity: 1;
  visibility: visible;
}

@media (max-width: 640px) {
  .product__card .add-to-cart {
    padding: 0;
    position: static;
    opacity: 1;
    visibility: visible;
  }
}
</style>