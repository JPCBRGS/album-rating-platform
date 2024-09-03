<template>
    <div v-if="isOpen" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-button" @click="close">X</button>
        <img :src="album?.images[0]?.url" alt="album cover" class="modal-album-cover" />
        <h2>{{ album?.name }}</h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'album-modal-component',
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      album: {
        type: Object,
        default: null
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
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
    padding: 40px; /* Aumentado para dar mais margem ao redor da imagem */
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
    margin-bottom: 20px; /* Aumenta o espaçamento entre a imagem e o texto */
  }
  
  .close-button {
    position: absolute;
    top: 10px; /* Distanciado do topo da borda do modal */
    right: 10px; /* Distanciado da borda direita do modal */
    background: transparent;
    border: none;
    font-size: 18px; /* Tamanho da fonte reduzido */
    color: black;
    cursor: pointer;
  }
  
  .close-button:hover {
    color: #666; /* Cor mais clara ao passar o mouse */
  }
  </style>
  