import './assets/main.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'

import { createApp } from 'vue'
import { router } from './router/router.js'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(VueLazyLoad)
app.mount('#app')
