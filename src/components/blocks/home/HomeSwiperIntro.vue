<script setup>
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
</script>

<template>
	<div class="mt-5">
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
					<div class="relative h-full flex items-center justify-center">
						<img
							class="w-full"
							v-lazy="{ src: './hoodies/main.jpg', loading: '/store/hoodies/main.jpg' }"
							alt="hoodies"
						>
						<RouterLink
							class="text-xs sm:text-base absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition"
							to="/products/hoodies"
						>Перейти в каталог</RouterLink>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="relative h-full flex items-center justify-center">
						<img
							class="w-full"
							v-lazy="{ src: './sneakers/main.jpg', loading: '/store/preloader_sm.gif' }"
							alt="sneakers"
						>
						<RouterLink
							class="absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition"
							to="/products/sneakers"
						>Перейти в каталог</RouterLink>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="relative h-full flex items-center justify-center">
						<img
							class="w-full"
							v-lazy="{ src: './caps/main.jpg', loading: '/store/preloader_sm.gif' }"
							alt="caps"
						>
						<RouterLink
							class="absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition"
							to="/products/caps"
						>Перейти в каталог</RouterLink>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="relative h-full flex items-center justify-center">
						<img
							class="w-full"
							v-lazy="{ src: './panamas/main.jpg', loading: '/store/preloader_sm.gif' }"
							alt="panamas"
						>
						<RouterLink
							class="absolute bottom-5 right-5 z-10 opacity-0 mt-3 bg-black p-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition"
							to="/products/panamas"
						>Перейти в каталог</RouterLink>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</template>

<style scoped>
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

.swiper-intro img[lazy="loading"],
.swiper-intro img[lazy="error"] {
  width: auto;
}

.swiper-intro .swiper-slide:first-child img[lazy="loading"] {
  width: 100%;
}

@media (max-width: 992px) {
  .swiper-intro {
    height: auto;
  }
}
</style>