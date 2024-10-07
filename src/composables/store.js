import { reactive } from 'vue'

export const store = reactive({
  cart: [],
  products: [],
  drawerOpen: false,
  signedIn: false,
  userData: null,
  loading: false,
  errorText: '',
  successText: '',
  API_URL: 'https://3ca3b08ffb93c4a8.mokky.dev',
  filters: {
    sortBy: 'title',
    searchQuery: '',
    price: {
      from: 500,
      to: 999999,
    },
  },
  drawerToggle() {
    this.drawerOpen = !this.drawerOpen
  },
  clearMessages() {
    this.errorText = ''
    this.successText = ''
  },
})