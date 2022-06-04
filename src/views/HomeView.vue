<script setup lang="ts">
import { inject, onMounted } from 'vue';

const anime = inject('anime');
const data = inject('data');

onMounted(() => {
  const title = document.querySelector('.home__title');
  title.innerHTML = title.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  const suptitle = document.querySelector('.home__suptitle');
  suptitle.innerHTML = suptitle.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime({
    targets: '.home__banner img',
    translateX: ['-110%', 0],
    scale: [1.1, 1],
    opacity: [0, 1],
    easing: 'easeInOutQuart',
    duration: 1000
  });
  anime({
    targets: '.home__title .letter',
    translateY: [16, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: (el, i) => 1500 + 20 * i
  });
  anime({
    targets: '.home__suptitle .letter',
    translateY: [16, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: (el, i) => 1000 + 20 * i
  });
  anime({
    targets: '.home__logo',
    translateY: [16, 0],
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1000,
    delay: 2000
  });
});
</script>

<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row justify-content-md-center">
        <div class="col-xl-6 col-md-8">
          <div class="home__banner image-mock">
            <img :src="data.home.banner" alt="Home banner">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center align-items-center">
          <img :src="data.logo" alt="Eugevin logo" class="home__logo">
        </div>
        <div class="col-md-6">
          <p class="home__suptitle">{{ data.home.suptitle }}</p>
          <h1 class="home__title">{{ data.home.title }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/vars';

.home {
  padding: 5rem 0 6.25rem;
  position: relative;

  &__banner {
    margin-bottom: 4.375rem;
    overflow: hidden;
    height: 33.125rem;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  &__logo {
    @media screen and (max-width: $breakpoint-phone) {
      margin: 0 auto 3.75rem 0;
    }
  }

  &__title {
    .letter {
      display: inline-block;
    }
  }
}
</style>
