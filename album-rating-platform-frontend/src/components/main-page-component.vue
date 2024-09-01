<template>
  <div class="main-page">
    <menu-bar-component />
    <div class="content">
      <h1>Welcome to the Main Page!</h1>
      <p>This is a placeholder for the main page content. Customize this component as needed.</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import MenuBarComponent from './menu-bar-component.vue';

export default {
  name: 'main-page-component',
  components: {
    MenuBarComponent
  },
  methods: {
    logout() {
      // Remove a autenticação do usuário
      localStorage.removeItem('isLoggedIn');
      
      // Redireciona para a página de login
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  text-align: center;
  margin-top: 20px;
  flex: 1;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
