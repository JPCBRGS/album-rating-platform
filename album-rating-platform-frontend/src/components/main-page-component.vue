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
  margin-top: 40px;
  align-items: flex-start;
  flex-grow: 1;
}

.search-box {
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  border: 2px solid #ccc;
  width: 50%;
  max-width: 600px;
  outline: none;
  box-shadow: none;
  background: white;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
