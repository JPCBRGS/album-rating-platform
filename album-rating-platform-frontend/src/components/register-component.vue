<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="username">Username:</label>
          <input type="text" v-model="username" id="username" required />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" v-model="email" id="email" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" v-model="password" id="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'register-component',
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
          alert('User registered successfully');
        } else {
          alert(result.error || 'Registration failed');
        }
      }
    }
  }
  </script>
  