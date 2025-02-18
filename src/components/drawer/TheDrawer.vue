<script setup>
import { useAuthStore } from '@/store/authStore.js'
import { useCartStore } from '@/store/cartStore.js'
import { useDrawerStore } from '@/store/drawerStore.js'
import { computed, ref } from 'vue'
import { postOrder } from '../../api/order.js'
import DrawerHead from './DrawerHead.vue'
import DrawerInfoBlock from './DrawerInfoBlock.vue'
import DrawerItem from './DrawerItem.vue'

const cartStore = useCartStore()
const drawerStore = useDrawerStore()
const authStore = useAuthStore()

const totalPrice = computed(() => cartStore.cart.reduce((acc, item) => acc + (item.price * item.quantity), 0))
const orderCreated = ref(null)
const isOrderCreating = ref(false)

const removeFromCart = (item) => {
  cartStore.cart = cartStore.cart.filter((el) => el.id !== item.id)
}

const createOrder = async () => {
  
  if (!authStore.isAuth) {
    return;
  }

  isOrderCreating.value = true

  const D = new Date()
  const formattedDate = ('0' + D.getDate()).slice(-2) + '.' + ('0' + (D.getMonth() + 1)).slice(-2) + '.' + D.getFullYear()

  try {
    const orderData = {
      items: cartStore.cart,
      totalPrice: totalPrice.value,
      user_id: authStore.data.id,
      order_date: formattedDate
    }
    
    const { data } = await postOrder(orderData)
    cartStore.cart = []
    orderCreated.value = data.id
  } catch (error) {
    console.error('Error: ', error.message)
  } finally {
    isOrderCreating.value = false
  }
}

</script>

<template>
  <div 
    @click.self="drawerStore.toggle"
    class="fixed top-0 left-0 z-20 w-full h-full bg-black/70"
  >
    <div class="bg-white w-96 max-w-full h-full fixed right-0 top-0 z-20 p-5 sm:p-8 flex flex-col">
      <DrawerHead />

      <div 
        v-show="cartStore.cart.length > 0" 
        class="cart-items overflow-auto flex flex-1 flex-col gap-3"
      >
        <DrawerItem 
          v-for="item in cartStore.cart"
          :key="item.id"
          :image-url="item.imageUrl"
          :title="item.title"
          :price="item.price"
          :quantity="item.quantity"
          @remove-from-cart="removeFromCart(item)"
        />
      </div>

      <div 
        v-if="!authStore.isAuth && cartStore.cart.length > 0" 
        class="text-red-600 text-center mt-2"
      >
        Чтобы оформить заказ, нужно сначала <RouterLink class="underline hover:no-underline" to="/login">войти</RouterLink> на сайт.
      </div>

      <div 
        v-show="totalPrice" 
        class="flex flex-col gap-4 mt-7"
      >
        <div class="flex gap-2">
          <span>Итого:</span>
          <div class="flex-1 border-b border-dashed"></div>
          <b>{{ totalPrice }} руб.</b>
        </div>

        <button 
          class="mt-3 bg-black w-full py-3 disabled:bg-slate-400 text-white hover:bg-black/80 active:bg-black/70 transition"
          :disabled="isOrderCreating || !authStore.isAuth"
          @click="createOrder"
        >
          Оформить заказ
        </button>
      </div>

      <div 
        v-if="!totalPrice || orderCreated" 
        class="flex h-full items-center"
      >
        <DrawerInfoBlock
          v-if="!totalPrice && !orderCreated"
          title="Корзина пустая"
          description="Добавьте хотя бы один товар, чтобы сделать заказ."
          image-url="/empty.avif"
        />
        <DrawerInfoBlock
          v-if="orderCreated"
          title="Заказ оформлен!"
          :description="`Ваш заказ №${orderCreated}, скоро будет передан курьерской доставке`"
          image-url="/order-success-icon.png"
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