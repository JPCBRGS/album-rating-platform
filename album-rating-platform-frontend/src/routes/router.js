// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/login-component.vue';
import RegisterComponent from '../components/register-component.vue';
import ProfileComponent from '@/components/profile-component.vue';
import MainPageComponent from '../components/main-page-component.vue';

// Simulação de verificação de login
function isLoggedIn() {
  return localStorage.getItem('isLoggedIn') === 'true';
}

const routes = [
  { path: '/login', component: LoginComponent },
  { path: '/register', component: RegisterComponent },
  { path: '/profile', component: ProfileComponent },
  { path: '/main', component: MainPageComponent },
  { path: '/', redirect: () => (isLoggedIn() ? '/main' : '/login') }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
