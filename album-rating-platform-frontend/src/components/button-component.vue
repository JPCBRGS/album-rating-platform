<template>
    <button :class="buttonClass" :style="buttonStyle" @click="handleClick" :disabled="disabled">
      <span v-if="loading">Loading...</span>
      <span v-else>{{ text }}</span>
    </button>
  </template>
  
  <script>
  export default {
    name: 'button-component',
    props: {
      text: {
        type: String,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      buttonType: {
        type: String,
        default: 'submit'
      },
      variant: {
        type: String,
        default: 'primary'
      }
    },
    computed: {
      buttonClass() {
        return `button ${this.variant}`;
      },
      buttonStyle() {
        return {
          width: '100%',
          maxWidth: '400px'
        };
      }
    },
    methods: {
      handleClick(event) {
        this.$emit('click', event);
      }
    }
  }
  </script>
  
  <style scoped>
  .button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    text-align: center;
    display: inline-block;
    width: 100%;
    box-sizing: border-box; /* Garante que padding e border sejam incluídos na largura total */
  }
  
  .button.primary {
    background: #4f7dff;
    color: white;
  }
  
  .button.primary:hover {
    background: #2a56d4;
  }
  
  .button.primary:disabled {
    background: #aab0b7;
    cursor: not-allowed;
  }
  </style>
  