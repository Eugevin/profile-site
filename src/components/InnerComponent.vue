<script setup lang="ts">
import { inject, onMounted } from 'vue';

const anime: any = inject('anime');
const data = inject('data');
defineProps(['background', 'suptitle', 'title'])

onMounted(() => {
  const title = document.querySelector('.inner__title');
  title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  const suptitle = document.querySelector('.inner__suptitle');
  suptitle.innerHTML = suptitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime({
    targets: '.inner__background img',
    translateY: ['10%', 0],
    scale: [1.1, 1],
    opacity: [0, 1],
    easing: 'easeInOutQuart',
    duration: 1000
  });
  anime({
    targets: '.inner__title .letter',
    translateY: [16, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: (el, i) => 1000 + 20 * i
  });
  anime({
    targets: '.inner__suptitle .letter',
    translateY: [16, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: (el, i) => 500 + 20 * i
  });
  anime({
    targets: '.inner__logo',
    translateY: [16, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: 1500
  });
});
</script>

<template>
  <div class="inner">
    <div class="inner__background">
      <img :src="background" alt="Inner background">
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center align-items-center">
          <img class="inner__logo" :src="data.logo" alt="Eugevin logo">
        </div>
        <div class="col-md-6">
          <p class="inner__suptitle">{{ suptitle }}</p>
          <h1 class="inner__title">{{ title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/vars';

.inner {
  margin-bottom: 6.25rem;
  padding-bottom: 4.375rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  min-height: 100vh;
  height: 100vh;

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .container-fluid {
    z-index: 1;
  }

  @media screen and (max-width: $breakpoint-phone) {
    &__logo {
      margin: 0 auto 3.75rem 0;
    }
  }
}
</style>
