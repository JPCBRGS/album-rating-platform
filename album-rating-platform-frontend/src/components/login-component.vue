<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit" :disabled="loading">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
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
.error {
  color: red;
}
</style>
