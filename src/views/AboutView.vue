<script setup lang="ts">
import InnerComponent from '@/components/InnerComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import { inject, onMounted } from 'vue';
import observer from '@/helpers/observer';
import hideContent from '@/helpers/hideContent';
import { useRouter } from 'vue-router';

const data: any = inject('data');
const router = useRouter();

async function contactHandler() {
  await hideContent();
  router.push('/contacts');
}

onMounted(() => {
  observer();
});
</script>

<template>
  <div class="about">
    <InnerComponent :suptitle="data.about.inner.suptitle" :title="data.about.inner.title" :background="data.about.inner.bg" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
          <h2 class="mock">My short story</h2>
        </div>
        <div class="col-md-6">
          <ul class="about__story">
            <li v-for="item in data.about.history" :key="item.date" class="mock">
              <h5 class="about__story__date">{{ item.date }}</h5>
              <p class="about__story__description">{{ item.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <div class="about__fullwidth mock">
            <img :src="data.about.fullwidth" alt="About fullwidth">
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
          <h2 class="mock">My services</h2>
        </div>
        <div class="col-md-6">
            <p>I combine design, technology and business strategy into a unified discipline powerful enough to propel companies forward.</p>
          <ul class="about__services">
            <li v-for="item in data.about.services" :key="item.title" class="mock">
              <img :src="item.image" alt="Service image">
              <h4 class="about__services__title">{{ item.title }}</h4>
              <p class="about__services__description">{{ item.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
          <h2 class="mock">Why me</h2>
        </div>
        <div class="col-md-6">
          <ul class="about__why">
            <li v-for="item in data.about.why" :key="item.title" class="mock">
              <h5 class="about__why__date">{{ item.title }}</h5>
              <p class="about__why__description">{{ item.description }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
          <h2 class="mock">My jobs</h2>
        </div>
        <div class="col-md-6">
          <p>Proudly served some by me:</p>
          <ul class="about__jobs">
            <li :style="`background-image: url(${data.logo});`" v-for="item in data.about.clients" :key="item.title" class="mock">
              <img :src="item.image" alt="Client image" class="about__job__description">
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
        </div>
        <div class="col-md-6 mock">
          <h3 class="about__contact">Whatever your needs, i’re looking forward to hearing from you</h3>
          <InputComponent @change="contactHandler" type="button">Contact Me</InputComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/vars';

.about {
  position: relative;
  padding-bottom: 6.25rem;

  &__story {
    li:not(:first-of-type) {
      margin-top: 1.875rem;
    }

    li:hover .about__story__date::before {
      background: #ffffff;
    }

    &__date {
      padding-left: 2.375rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 1rem;
        width: 1rem;
        border-radius: 100%;
        background: #212121;
        transition: .7s ease;
      }
    }
  }

  &__fullwidth img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__services {
    text-align: center;
    margin-top: 1.25rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    li {
      border: 1px solid #141414;
      padding: 3.313rem 1.125rem 1.5rem;
    }

    &__title {
      margin: 2rem 0 0.813rem;
    }
  }

  &__why {
    li:not(:first-of-type) {
      margin-top: 1.875rem;
    }
  }

  &__jobs {
    margin-top: 1.25rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    li {
      background: url('') no-repeat center / 10%;
      border: 1px solid #141414;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  &__contact {
    text-align: center;
    margin: 0 auto 1.25rem;

    + button {
      margin: auto;
    }
  }

  .container-fluid {
    margin-top: 4.375rem;
  }

  @media screen and (max-width: $breakpoint-phone) {
    .col-md-5 {
      justify-content: flex-start !important;
      
      h2 {
        margin-bottom: 2rem;
      }
    }    
  }
}
</style>
