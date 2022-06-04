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
        <div class="col-lg-5 d-flex justify-content-center">
          <h2 class="mock">My short story</h2>
        </div>
        <div class="col-lg-6">
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
        <div class="col-lg-10">
          <div class="about__fullwidth mock">
            <img :src="data.about.fullwidth" alt="About fullwidth">
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-5 d-flex justify-content-center">
          <h2 class="mock">My services</h2>
        </div>
        <div class="col-lg-6">
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
        <div class="col-lg-5 d-flex justify-content-center">
          <h2 class="mock">Why me</h2>
        </div>
        <div class="col-lg-6">
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
        <div class="col-lg-5 d-flex justify-content-center">
          <h2 class="mock">My jobs</h2>
        </div>
        <div class="col-lg-6">
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
        <div class="col-lg-5 d-flex justify-content-center">
        </div>
        <div class="col-lg-6 mock">
          <h3 class="about__contact">Whatever your needs, i’re looking forward to hearing from you</h3>
          <InputComponent @change="contactHandler" type="button">Contact Me</InputComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.about {
  position: relative;
  padding-bottom: 100px;

  &__story {
    li:not(:first-of-type) {
      margin-top: 30px;
    }

    li:hover .about__story__date::before {
      background: #ffffff;
    }

    &__date {
      padding-left: 38px;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        height: 16px;
        width: 16px;
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
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    li {
      border: 1px solid #141414;
      padding: 53px 18px 24px;
    }

    &__title {
      margin: 32px 0 12px;
    }
  }

  &__why {
    li:not(:first-of-type) {
      margin-top: 30px;
    }
  }

  &__jobs {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    li {
      background: url('') no-repeat center / 10%;
      border: 1px solid #141414;
      height: 140px;

      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }

  &__contact {
    text-align: center;
    margin: 0 auto 20px;
    max-width: 600px;

    + button {
      margin: auto;
    }
  }

  .container-fluid {
    margin-top: 70px;
  }
}
</style>
