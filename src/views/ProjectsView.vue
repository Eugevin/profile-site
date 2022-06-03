<script setup lang="ts">
import { inject, onMounted } from 'vue';
import observer from '../helpers/observer';
import InnerComponent from '../components/InnerComponent.vue';

const data: any = inject('data');

onMounted(() => {
  observer();
});
</script>

<template>
  <div class="projects">
    <InnerComponent :suptitle="data.projects.inner.suptitle" :title="data.projects.inner.title" :background="data.projects.inner.bg" />
    <div class="container-fluid">
      <div v-for="project in data.projects.body" :key="project.title" class="projects__item mock">
        <img :src="project.image" alt="Project item image" class="projects__item__image">
        <h4 class="projects__item__title">{{ project.title }}</h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.projects {
  position: relative;
  padding-bottom: 100px;

  &__item {
    cursor: pointer;
    position: relative;
    height: 360px;
    background: #1D86FF;

    &__title {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      transform: rotate(-90deg) translate(50px, 0);
    }

    &__image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .inner + .container-fluid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 100px;
  }
}
</style>
