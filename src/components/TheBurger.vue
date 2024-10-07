<script setup>

const model = defineModel()

</script>


<template>
  <button 
    class="burger btn-reset sm:hidden flex"
    type="button"
    id="burger"
    @click="model = !model"
  >
    <span class="burger__item">Menu</span>
  </button>
</template>

<style scoped>
.burger {
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
  position: relative;
}

.burger:focus {
  outline: none;
}

.burger__item {
  display: block;
  width: 25px;
  height: 2px;

  background-color: #333;

  font-size: 0;
  color: transparent;
}

.burger::before,
.burger::after {
  content: "";
  width: 100%;
  height: 2px;

  background-color: #333;

  position: absolute;
  left: 0;
  z-index: 1;
  transition: all .2s ease;
}

.burger::before {
  top: 7px;
}

.burger::after {
  bottom: 7px;
}
</style>