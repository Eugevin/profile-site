<script setup lang="ts">
import { inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const anime: any = inject('anime');

onMounted(() => {
  anime({
    targets: '.error img',
    opacity: [0, 1],
    translateY: ['10%', 0],
    easing: 'easeInOutQuart',
    duration: 2000
  })
  anime({
    targets: '.error h1',
    opacity: [0, 1],
    translateY: ['10%', 0],
    easing: 'easeInOutQuart',
    duration: 2000,
    delay: 500
  })
});
</script>

<template>
  <div class="error">
    <img src="@/assets/404.svg" alt="Error image">
    <h1>Your route is invalid, please recheck it!</h1>
  </div>
</template>

<style lang="scss">
.error {
  position: relative;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  justify-content: center;
  align-items: center;

  img {
    opacity: 0;
  }

  h1 {
    opacity: 0;
  }
}
</style>
