<template>
  <div id="app">
    <login-component />
    <register-component />
  </div>
</template>

<script>
import LoginComponent from './components/login-component.vue';
import RegisterComponent from './components/register-component.vue';

export default {
  name: 'app',
  components: {
    'login-component': LoginComponent,
    'register-component': RegisterComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
