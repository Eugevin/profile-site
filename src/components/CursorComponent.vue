<script setup lang="ts">
import { onMounted, ref } from 'vue';

const cursor = ref(0);
const cursorPos = ref([-100, -100, 0]);

onMounted(() => {
  document.addEventListener('mousemove', e => {
    const { x, y, movementX, movementY } = e;
    let delta = 1;
    console.log(movementX, movementY);

    if (Math.abs(movementX) > 5 || Math.abs(movementY) > 5) {
      delta = 0.5;
    }

    requestAnimationFrame(() => cursorPos.value = [x, y, delta]);
  });
});
</script>

<template>
  <div ref="cursor" class="cursor" :style="`transform: translate(${cursorPos[0] - 21}px, ${cursorPos[1] - 21}px) scale(${cursorPos[2]})`"></div>
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
