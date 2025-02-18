<template>
  <div class="login-form">
    <button class="close-button" @click="$emit('close')">
      <i class="bi bi-x-circle-fill"></i>
    </button>
    <h2>Login</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button class="login-button" @click="login">Login</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['loginUser', 'fetchUser']),
    async login() {
      const payload = {
        emailAdd: this.email,
        password: this.password,
      };
      const response = await this.loginUser(payload);

      if (response && response.token) {
        // Fetch the user data after logging in
        await this.fetchUser(response.user.userID);
        // Redirect to the About page
        this.$router.push({ name: 'about' });
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.login-form {
  position: absolute;
  width: 320px;
  padding: 20px;
  background-color: rgba(34, 40, 49, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(72, 187, 120, 0.5);
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #f5f5f5;
}

h2 {
  text-align: center;
  color: #48bb78;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 22px;
  color: #a0aec0;
  cursor: pointer;
}

.close-button:hover {
  color: #f5f5f5;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #4a5568;
  border-radius: 6px;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

input::placeholder {
  color: #a0aec0;
}

.login-button {
  background-color: #48bb78;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;
}

.login-button:hover {
  background-color: #38a169;
}
</style>
