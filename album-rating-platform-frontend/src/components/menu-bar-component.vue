<template>
  <div class="menu-bar">
    <div class="left-icons">
      <div class="home-icon" @click="goToHome">
        <i class="fas fa-home"></i> <!-- Ícone de casinha -->
      </div>
      <div class="menu-icon">
        <i class="fas fa-bars"></i>
      </div>
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
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('email');
      this.$router.push('/login');
    },
    goToProfile() {
      this.$router.push('/profile');
    },
    goToHome() {
      this.$router.push('/main'); // Redireciona para a página principal
    }
  }
}
</script>

<style scoped>
.menu-bar {
  display: flex;
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

.left-icons {
  display: flex;
  align-items: center;
}

.home-icon,
.menu-icon {
  font-size: 24px;
  color: #ffffff; /* Cor dos ícones */
  cursor: pointer; /* Cursor pointer para os ícones */
}

.menu-icon {
  margin-left: 1rem; /* Espaçamento entre o ícone de casa e o ícone de menu */
}

.user-icon {
  margin-left: auto; /* Empurra o ícone de usuário para a direita */
  font-size: 20px; /* Ajusta o tamanho do ícone de perfil */
  color: #ffffff; /* Cor do ícone */
  cursor: pointer; /* Cursor pointer para o ícone de usuário */
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
