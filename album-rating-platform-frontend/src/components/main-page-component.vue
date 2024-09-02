<template>
  <div class="main-page">
    <menu-bar-component />
    <div class="content">
      <input type="text" placeholder="Search albums..." v-model="searchQuery" @keyup.enter="searchAlbums" class="search-box" />
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
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    searchAlbums() {
      // Implement the logic to search albums based on searchQuery
      console.log('Searching for:', this.searchQuery);
      // You might want to call an API to fetch the search results here
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
  display: flex;
  justify-content: center;
  margin-top: 60px; /* Ajustado para dar espaço abaixo da barra de menu */
  align-items: center; /* Centraliza verticalmente */
  flex-grow: 1; /* Permite que o conteúdo cresça para ocupar o espaço disponível */
}

.search-box {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px; /* Torna o campo de entrada arredondado */
  border: 2px solid #ccc; /* Dá uma borda sutil */
  width: 50%; /* Ajuste a largura conforme necessário */
  max-width: 600px; /* Largura máxima */
  outline: none; /* Remove o contorno ao focar */
  box-shadow: none; /* Remove qualquer sombra que possa parecer uma borda */
  background: white; /* Define o fundo como branco */
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
