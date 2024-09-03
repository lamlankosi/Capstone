<template>
    <div class="login-form">
      <button class="close-button" @click="$emit('close')"><i class="bi bi-x-circle-fill"></i></button>
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
    ...mapActions(['loginUser']),
    async login() {
      const payload = {
        emailAdd: this.email,
        password: this.password,
      };
      await this.loginUser(payload);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>

.login-form {
  position: absolute;
  width: 300px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1); 
  border-radius: 10px;
  box-shadow: 0 2px 10px rgb(68, 255, 0);
  backdrop-filter: blur(10px); 
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}

.close-button:hover {
  color: #000;
}



input[type="password"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
}

.login-button {
  background-color: #5a67d8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #4c51bf;
}
</style>
