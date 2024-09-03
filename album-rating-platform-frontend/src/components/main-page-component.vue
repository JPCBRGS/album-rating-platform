<template>
  <div class="main-page">
    <menu-bar-component />
    <div class="content">
      <input
        type="text"
        placeholder="Search albums..."
        v-model="searchQuery"
        @input="debouncedSearch"
        class="search-box"
      />
      <div class="album-list">
        <div class="album" v-for="album in displayedAlbums" :key="album.id">
          <img
            :src="album.images[0]?.url"
            alt="album cover"
            class="album-cover"
          />
          <p>{{ album.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBarComponent from './menu-bar-component.vue';
import _ from 'lodash';

export default {
  name: 'main-page-component',
  components: {
    MenuBarComponent,
  },
  data() {
    return {
      searchQuery: '',
      albums: [],
      accessToken: localStorage.getItem('spotifyAccessToken') || null,
    };
  },
  computed: {
    displayedAlbums() {
      // Limita o número de álbuns exibidos a 20
      return this.albums.slice(0, 20);
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const accessTokenFromUrl = urlParams.get('access_token');
    
    if (accessTokenFromUrl) {
      this.accessToken = accessTokenFromUrl;
      localStorage.setItem('spotifyAccessToken', this.accessToken);
      window.history.replaceState({}, document.title, "/main"); 
    } else {
      this.accessToken = localStorage.getItem('spotifyAccessToken');
    }

    if (!this.accessToken) {
      this.redirectToLogin();
      return;
    }

    this.verifyToken();
  },
  methods: {
    verifyToken() {
      fetch('http://localhost:3000/spotify/verify-token', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json'
          }
      })
      .then(response => response.json())
      .then(data => {
          if (!data.valid) {
              this.redirectToLogin();
          }
      })
      .catch(error => {
          console.error('Error verifying token:', error);
          this.redirectToLogin();
      });
    },
    redirectToLogin() {
      localStorage.removeItem('spotifyAccessToken');
      window.location.href = 'http://localhost:3000/spotify/login';
    },
    searchAlbums() {
      if (!this.searchQuery || !this.accessToken) return;
      this.fetchAlbums(this.searchQuery);
    },
    fetchAlbums(query) {
      const url = `http://localhost:3000/spotify/search-albums?query=${encodeURIComponent(query)}`;
      fetch(url, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json'
          }
      })
      .then(response => {
          if (!response.ok) throw new Error('Failed to fetch');
          return response.json();
      })
      .then(data => {
          this.albums = data;
      })
      .catch(error => {
          console.error('Error fetching albums:', error);
          this.albums = []; 
      });
    },
    debouncedSearch: _.debounce(function () {
      this.searchAlbums();
    }, 300),
  },
};
</script>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 100%;
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

.album-list {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5 colunas */
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 1000px;
}

.album {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.album-cover {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

p {
  font-size: 14px;
  font-weight: bold;
  color: #333;
}
</style>
