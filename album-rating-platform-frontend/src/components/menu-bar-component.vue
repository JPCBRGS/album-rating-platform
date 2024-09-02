<template>
  <div class="menu-bar">
    <div class="menu-icon">
      <i class="fas fa-bars"></i>
    </div>
    <div class="user-icon" @mouseenter="showDropdown" @mouseleave="hideDropdown">
      <i class="fas fa-user"></i>
      <div v-if="isDropdownVisible" class="dropdown">
        <ul>
          <li @click="goToProfile">My Profile</li>
          <li @click="logout">Logout</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-bar-component',
  data() {
    return {
      isDropdownVisible: false
    };
  },
  methods: {
    showDropdown() {
      this.isDropdownVisible = true;
    },
    hideDropdown() {
      this.isDropdownVisible = false;
    },
    logout() {
      // Remove a autenticação do usuário
      localStorage.removeItem('isLoggedIn');
      // Redireciona para a página de login
      this.$router.push('/login');
    },
    goToProfile() {
      // Redireciona para a página de perfil
      this.$router.push('/profile');
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
  position: relative;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: #333; /* Fundo mais escuro para o dropdown */
  border: 1px solid #444; /* Borda um pouco mais clara que o fundo */
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* Sombra mais pronunciada */
  width: 150px;
}

.dropdown ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dropdown li {
  padding: 10px;
  cursor: pointer;
  color: #fff; /* Cor do texto no dropdown */
  text-align: left;
}

.dropdown li:hover {
  background-color: #555; /* Cor do fundo ao passar o mouse */
}
</style>
