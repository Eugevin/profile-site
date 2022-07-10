<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoaderComponent from '@/components/LoaderComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import CursorComponent from './components/CursorComponent.vue';
import { onMounted, provide, ref } from 'vue';

const loaded = ref(false);
const data = ref({});
const availableForShow = ref(false);
const windowWidth = ref(window.innerWidth);

const preloadedImages: any = ref({});

provide('data', data);

function loaderHandler() {
  availableForShow.value = true;
}

async function preloadImages() {
  return new Promise(async resolve => {
    const response = await fetch('https://eugevin.com/api/images');
    const responseData = await response.json();

    preloadedImages.value = { total: responseData.length, loaded: 0 };
  
    responseData.forEach((data: any) => {
      const image = new Image();
      image.src = data;

      image.onload = () => {
        preloadedImages.value.loaded += 1;      

        if (preloadedImages.value.loaded === preloadedImages.value.total - 1) {
          resolve(true);
        }
      }
    });
  });
}

onMounted(async () => {
  const response = await fetch('https://eugevin.com/api/data');
  const responseData = await response.json();

  data.value = responseData;

  await preloadImages();

  loaded.value = true;

  console.info('%c // What do u want to see here, my yung cool-hacker? \n // Write me if u can https://t.me/eugevin/', 'color: green; font-size: 1rem');
});
</script>

<template>
  <CursorComponent v-if="windowWidth > 768" />
  <LoaderComponent @ended="loaderHandler" :loaded="loaded" v-if="!availableForShow" />
  <HeaderComponent v-if="availableForShow" />
  <main>
    <RouterView v-if="availableForShow" />
  </main>
</template>

<style lang="scss">
@import './assets/reset.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

/* === VARS === */

@import '@/assets/vars';

/* === MAIN === */

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: 'Poppins', 'Arial', sans-serif;
  font-weight: 400;
  font-size: 16px;
}

h1 {
  font-weight: 600;
  font-size: 2.875rem;
  line-height: 3.75rem;
  color: #FFFFFF;
}

h2 {
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 3.75rem;
  color: #FFFFFF;
}

h3 {
  font-weight: 600;
  font-size: 1.875rem;
  line-height: 2.875rem;
  color: #FFFFFF;
}

h4 {
  font-weight: 600;
  font-size: 1.5rem;
  line-height: 2.25rem;
  color: #FFFFFF;
}

h5 {
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.875rem;
  color: #FFFFFF;
}

blockquote {
  padding: 0.938rem 0 0.938rem 1.875rem;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.625rem;
  color: #FFFFFF;
  border-left: 0.375rem solid #212121;
}

.mock {
  opacity: 0;
}

p {
  font-size: 1rem;
  line-height: 1.875rem;
  color: #A6A6A6;  

  .light {
    font-size: 0.75rem;
    line-height: 1.375rem;
    color: #666666;    
  }
}

main {
  min-height: 100vh;
  background: #000000;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    background: #212121;
  }
}

@media screen and (max-width: $breakpoint-laptop) {
  html {
    font-size: 12px;
  }  
}

@media screen and (max-width: $breakpoint-phone) {
  html {
    font-size: 10px;
  }

  main::before {
    content: none;
  }
}
</style>
