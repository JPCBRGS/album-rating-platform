<template>
  <div class="profile-container">
    <h1>My Profile</h1>
    <div class="profile-info">
      <div class="profile-field">
        <label for="username">Username:</label>
        <input 
          type="text" 
          v-model="username" 
          id="username" 
          :disabled="!isEditing" 
        />
      </div>
      <div class="profile-field">
        <label for="email">Email:</label>
        <input 
          type="email" 
          v-model="email" 
          id="email" 
          :disabled="!isEditing" 
        />
      </div>
      <div class="profile-field">
        <label for="password">Password:</label>
        <input 
          type="password" 
          v-model="password" 
          id="password" 
          :disabled="!isEditing" 
        />
      </div>
    </div>
    <button @click="editProfile" v-if="!isEditing">Edit</button>
    <button @click="saveProfile" v-if="isEditing">Save</button>
  </div>
</template>

<script>
export default {
  name: 'profile-component',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      isEditing: false
    };
  },
  created() {
    this.loadProfile();
  },
  methods: {
    async loadProfile() {
      // Carregar informações do perfil do usuário
      // Substitua com a lógica real para obter os dados do perfil
      this.username = 'JohnDoe';
      this.email = 'john.doe@example.com';
      this.password = '********'; // Não mostre a senha real
    },
    editProfile() {
      this.isEditing = !this.isEditing;
    },
    async saveProfile() {
      const response = await fetch('http://localhost:3000/users/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          newUsername: this.username,
          newEmail: this.email,
          newPassword: this.password
        })
      });

      const result = await response.json();
      if (response.ok) {
        this.isEditing = false;
        alert('Profile updated successfully');
        // Você pode adicionar lógica para atualizar a interface ou redirecionar o usuário aqui
      } else {
        alert(result.error || 'Failed to update profile');
      }
    }
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 1rem;
  background-color: #1e1e1e;
  color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.profile-info {
  margin-bottom: 1rem;
}

.profile-field {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  background: #333;
  color: #ffffff;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
  font-size: 1rem;
}

button:hover {
  opacity: 0.8;
}
</style>
