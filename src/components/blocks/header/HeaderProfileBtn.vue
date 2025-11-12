<script setup>
import IconPersonCircle from '@/components/icons/IconPersonCircle.vue'
import { useAuthStore } from '@/store/authStore.js'
import { useRouter } from 'vue-router'
const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
	authStore.clear()
	router.push('/login')
	localStorage.removeItem('user_data')
}
</script>

<template>
	<button
		type="button"
		class="relative flex items-center gap-2 hover:text-slate-400 transition profile-btn"
	>
		<IconPersonCircle class="text-xl sm:text-base" />
		<span class="hidden sm:block text-sm">Профиль</span>

		<div class="pt-10 absolute top-0 -right-16 z-20 profile-item invisible opacity-0 transition min-w-64">
			<div class="bg-white">
				<div class="flex items-center gap-2 p-3 profile-head">
					<div class="w-10 h-10 rounded-2xl bg-sky-200 flex items-center justify-center">
						<span class="text-2xl text-white">{{ authStore.data.name[0] }}</span>
					</div>
					<div>
						<div class="text-left text-base whitespace-nowrap">{{ authStore.data.name + ' ' +
							authStore.data.surname }}</div>
						<div class="text-left text-xs text-slate-500">{{ authStore.data.email }}</div>
					</div>
				</div>
				<ul class="list-reset py-3 border-t border-gray-200">
					<li>
						<RouterLink
							to="/orders"
							class="px-3 py-1 block text-left hover:bg-gray-100 hover:text-slate-400 transition"
						>
							Заказы</RouterLink>
					</li>
					<li>
						<RouterLink
							to="/profile"
							class="px-3 py-1 block text-left hover:bg-gray-100 hover:text-slate-400 transition"
						>
							Мои данные</RouterLink>
					</li>
					<li>
						<button
							type="button"
							@click="logout"
							class="w-full text-left px-3 py-1 block hover:bg-gray-100 hover:text-slate-400 transition"
						>
							Выйти</button>
					</li>
				</ul>
			</div>
		</div>
	</button>
</template>

<style>
.profile-item>div {
  box-shadow: 0 2px 8px #00000040;
}

.profile-btn:hover .profile-item {
  visibility: visible;
  opacity: 1;
  color: initial;
}

.profile-head {
  cursor: default;
}

@media (min-width: 640px) {
  .profile-item {
    left: -85px;
    right: unset;
  }
}
</style>