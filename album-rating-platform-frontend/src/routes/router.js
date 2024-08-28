// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/login-component.vue';
import RegisterComponent from '../components/register-component.vue';
import MainPageComponent from '../components/main-page-component.vue';

// Simulação de verificação de login
function isLoggedIn() {
  // Aqui você pode implementar uma lógica real, como verificar um token no localStorage ou em um estado global
  return localStorage.getItem('isLoggedIn') === 'true';
}

const routes = [
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/main', component: MainPageComponent },
  { path: '/', redirect: () => (isLoggedIn() ? '/main' : '/login') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
