<template>
  <div class="register-form">
    <h2>Register</h2>
    <input type="text" v-model="firstName" placeholder="First Name" required />
    <input type="text" v-model="lastName" placeholder="Last Name" required />
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <input type="text" v-model="Gender" placeholder="Gender" required />
    <input type="text" v-model="userAge" placeholder="Age" required />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegisterUserComponent',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      Gender: '',
      userAge: '',
      profileURL: ''
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    async register() {
      const payload = {
        FirstName: this.firstName,
        LastName: this.lastName,
        EmailAdd: this.email,
        password: this.password,
        Gender: this.Gender, 
        userAge: this.userAge,
        userRole: 'User', 
        profileURL: '', 
      };
      await this.registerUser(payload);
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.register-form{
  position: absolute;
}

</style>
