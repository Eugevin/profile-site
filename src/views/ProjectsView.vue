<script setup lang="ts">
import { inject, onMounted } from 'vue';
import observer from '@/helpers/observer';
import hideContent from '@/helpers/hideContent';
import InnerComponent from '../components/InnerComponent.vue';
import { useRouter } from 'vue-router';

const data: any = inject('data');
const router = useRouter();

async function projectHandler(projectName: string) {
  await hideContent();
  router.push(`/projects/project?name=${projectName}`);
}

onMounted(() => {
  observer();
});
</script>

<template>
  <div class="projects">
    <InnerComponent :suptitle="data.projects.inner.suptitle" :title="data.projects.inner.title" :background="data.projects.inner.bg" />
    <div class="container-fluid">
      <div @click="projectHandler(project.title)" v-for="project in data.projects.body" :key="project.title" class="projects__item mock">
        <img :src="project.image" alt="Project item image" class="projects__item__image">
        <h4 class="projects__item__title">{{ project.title }}</h4>
        <h2 class="projects__item__more">Show more</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/vars';

.projects {
  position: relative;
  padding-bottom: 6.25rem;

  &__item {
    overflow: hidden;
    cursor: pointer;
    position: relative;
    height: 22.5rem;
    background: #1D86FF;

    &__title {
      position: absolute;
      bottom: 0;
      right: 0;
      display: inline-block;
      transform: translate(-10%);
    }

    &__more {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #00000070;
      visibility: hidden;
      opacity: 0;
      transition: .7s ease;
    }

    &__image {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }

    img {
      transition: .7s ease;
    }

    &:hover {
      img {
        transform: scale(1.1);
      }

      .projects__item__more {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .inner + .container-fluid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6.25rem;

    @media screen and (max-width: $breakpoint-tablet) {
      grid-template-columns: repeat(2, 1fr);      
    }

    @media screen and (max-width: $breakpoint-phone) {
      grid-template-columns: 1fr;      
    }
  }
}
</style>
