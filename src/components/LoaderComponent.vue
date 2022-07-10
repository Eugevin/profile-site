<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';

const anime: any = inject('anime');
const loader = ref(0);
const loaderBox = ref(0);
const props = defineProps(['loaded']);
const emit = defineEmits(['ended']);

function hideLoader() {
  anime({
    targets: '.loader',
    translateY: [0, '100%'],
    easing: 'easeInOutQuart',
    duration: 1000,
    complete: () => {
      emit('ended');
    }
  });
}

onMounted(() => {
  anime({
    targets: '.loader__text, .loader__box',
    opacity: [0, 1],
    easing: 'linear',
    duration: 1000,
  });

  const loaderAnimation = anime({
    targets: '.loader__box',
    keyframes: [
      { rotate: 45 },
      { rotate: 90 },
    ],
    duration: 3000,
    loop: true,
    update: () => {
      if (props.loaded) {
        loaderAnimation.pause();
        hideLoader();
      }
    }
  });
});
</script>

<template>
  <div ref="loader" class="loader">
    <h1 class="loader__text">Loading</h1>
    <div ref="loaderBox" class="loader__box"></div>
  </div>
</template>

<style lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: #000;

  &__box {
    opacity: 0;
    height: 50px;
    width: 50px;
    background: #ffffff;
  }

  &__text {
    opacity: 0;
  }
}
</style>
