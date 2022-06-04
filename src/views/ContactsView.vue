<script setup lang="ts">
import { inject } from 'vue';
import InnerComponent from '../components/InnerComponent.vue';
import InputComponent from '@/components/InputComponent.vue';

const data = inject('data');

function telegramHandler() {
  window.open('https://t.me/eugevin');
}

function mailHandler() {
  window.open('mailto:eugene.vinokuroff@gmail.com');
}
</script>

<template>
  <div class="contacts">
    <InnerComponent :suptitle="data.contacts.inner.suptitle" :title="data.contacts.inner.title" :background="data.contacts.inner.bg" />
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-5 d-flex justify-content-center">
          <h2>Let’s work together</h2>
        </div>
        <div class="col-lg-6">
          <div class="contacts__social">
            <h5>Telegram</h5>
            <InputComponent type="button" @change="telegramHandler">Write me</InputComponent>
          </div>
          <div class="contacts__social">
            <h5>Email</h5>
            <InputComponent type="button" @change="mailHandler">Mail me</InputComponent>
          </div>
          <form class="contacts__form">
            <h5>Get in touch</h5>
            <p style="color: red;">Currently waiting for refactor</p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.contacts {
  position: relative;
  padding-bottom: 100px;

  &__social {
    margin-bottom: 80px;

    h5 {
      margin-bottom: 20px;
    }
  }
}
</style>
