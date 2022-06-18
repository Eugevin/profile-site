<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import InnerComponent from '../components/InnerComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import observer from '@/helpers/observer';

const anime: any = inject('anime');
const data: any = inject('data');
const formData: any = ref({ name: '', email: '', message: '' });
const formAlert = ref('');

function telegramHandler() {
  window.open('https://t.me/eugevin');
}

function mailHandler() {
  window.open('mailto:eugene.vinokuroff@gmail.com');
}

function githubHandler() {
  window.open('https://github.com/Eugevin');
}

function formDataHandler({ field, value }: { field: string, value: string }) {
  formData.value[field] = value;
}

async function formHandler() {
  try {
    const cfg = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value),
    }
    const response = await fetch('https://eugevin.com/api/form', cfg);
    const { status } = response;

    if (status === 200) {
      anime({
        targets: '.contacts__form > *:not(.contacts__form__recieve)',
        translateY: [0, '100%'],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 300,
        delay: (el, i) => 100 * i,
      });
      anime({
        targets: '.contacts__form__recieve',
        translateY: ['10%', 0],
        opacity: [0, 1],
        easing: 'easeInOutQuart',
        duration: 1000,
        delay: 500,
      });
      return;
    }

    if (status === 400) {
      formAlert.value = 'One or more of fields are invalid. Please, check it all before clicking submit again. Make sure that your name is more than 1 symbol and message not less than 50 symbols!'
      return;
    }

    formAlert.value = `I can't recieve your message now. Please, write me email or telegram, or try again later.`
  } catch (e) {
    console.error(e);
  }
}

onMounted(() => {
  observer();
});
</script>

<template>
  <div class="contacts">
    <InnerComponent :suptitle="data.contacts.inner.suptitle" :title="data.contacts.inner.title" :background="data.contacts.inner.bg" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-5 d-flex justify-content-center">
          <h2 class="mock">Let’s work together</h2>
        </div>
        <div class="col-md-6">
          <div class="contacts__socials mock">
            <h5>Write me in telegram or contact with mail</h5>
            <InputComponent type="button" @change="telegramHandler">Write me</InputComponent>
            <InputComponent type="button" @change="mailHandler">Mail me</InputComponent>
            <InputComponent type="button" @change="githubHandler">Github</InputComponent>
          </div>
          <h5 class="mock">Get in touch (min for name = 2 symbols, min for message = 50 symbols)</h5>
          <form @submit.prevent="formHandler" class="contacts__form mock">
            <InputComponent v-for="(field, fieldName) in formData" :key="fieldName"
              :placeholder="fieldName" :name="fieldName"
              @change="formDataHandler" />
            <InputComponent type="button">Submit</InputComponent>
            <p v-if="formAlert" class="contacts__form__alert">{{ formAlert }}</p>
            <p class="contacts__form__recieve">I successfully received your message!</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/vars';

.contacts {
  position: relative;
  padding-bottom: 6.25rem;

  &__socials {
    margin-bottom: 5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.25rem 2rem;

    h5 {
      flex: 100%;
    }
  }

  &__form {
    position: relative;
    overflow: hidden;
    margin-top: 46px;
    display: grid;
    gap: 55px 30px;
    grid-template-areas: 
      "name email null"
      "message message submit"
      "alert alert alert";

    [name="name"] {
      grid-area: name;
    }

    [name="email"] {
      grid-area: email;
    }

    [name="message"] {
      grid-area: message;
    }

    button {
      grid-area: submit;
    }

    .contacts__form__alert {
      grid-area: alert;
      color: #ff4e4e;
    }

    &__recieve {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    @media screen and (max-width: $breakpoint-laptop) {
      grid-template-areas: 
        "name email"
        "message message"
        "submit alert";
    }

    @media screen and (max-width: $breakpoint-tablet) {
      grid-template-areas: 
        "name email"
        "message message"
        "submit null"
        "alert alert";
    }
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
