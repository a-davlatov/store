<script setup>
import { patchUser } from '@/api/user.js'
import { useAuthStore } from '@/store/authStore.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { onMounted, reactive, ref } from 'vue'

import ProfileAvatar from './ProfileAvatar.vue'
import ProfileMessages from './ProfileMessages.vue'

const authStore = useAuthStore()
const loadingStore = useIsLoadingStore()
const errorText = ref('')
const successText = ref('')

const userData = reactive({
	name: '',
	surname: '',
	email: '',
	phone: '',
})

const userPassword = reactive({
	newPassword: '',
	confirmPassword: '',
})

const patchUserData = async () => {
	errorText.value = ''
	successText.value = ''

	if (userPassword.newPassword !== '' && userPassword.confirmPassword !== '') {
		if (userPassword.newPassword !== userPassword.confirmPassword) {
			errorText.value = 'Пароли не совпадают'
			return
		}
		userData.password = userPassword.newPassword
	}

	try {
		loadingStore.loading = true
		const { data } = await patchUser(userData)
		const localData = JSON.parse(localStorage.getItem('user_data'))
		localData.data = data
		localStorage.setItem('user_data', JSON.stringify(localData))
		authStore.set(localData)
		successText.value = 'Ваши данные успешно изменены'
	} catch (error) {
		errorText.value = 'Ваши данные не были сохранены'
		console.error('Error: ', error.message)
	} finally {
		loadingStore.loading = false
		setTimeout(() => {
			errorText.value = ''
			successText.value = ''
		}, 5000)
	}
}

onMounted(() => {
	if (authStore.isAuth) {
		userData.name = authStore.data.name
		userData.surname = authStore.data.surname
		userData.email = authStore.data.email
		userData.phone = authStore.data.phone
	}
})

</script>

<template>
	<div class="my-10">
		<div class="container">
			<h1 class="text-2xl font-bold">Мои данные</h1>

			<div class="flex flex-col sm:flex-row mt-5 gap-8">
				<ProfileAvatar :user-name="authStore.data.name" />

				<form
					class="flex-1"
					@submit.prevent="patchUserData"
					method="POST"
				>
					<ProfileMessages
						:error-text="errorText"
						:success-text="successText"
					/>

					<div class="grid md:grid-cols-2 gap-4 mb-8">
						<div>
							<label
								for="name"
								class="block text-sm font-medium leading-6 text-gray-900"
							>
								Имя
							</label>
							<div class="mt-2">
								<input
									v-model="userData.name"
									id="name"
									name="name"
									type="text"
									required
									class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label
								for="surname"
								class="block text-sm font-medium leading-6 text-gray-900"
							>
								Фамилия
							</label>
							<div class="mt-2">
								<input
									v-model="userData.surname"
									id="surname"
									name="surname"
									type="text"
									required
									class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label
								for="email"
								class="block text-sm font-medium leading-6 text-gray-900"
							>
								Эл. адрес
							</label>
							<div class="mt-2">
								<input
									v-model="userData.email"
									id="email"
									name="email"
									type="email"
									autocomplete="email"
									required
									class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label
								for="phone"
								class="block text-sm font-medium leading-6 text-gray-900"
							>
								Телефон
							</label>
							<div class="mt-2">
								<input
									v-model="userData.phone"
									id="phone"
									name="phone"
									type="tel"
									required
									class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label
								for="newPassword"
								class="block text-sm font-medium leading-6 text-gray-900"
							>
								Новый пароль (не заполняйте, чтобы оставить прежний)
							</label>
							<div class="mt-2">
								<input
									v-model="userPassword.newPassword"
									id="newPassword"
									name="newPassword"
									type="password"
									autocomplete="off"
									class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
								/>
							</div>
						</div>

						<div>
							<label
								for="confirmPassword"
								class="block text-sm font-medium leading-6 text-gray-900"
							>
								Подтвердите новый пароль
							</label>
							<div class="mt-2">
								<input
									id="confirmPassword"
									name="confirmPassword"
									type="password"
									v-model="userPassword.confirmPassword"
									autocomplete="off"
									class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
								/>
							</div>
						</div>
					</div>

					<button
						:disabled="loadingStore.loading ? true : false"
						type="submit"
						class="w-full sm:max-w-40 text-center border transition border-black bg-white  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
					>
						{{ !loadingStore.loading ? 'Сохранить' : 'Загрузка' }}
					</button>
				</form>
			</div>
		</div>
	</div>
</template>