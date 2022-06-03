<script setup lang="ts">
import { inject, onMounted } from 'vue';
import InnerComponent from '../components/InnerComponent.vue';

const data: any = inject('data');
const anime: any = inject('anime');

function observerCallback(entries, observer) {
  entries.forEach(entry => {
    const entryActivated = entry.target.classList.contains('mock_activated');
    if (entry.isIntersecting && !entryActivated) {
      anime({
        targets: entry.target,
        translateY: ['100%', 0],
        scale: [1.1, 1],
        opacity: [0, 1],
        easing: 'easeInOutQuart',
        duration: 1000,
      });

      entry.target.classList.add('mock_activated');
    }
  });
}

onMounted(() => {
  const mockEls = document.querySelectorAll('.mock');

  let options = {
    root: document.querySelector('#scrollArea'),
    rootMargin: '0px',
    threshold: 0.5
  }

  let observer = new IntersectionObserver(observerCallback, options);
  mockEls.forEach(mock => observer.observe(mock));
});
</script>

<template>
  <div class="skills">
    <InnerComponent :suptitle="data.skills.inner.suptitle" :title="data.skills.inner.title" :background="data.skills.inner.bg" />
    <div class="container-fluid">
      <div v-for="skill in data.skills.body" :key="skill.title" class="row skills__item">
        <div class="col-lg-5 d-flex flex-column justify-content-center">
          <h3 class="skills__item__title mock">{{ skill.title }}</h3>
          <p class="skills__item__description mock">{{ skill.description }}</p>
        </div>
        <div class="col-lg-6">
          <div class="skills__item__image mock">
            <img :src="skill.image" alt="Skill image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.skills {
  position: relative;
  padding-bottom: 100px;

  &__item:not(:last-of-type) {
    margin-bottom: 80px;
  }

  &__item {
    text-align: right;

    &__title {
      margin: 0 100px 20px;
    }

    &__description {
      margin: 0 100px;
    }

    &__image {
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
