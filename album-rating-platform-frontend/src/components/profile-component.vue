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
      try {
        const email = localStorage.getItem('email'); // Recupera o email do localStorage
        if (!email) {
          alert('No user is logged in');
          return;
        }

        const response = await fetch(`http://localhost:3000/users/profile?email=${encodeURIComponent(email)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          this.username = data.username;
          this.email = data.email;
          // Não mostre a senha real; você pode optar por mostrar a senha como asteriscos ou algo semelhante
          this.password = '********';
        } else {
          alert('Failed to load profile');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        alert('Failed to load profile');
      }
    },
    async saveProfile() {
      try {
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
        } else {
          alert(result.error || 'Failed to update profile');
        }
      } catch (error) {
        console.error('Error saving profile:', error);
        alert('Failed to update profile');
      }
    },
    editProfile() {
      this.isEditing = !this.isEditing;
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
