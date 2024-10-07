<script setup>
import { onMounted, reactive } from 'vue'
import { store } from '../composables/store.js'
import { patchUser } from '../api/user.js'

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
  store.clearMessages()
  if (userPassword.newPassword !== '' || userPassword.confirmPassword !== '') {
    if (userPassword.newPassword !== userPassword.confirmPassword) {
      store.errorText = 'Пароли не совпадают'
      return
    }
    userData.password = userPassword.newPassword
  }

  try {
    store.loading = true
    const { data } = await patchUser(userData)
    const localData = JSON.parse(localStorage.getItem('userData'))
    localData.data = data
    localStorage.setItem('userData', JSON.stringify(localData))
    store.userData = JSON.parse(localStorage.getItem('userData'))
    store.successText = 'Ваши данные успешно изменены'
  } catch (error) {
    store.errorText = 'Ваши данные не были сохранены'
    console.error('Error: ', error.message)
  } finally {
    store.loading = false
    setTimeout(() => {
      store.clearMessages()
    }, 5000);
  }
}

onMounted(() => {
  if (store.signedIn) {
    userData.name = store.userData.data.name
    userData.surname = store.userData.data.surname
    userData.email = store.userData.data.email
    userData.phone = store.userData.data.phone
  }
})

</script>

<template>
  <div class="my-10">
    <div class="container">
      <h1 class="text-2xl font-bold">Мои данные</h1>

      <div class="flex flex-col sm:flex-row mt-5 gap-8">
        <div class="w-40 h-40 avatar bg-sky-200 flex items-center justify-center">
          <span class="text-6xl text-white">{{ store.userData.data.name[0] }}</span>
        </div>

        <form 
          class="flex-1" 
          @submit.prevent="patchUserData" 
          method="POST"
        >
          <div 
            v-if="store.errorText !== ''"
            class="justify-center message mb-8 text-base font-bold text-red-500 flex items-center gap-2"
          >
            <i class="bi bi-x-octagon"></i>
            {{ store.errorText }}
          </div>
          <div 
            v-if="store.successText !== ''"
            class="justify-center message mb-8 text-base font-bold text-lime-400 flex items-center gap-2"
          >
            <i class="bi bi-check-circle"></i>
            {{ store.successText }}
          </div>

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
                  v-model="userPassword.confirmPassword" autocomplete="off"
                  class="px-3.5 block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none" 
                />
              </div>
            </div>
          </div>

          <button 
            :disabled="store.loading ? true : false" 
            type="submit"
            class="w-full sm:max-w-40 text-center border transition border-black bg-white  px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2"
          >
            {{ !store.loading ? 'Сохранить' : 'Загрузка' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  border-radius: 50px;
}
</style>