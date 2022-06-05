<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import hideContent from '@/helpers/hideContent';

const router = useRouter();
const route = useRoute();
const anime: any = inject('anime');
const data: any = inject('data');
const menuActive = ref(false);
const menuItems = ref([
  {
    to: '/',
    text: 'Home'
  },
  {
    to: '/projects',
    text: 'Projects'
  },
  {
    to: '/about',
    text: 'About me'
  },
  {
    to: '/skills',
    text: 'Skills'
  },
  {
    to: '/contacts',
    text: 'Contacts'
  },
])

function menuHandler() {
  if (menuActive.value) {
    anime({
      targets: '.header',
      translateX: [0, '100%'],
      right: [0, '6.25rem'],
      easing: 'easeInOutQuart',
      duration: 1000,
    });
    menuActive.value = false;
    return;
  }

  anime({
    targets: '.header',
    translateX: ['100%', 0],
    right: ['6.25rem', 0],
    easing: 'easeInOutQuart',
    duration: 1000,
  });
  menuActive.value = true;
  innerHandler();
}

async function routeHandler(to: string) {
  if (to === route.path) {
    menuHandler();
    return;
  }

  await hideContent();
  menuHandler();
  router.push(to);
}

function innerHandler() {
  anime({
    targets: '.header__inner__navigation a',
    opacity: [0, 1],
    translateY: [16, 0],
    easing: 'easeInOutQuart',
    duration: 1000,
    delay: (_el: HTMLElement, i: number) => 200 * i,
  });
  anime({
    targets: '.header__inner__logo',
    opacity: [0, 1],
    translateY: [16, 0],
    easing: 'easeInOutQuart',
    duration: 1000,
    delay: 1000,
  });
}

onMounted(() => {
  anime({
    targets: '.header',
    translateX: ['110%', '100%'],
    opacity: [0, 1],
    easing: 'easeInOutQuart',
    duration: 1000,
    delay: 1000,
  });
  anime({
    targets: '.header__visible__button',
    opacity: [0, 1],
    easing: 'easeInOutQuart',
    duration: 1000,
    delay: (_el: HTMLElement, i: number) => 1500 + 500 * i,
  });
});
</script>

<template>
  <header class="header">
    <div class="header__visible">
      <div @click="menuHandler" class="header__visible__button">
        <img src="@/assets/menu-button.svg" alt="Menu button">
      </div>
      <div class="header__visible__button">
        <img src="@/assets/menu-more.svg" alt="Menu more">
      </div>
    </div>
    <div class="header__inner">
      <div class="container-fluid">
        <div class="row justify-content-center align-items-center">
          <div class="col-md-3 col-10">
            <nav class="header__inner__navigation">
              <ul>
                <li v-for="item in menuItems" :key="item.text">
                  <a @click.prevent="routeHandler(item.to)">
                    <h1>{{ item.text }}</h1>
                  </a>
                </li>
              </ul>
            </nav>
            <img :src="data.logo" alt="Header inner logo" class="header__inner__logo">
            <div @click="menuHandler" class="header__inner__close">
              <img src="@/assets/menu-close.svg" alt="Menu close">
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import '@/assets/vars';

.header {
  background: #00000090;
  display: flex;
  z-index: 98;
  position: fixed;
  top: 0;
  right: 6.25rem;
  height: 100vh;
  width: calc(100% + 6.25rem);
  transform: translateX(100%);
  border-left: 1px solid #141414;

  &__visible {
    height: 100%;
    width: 6.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__button {
      cursor: pointer;
      display: flex;
      height: 6.25rem;
      transition: .3s ease;

      img {
        margin: auto;
      }

      &:hover {
        border: 1px solid #ffffff50;
      }
    }

    @media screen and (max-width: $breakpoint-phone) {
      flex-direction: column-reverse;
    }
  }

  &__inner {
    display: flex;
    justify-items: center;
    align-items: center;
    width: calc(100% - 6.25rem);
    position: relative;

    &__close {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
      width: 6.25rem;
      height: 6.25rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: .3s ease;

      &:hover {
        border: 1px solid #ffffff50;
      }

      @media screen and (max-width: $breakpoint-phone) {
        top: unset;
        bottom: 0;
      }
    }

    &__navigation {
      text-align: center;

      ul {
        li {
          a {
            cursor: pointer;
            opacity: 0;
            display: block;
            margin-bottom: 1.563rem;

            h1 {
              transition: .7s ease;

              &:hover {
                background: #ffffff;
                color: #000000;
              }
            }
          }
        }
      }
    }

    &__logo {
      display: block;
      margin: 8.75rem auto 0;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
