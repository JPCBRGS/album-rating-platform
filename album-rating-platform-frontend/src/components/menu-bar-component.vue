<template>
    <div class="menu-bar">
      <div class="menu-icon">
        <i class="fas fa-bars"></i>
      </div>
      <div class="user-icon" @click="logout">
        <i class="fas fa-user"></i>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'menu-bar-component',
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
  .menu-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1e1e1e; /* Cor de fundo da barra */
    padding: 0 1rem; /* Espaçamento horizontal */
    height: 50px; /* Altura da barra */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Sombra da barra */
    position: fixed; /* Fixa a barra no topo */
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000; /* Garante que a barra fique acima de outros elementos */
  }
  
  .menu-icon,
  .user-icon {
    font-size: 24px;
    color: #ffffff; /* Cor dos ícones */
  }
  
  .menu-icon {
    cursor: pointer; /* Cursor pointer para o ícone de menu */
  }
  
  .user-icon {
    cursor: pointer; /* Cursor pointer para o ícone de usuário */
    font-size: 20px; /* Ajusta o tamanho do ícone de perfil */
  }
  </style>
  