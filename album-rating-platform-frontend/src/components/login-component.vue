<!-- src/components/login-component.vue -->
<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit" :disabled="loading" class="submit-button">
          <span v-if="loading">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login-component',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    async loginUser() {
      this.loading = true;
      this.errorMessage = '';

      try {
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        const result = await response.json();
        if (response.ok) {
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('isLoggedIn', 'true');
          this.$router.push('/main'); // Redireciona para a página principal
        } else {
          this.errorMessage = result.message || 'Login failed';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again later.';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  background-color: #121212; /* Fundo escuro */
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background: #1e1e1e; /* Fundo do formulário escuro */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-sizing: border-box; /* Garante que padding e border sejam incluídos na largura total */
}

h2 {
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #ffffff; /* Cor do texto */
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #cccccc; /* Cor do texto do rótulo */
}

input {
  width: calc(100% - 2px); /* Ajusta a largura dos campos para se ajustar ao padding do formulário */
  padding: 0.75rem;
  border: 1px solid #333;
  border-radius: 4px;
  font-size: 1rem;
  color: #ffffff;
  background: #333;
  box-sizing: border-box; /* Garante que padding e border sejam incluídos na largura total */
}

input:focus {
  border-color: #4f7dff;
  outline: none;
}

.submit-button {
  background: #4f7dff;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-button:hover {
  background: #2a56d4;
}

.submit-button:disabled {
  background: #aab0b7;
  cursor: not-allowed;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
