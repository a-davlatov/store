<script setup>
import { onMounted, reactive, ref } from 'vue'
import { store } from '../composables/store.js'
import { registerUser } from '../api/user.js'

const userData = reactive({
  name: '',
  surname: '',
  email: '',
  phone: '',
  password: '',
})

const confirmPassword = ref('')

const loginOrAuth = async () => {
  store.clearMessages()

  if (userData.password !== confirmPassword.value) {
    store.errorText = 'Пароли не совпадают'
    return
  }

  try {
    store.loading = true
    await registerUser(userData)
    store.successText = 'Регистрация прошла успешно'
  } catch (error) {
    store.errorText = 'Пользователь уже существует'
    console.error('An error accured: ', error.message)
  } finally {
    clearInputsVal()
    store.loading = false
  }
}

const clearInputsVal = () => {
  userData.name = ''
  userData.surname = ''
  userData.email = ''
  userData.phone = ''
  userData.password = ''
  confirmPassword.value = ''
}

onMounted(() => {
  store.clearMessages()
  clearInputsVal()
})

</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-gray-900">Регистрация</h2>

      <div 
        v-if="store.errorText !== ''" 
        class="justify-center message mt-8 -mb-8 text-base font-bold text-red-500 flex items-center gap-2"
      >
        <i class="bi bi-x-octagon"></i>
        {{ store.errorText }}
      </div>
      <div 
        v-if="store.successText !== ''" 
        class="justify-center message mt-8 -mb-8 text-base font-bold text-lime-400 flex items-center gap-2"
      >
        <i class="bi bi-check-circle"></i>
        {{ store.successText }}
      </div>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
      <!-- Register form -->
      <form 
        @submit.prevent="loginOrAuth" 
        method="POST"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
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
                autocomplete="off" 
                required
                class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none" 
              />
            </div>
          </div>

          <div>
            <label 
              for="confirmPassword" 
              class="block text-sm font-medium leading-6 text-gray-900"
            >
            Подтвердите пароль
            </label>
            <div class="mt-2">
              <input 
                v-model="confirmPassword" 
                id="confirmPassword"
                name="confirmPassword" 
                type="password"
                autocomplete="off" 
                required
                class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none" 
              />
            </div>
          </div>
        </div>

        <div class="flex justify-center">
          <button 
            :disabled="store.loading ? true : false"
            type="submit"
            class="sm:w-full sm:max-w-sm text-center border transition border-black bg-white  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
          >
            {{ !store.loading ? 'Зарегистрироваться' : 'Загрузка' }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Уже есть аккаунт?
        <RouterLink 
          to="/login" 
          class="font-semibold leading-6 text-orange-400 hover:text-orange-600"
        >
        Войти
        </RouterLink>
      </p>
    </div>
  </div>
</template>