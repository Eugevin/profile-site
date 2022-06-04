<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['type', 'placeholder']);

const emit = defineEmits(['change']);
const input = ref('');

function changeHandler() {
  emit('change');
}

function inputHandler() {
  emit('change', { field: props.placeholder, value: input.value });  
}
</script>

<template>
  <button v-if="type === 'button'" @click="changeHandler">
    <slot />
  </button>
  <input v-else type="text" :placeholder="placeholder[0].toUpperCase() + placeholder.slice(1)" v-model="input" @input="inputHandler">
</template>

<style lang="scss">
input {
  font-family: "Poppins", "Arial", sans-serif;
  padding: 0.313rem 0;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.875rem;
  color: #A6A6A6;
  background: none;
  outline: none;
  border: none;
  border-bottom: 2px solid #666666;
  transition: .7s ease;

  &:hover, &:focus {
    color: #FFFFFF;
    border-bottom: 2px solid #FFFFFF;
  }
}

button {
  font-family: "Poppins", "Arial", sans-serif;
  display: block;
  padding: 0.625rem 1.25rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.625rem;
  text-align: center;
  color: #A6A6A6;
  background: none;
  outline: none;
  border: none;
  border-bottom: 2px solid #666666;
  transition: .7s ease;

  &:hover {
    color: #FFFFFF;
    border-bottom: 2px solid #FFFFFF;
  }
}
</style>
