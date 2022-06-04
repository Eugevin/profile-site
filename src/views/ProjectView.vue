<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import observer from '@/helpers/observer';
import hideContent from '@/helpers/hideContent';
import InputComponent from '../components/InputComponent.vue';
import InnerComponent from '../components/InnerComponent.vue';

const pageReady = ref(false);
const project: any = ref(null);
const router = useRouter();
const route = useRoute();

async function backHandler() {
  await hideContent();
  router.push('/projects');
}

function showPage() {
  pageReady.value = true;
  setTimeout(() => observer());
}

onMounted(async () => {
  const { name } = route.query;

  try {
    const response = await fetch(`https://eugevin.com/api/project?name=${name}`);
    const data = await response.json();

    project.value = data;
    showPage();
  } catch (e) {
    console.error(e);
    router.push('/404');
  }
});
</script>

<template>
  <div v-if="pageReady" class="project">
    <InnerComponent :suptitle="project.inner.suptitle" :title="project.inner.title" :background="project.inner.bg" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-5"></div>
        <div class="col-lg-6">
          <div class="project__description">
            <div v-for="item in project.body" :key="item" class="mock" v-html="item"></div>
          </div>
          <InputComponent class="mock" @change="backHandler" type="button">Back</InputComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project {
  position: relative;
  padding-bottom: 100px;

  &__description {
    > div {
      margin-bottom: 20px;
    }
  }
}
</style>
