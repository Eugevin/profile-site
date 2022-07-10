<script setup lang="ts">
import { onMounted, ref } from 'vue';

const cursor: any = ref(0);
const cursorPos = ref([-100, -100, 0]);

onMounted(() => {
  document.addEventListener('mousemove', e => {
    const { target, x, y } = e as any;
    let delta = 1;

    const curs = getComputedStyle(target).cursor;
    if (curs === 'pointer') {
      cursor.value.classList.add('cursor_pointer');
    } else {
      cursor.value.classList.remove('cursor_pointer');
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
  will-change: transform, border-radius;
  backdrop-filter: invert(1);

  &_pointer {
    height: 75px;
    width: 75px;
  }

  @media screen and (max-width: $breakpoint-tablet) {
    display: none;    
  }
}
</style>
