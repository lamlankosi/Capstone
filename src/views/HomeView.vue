<template>
  <div class="home">
    <div class="header">
      <button class="btn btn-primary" @click="showLogin = true">Login</button>
      <button class="btn btn-secondary" @click="showRegister = true">Register</button>
    </div>

    <div class="row align-items-center">
      <div class="col-lg-6">
        <h1>Lamla Gaming Store Inventory</h1>
        <p>The gaming inventory is a comprehensive collection of products catering to all gaming enthusiasts. It includes a wide range of gaming-related items such as video games, gaming consoles, and accessories like controllers and headsets. The inventory is meticulously organized to ensure easy navigation and accessibility, allowing users to quickly find the products they are looking for.</p>
      </div>
      <div class="col-lg-6">
        <img src="https://lamlankosi.github.io/project_images/eCommerce/61729c945a37af9be1d74bd4_VS3057_Universal Gaming Storage Tower_800x800_PRIMARY.png" alt="Inventory System Mockup" />
      </div>
    </div>

    <login-component v-if="showLogin" @close="showLogin = false" />
    <register-component v-if="showRegister" @close="showRegister = false" />
  </div>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue';
import RegisterComponent from '@/components/RegisterUserComponent.vue';

export default {
  name: 'HomeView',
  components: {
    LoginComponent,
    RegisterComponent,
  },
  data() {
    return {
      showLogin: false,
      showRegister: false,
    };
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: white;
  padding: 20px;
  
}

.header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
}

.header .btn {
  margin-left: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #3f51b5;
  color: white;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #1a237e;
}

.row {
  width: 100%;
}



img {
  width: 70%;
  height: auto;
}
</style>
