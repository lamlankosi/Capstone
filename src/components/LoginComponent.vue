<template>
  <div class="login-form">
    <h2>Login</h2>
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button @click="login">Login</button>
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
    };
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

</style>
