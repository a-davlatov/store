import 'bootstrap-icons/font/bootstrap-icons.min.css'
import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'
import { router } from './router/router.js'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueLazyLoad, {
  loading: '/preloader.gif',
  error: '/error.png',
  delay: 500
})
app.mount('#app')
