import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import anime from 'animejs/lib/anime.es.js';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

const app = createApp(App);

app.use(router).provide('anime', anime);

app.mount('#app');
