<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-button" @click="close">X</button>
        <img :src="album?.images[0]?.url" alt="album cover" class="modal-album-cover" />
        <h2>{{ album?.name }}</h2>
  
        <!-- Seção de Avaliação -->
        <div class="rating-section">
          <h3>Rate this album:</h3>
          <div class="stars">
            <!-- Criamos cinco estrelas clicáveis com loop -->
            <span
              v-for="star in 5"
              :key="star"
              :class="['star', { filled: star <= userRating }]" 
              @click="rateAlbum(star)"
            >
              ★
            </span>
          </div>
          <p>Average rating: {{ averageRating }} ({{ totalRatings }} ratings)</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AlbumModalComponent',
    props: {
      isOpen: {
        type: Boolean,
        required: true,
      },
      album: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        userRating: 0, // Avaliação do usuário
        averageRating: 0, // Avaliação média
        totalRatings: 0, // Total de avaliações
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      rateAlbum(rating) {
        // Atualiza a avaliação do usuário
        this.userRating = rating;
  
        // Envia a avaliação para o back-end
        fetch('http://localhost:3000/ratings/create-or-update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rating,
            spotifyAlbumId: this.album.id,
            email: localStorage.getItem('email'), // Pegando o e-mail do localStorage
          }),
        })
        .then((response) => response.json())
        .then(() => {
          this.fetchAlbumRating(); // Atualiza a média de avaliações
        })
        .catch((error) => console.error('Error rating album:', error));
      },
      fetchAlbumRating() {
        // Obtém as avaliações do álbum no back-end
        fetch(`http://localhost:3000/ratings/album/${this.album.id}`)
          .then((response) => response.json())
          .then((data) => {
            this.averageRating = data.averageRating;
            this.totalRatings = data.totalRatings;
          })
          .catch((error) => console.error('Error fetching album rating:', error));
      },
    },
    watch: {
      album(newAlbum) {
        if (newAlbum) {
          this.fetchAlbumRating();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #333;
    padding: 40px;
    border-radius: 10px;
    max-width: 500px;
    text-align: center;
    color: white;
    position: relative;
  }
  
  .modal-album-cover {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 18px;
    color: white;
    cursor: pointer;
  }
  
  .close-button:hover {
    color: #666;
  }
  
  .rating-section {
    margin-top: 20px;
  }
  
  .stars {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
  
  .star {
    font-size: 30px;
    cursor: pointer;
    color: #ccc;
    transition: color 0.2s;
  }
  
  .star.filled {
    color: #ffd700; /* Cor das estrelas preenchidas */
  }
  
  .star:hover {
    color: #ffcc00; /* Cor ao passar o mouse */
  }
  
  .rating-section h3 {
    margin-bottom: 10px;
  }
  </style>
  