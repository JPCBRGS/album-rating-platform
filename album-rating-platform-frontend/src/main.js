// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './routes/router';
import './global.css';
createApp(App)
  .use(router)
  .mount('#app');
