<script setup lang="ts">
defineProps(['type']);
const emit = defineEmits(['change']);

function changeHandler(e: any) {
  emit('change');
}
</script>

<template>
  <button v-if="type === 'button'" @click="changeHandler">
    <slot />
  </button>
  <input v-else type="text">
</template>

<style lang="scss">
button {
  display: block;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  text-align: center;
  color: #A6A6A6;
  background: none;
  border-bottom: 2px solid #666666;
  transition: .7s ease;

  &:hover {
    color: #FFFFFF;
    border-bottom: 2px solid #FFFFFF;
  }
}
</style>
