// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/global.css';
createApp(App)
  .use(router)
  .mount('#app');
