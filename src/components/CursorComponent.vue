<script setup lang="ts">
import { onMounted, ref } from 'vue';

const cursor = ref(0);
const cursorPos = ref([-100, -100]);

onMounted(() => {
  document.addEventListener('mousemove', e => {
    const {x, y} = e;
    // cursorPos.value = [x, y];
    requestAnimationFrame(() => cursorPos.value = [x, y]);
  });
});
</script>

<template>
  <div ref="cursor" class="cursor" :style="`transform: translate(${cursorPos[0] - 21}px, ${cursorPos[1] - 21}px)`"></div>
</template>

<style lang="scss">
@import '@/assets/vars';

.cursor {
  position: fixed;
  z-index: 100;
  height: 50px;
  width: 50px;
  pointer-events: none;
  background: #ffffff05;
  border-radius: 100%;
  transition: .3s linear;
  backdrop-filter: invert(1);

  @media screen and (max-width: $breakpoint-tablet) {
    display: none;    
  }
}
</style>
