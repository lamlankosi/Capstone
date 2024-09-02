<template>
  <div class="register-form">
    <h2>Register</h2>
    <button class="close-button" @click="$emit('close')"><i class="bi bi-x-circle-fill"></i></button>
    <input type="text" v-model="firstName" placeholder="First Name" required />
    <input type="text" v-model="lastName" placeholder="Last Name" required />
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <input type="text" v-model="Gender" placeholder="Gender" required />
    <input type="text" v-model="userAge" placeholder="Age" required />
    <button class="register-button" @click="register">Register</button>
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


.register-form {
  position: absolute;
  width: 300px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1); 
  border-radius: 10px;
  box-shadow: 0 2px 10px rgb(68, 255, 0);
  backdrop-filter: blur(10px); 
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

.register-form {
  display: flex;
  flex-direction: column;
  gap: 15px; 
}

input{
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;
}

.register-button {
  background-color: #5a67d8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.register-button:hover {
  background-color: #4c51bf;
}

</style>
