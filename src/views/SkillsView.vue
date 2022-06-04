<script setup lang="ts">
import { inject, onMounted } from 'vue';
import observer from '@/helpers/observer';
import InnerComponent from '../components/InnerComponent.vue';

const data: any = inject('data');

onMounted(() => {
  observer();
});
</script>

<template>
  <div class="skills">
    <InnerComponent :suptitle="data.skills.inner.suptitle" :title="data.skills.inner.title" :background="data.skills.inner.bg" />
    <div class="container-fluid">
      <div v-for="skill in data.skills.body" :key="skill.title" class="row skills__item">
        <div class="col-md-5 d-flex flex-column justify-content-center">
          <h3 class="skills__item__title mock">{{ skill.title }}</h3>
          <p class="skills__item__description mock">{{ skill.description }}</p>
        </div>
        <div class="col-md-6">
          <div class="skills__item__image mock">
            <img :src="skill.image" alt="Skill image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/vars';

.skills {
  position: relative;
  padding-bottom: 6.25rem;

  &__item:not(:last-of-type) {
    margin-bottom: 5rem;
  }

  &__item {
    text-align: right;

    &__title {
      margin: 0 6.25rem 1.25rem;
    }

    &__description {
      margin: 0 6.25rem 0 2rem;
    }

    &__image {
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  @media screen and (max-width: $breakpoint-phone) {
    &__item__title {
      margin: 0 0 1.25rem;
    }

    &__item__description {
      margin: 0;
    }

    &__item__image {
      margin-top: 2rem;
    }
  }
}
</style>
