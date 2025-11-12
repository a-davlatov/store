<script setup>
import { postOrder } from '@/api/order.js'
import { useRefreshIsAddedValue } from '@/composables/useRefreshIsAddedValue.js'
import { useAuthStore } from '@/store/authStore.js'
import { useDrawerStore } from '@/store/drawerStore.js'
import { computed, onMounted, ref, watch } from 'vue'
import DrawerHead from './DrawerHead.vue'
import DrawerInfoBlock from './DrawerInfoBlock.vue'
import DrawerItem from './DrawerItem.vue'

const drawerStore = useDrawerStore()
const authStore = useAuthStore()

const totalPrice = computed(() => drawerStore.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0))
const isOrderCreating = ref(false)

const removeFromCart = (item) => {
  drawerStore.cart = drawerStore.cart.filter((el) => el.id !== item.id)
}

const createOrder = async () => {
  if (!authStore.isAuth) return

  const D = new Date()
  const formattedDate = ('0' + D.getDate()).slice(-2) + '.' + ('0' + (D.getMonth() + 1)).slice(-2) + '.' + D.getFullYear()

  try {
    isOrderCreating.value = true
    const orderData = {
      items: drawerStore.cart,
      totalPrice: totalPrice.value,
      user_id: authStore.data.id,
      order_date: formattedDate
    }
    
    const { data } = await postOrder(orderData)
    drawerStore.cart = []
    drawerStore.orderCreated = data.id
  } catch (error) {
    console.error('Error: ', error.message)
  } finally {
    isOrderCreating.value = false
  }
}

onMounted(() => {
  const localCart = localStorage.getItem('cart')
  if (localCart) drawerStore.cart = JSON.parse(localCart)
})

watch(() => drawerStore.cart, () => {
  localStorage.setItem('cart', JSON.stringify(drawerStore.cart))
  useRefreshIsAddedValue()
},
{ deep: true })

</script>

<template>
  <div 
    @click.self="drawerStore.toggle"
    class="fixed top-0 left-0 z-20 w-full h-full bg-black/70"
  >
    <div class="bg-white w-96 max-w-full h-full fixed right-0 top-0 z-20 p-4 sm:p-8 flex flex-col">
      <DrawerHead />

      <div 
        v-show="drawerStore.cart.length > 0" 
        class="cart-items overflow-auto flex flex-1 flex-col gap-3"
      >
        <DrawerItem 
          v-for="item in drawerStore.cart"
          :key="item.id"
          :image-url="item.imageUrl"
          :title="item.title"
          :price="item.price"
          :quantity="item.quantity"
          @remove-from-cart="removeFromCart(item)"
        />
      </div>

      <div 
        v-if="!authStore.isAuth && drawerStore.cart.length > 0" 
        class="text-red-600 text-center mt-2"
      >
        Чтобы оформить заказ, нужно сначала <RouterLink class="underline hover:no-underline" to="/login">войти</RouterLink> на сайт.
      </div>

      <div
        v-show="totalPrice" 
        class="flex flex-col gap-4 sm:gap-5 mt-7"
      >
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <strong>{{ totalPrice }} руб.</strong>
        </div>

        <button 
          class="bg-black w-full py-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition"
          :disabled="isOrderCreating || !authStore.isAuth"
          @click="createOrder"
        >
          {{ isOrderCreating ? 'Загрузка...' : 'Оформить заказ' }}
        </button>
      </div>

      <div 
        v-if="!totalPrice || drawerStore.orderCreated" 
        class="flex h-full items-center"
      >
        <DrawerInfoBlock
          v-show="!totalPrice && !drawerStore.orderCreated"
          title="Корзина пустая"
          description="Добавьте хотя бы один товар, чтобы сделать заказ."
          image-url="/empty.avif"
          width="1000"
          height="819"
        />
        <DrawerInfoBlock
          v-show="drawerStore.orderCreated"
          title="Заказ оформлен!"
          :description="`Ваш заказ №${drawerStore.orderCreated}, скоро будет передан курьерской доставке`"
          image-url="/order-success-icon.png"
          width="166"
          height="292"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
  .cart-items::-webkit-scrollbar {
    width: 8px;
    height: 15px;
  }

  .cart-items::-webkit-scrollbar-thumb {
    background: #333;
  }

  .router-link-active.router-link-exact-active {
    color: inherit;
    text-decoration: none;
    cursor: auto;
  }
</style>