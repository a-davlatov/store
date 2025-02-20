<script setup>
import { loginUser } from '@/api/user.js'
import { useAuthStore } from '@/store/authStore.js'
import { useDrawerStore } from '@/store/drawerStore.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import FormTop from '@/components/blocks/form/FormTop.vue'

const drawerStore = useDrawerStore()
const authStore = useAuthStore()
const loadingStore = useIsLoadingStore()
const router = useRouter()
const errorText = ref('')

const userData = reactive({
  email: '',
  password: ''
})

const login = async () => {
  errorText.value = ''
  loadingStore.loading = true

  try {
    const data = {
      email: userData.email,
      password: userData.password
    }

    const response = await loginUser(data)
    localStorage.setItem('user_data', JSON.stringify(response.data))
    authStore.set(response.data)
    router.push('/')
  } catch (error) {
    if (error.message === 'Network Error') {
      errorText.value = 'Проверьте подключение к сети и попробуйте еще раз'
      console.error('An error accured: ', error.message)
      return
    }
    errorText.value = 'Неверный логин или пароль'
    console.error('An error accured: ', error.message)
  } finally {
    clearInputsVal()
    loadingStore.loading = false
  }
}

const clearInputsVal = () => {
  userData.email = ''
  userData.password = ''
}

onBeforeMount(() => {
  if (drawerStore.isOpen) drawerStore.toggle()
})

onMounted(() => {
  errorText.value = ''
  clearInputsVal()
})

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <FormTop
      title="Вход в аккаунт"
      :error-text="errorText"
    />

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        class="space-y-6"
        @submit.prevent="login"
        method="POST"
      >
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
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            Пароль
          </label>
          <div class="mt-2">
            <input
              v-model="userData.password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <button
            :disabled="loadingStore.loading ? true : false"
            type="submit"
            class="flex w-full justify-center border transition border-black bg-white  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
          >
            {{ !loadingStore.loading ? 'Войти' : 'Загрузка' }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Впервые здесь?
        <RouterLink
          to="/register"
          class="font-semibold leading-6 text-orange-400 hover:text-orange-600"
        >
          Зарегистрироваться
        </RouterLink>
      </p>
    </div>
  </div>
</template>