<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import LoaderComponent from '@/components/LoaderComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import CursorComponent from './components/CursorComponent.vue';
import { onMounted, provide, ref } from 'vue';

const loaded = ref(false);
const data = ref({});
const availableForShow = ref(false);

const preloadedImages = ref({});

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
});
</script>

<template>
  <CursorComponent />
  <LoaderComponent @ended="loaderHandler" :loaded="loaded" v-if="!availableForShow" />
  <HeaderComponent v-if="availableForShow" />
  <main>
    <RouterView v-if="availableForShow" />
  </main>
</template>

<style lang="scss">
@import './assets/reset.css';
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', 'Arial', sans-serif;
  font-weight: 400;
}

h1 {
  font-weight: 600;
  font-size: 46px;
  line-height: 60px;
  color: #FFFFFF;
}

h2 {
  font-weight: 600;
  font-size: 36px;
  line-height: 60px;
  color: #FFFFFF;
}

h3 {
  font-weight: 600;
  font-size: 30px;
  line-height: 46px;
  color: #FFFFFF;
}

h4 {
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
  color: #FFFFFF;
}

h5 {
  font-weight: 600;
  font-size: 18px;
  line-height: 30px;
  color: #FFFFFF;
}

blockquote {
  padding: 15px 0 15px 30px;
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  color: #FFFFFF;
  border-left: 6px solid #212121;
}

.mock {
  opacity: 0;
}

p {
  font-size: 16px;
  line-height: 30px;
  color: #A6A6A6;  

  .light {
    font-size: 12px;
    line-height: 22px;
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
</style>
