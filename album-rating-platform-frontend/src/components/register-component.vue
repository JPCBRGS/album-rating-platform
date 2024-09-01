<!-- src/components/register-component.vue -->
<template>
  <div class="register-container">
    <div class="register-form">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <ButtonComponent type="submit" text="Register" />
      </form>
    </div>
  </div>
</template>

<script>
import ButtonComponent from './button-component.vue';

export default {
  name: 'register-component',
  components: {
    ButtonComponent
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async registerUser() {
      const response = await fetch('http://localhost:3000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          email: this.email,
          password: this.password
        })
      });

      const result = await response.json();
      if (response.ok) {
        this.$router.push('/login'); // Redireciona para a página de login
        alert('User registered successfully');
      } else {
        alert(result.error || 'Registration failed');
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

.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.register-form {
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

.error {
  color: red;
  margin-top: 1rem;
}
</style>