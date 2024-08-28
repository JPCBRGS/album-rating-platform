<!-- src/components/main-page-component.vue -->
<template>
    <div class="main-page">
      <h1>Welcome to the Main Page!</h1>
      <p>This is a placeholder for the main page content. Customize this component as needed.</p>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'main-page-component',
    methods: {
      logout() {
        // Remove a autenticação do usuário
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        
        // Redireciona para a página de login
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
  .main-page {
    text-align: center;
    margin-top: 20px;
  }
  button {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
  }
  </style>
  