<template>
  <div v-if="$route.name !== 'HomeView'" class="d-flex flex-column flex-shrink-0 p-3 side-navbar" :class="{ 'side-navbar-collapsed': isCollapsed }" style="width: auto">
    <!-- Toggler button to collapse the sidebar -->
    <button class="btn btn-toggle d-flex align-items-center justify-content-between" type="button" @click="toggleNavbar">
      <span>
        <transition name="arrow-fade">
          <i v-if="!isCollapsed" class="bi bi-arrow-left-circle"></i>
        </transition>
        <transition name="arrow-fade">
          <i v-if="isCollapsed" class="bi bi-arrow-right-circle"></i>
        </transition>
      </span>
    </button>

    <!-- Collapsing navbar content -->
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link class="nav-link d-flex align-items-center" to="/">
          <i class="bi bi-house-fill"></i>
          <span v-if="!isCollapsed" class="ms-2">Home</span>
        </router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link d-flex align-items-center" to="/about">
          <i class="bi bi-file-earmark-post"></i>
          <span v-if="!isCollapsed" class="ms-2">About</span>
        </router-link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="bi bi-building-fill"></i>
          <span v-if="!isCollapsed" class="ms-2">Admin</span>
        </a>
        <ul class="dropdown-menu bg-success" aria-labelledby="navbarDropdown">
          <li><router-link class="dropdown-item" to="/users">Users</router-link></li>
          <li><router-link class="dropdown-item" to="/products">Products</router-link></li>
          <li><router-link class="dropdown-item" to="/orders">Orders</router-link></li>
          <li><router-link class="dropdown-item" to="/report">Report</router-link></li>
        </ul>
      </li>
      <li class="nav-item">
        <router-link class="nav-link d-flex align-items-center" to="/contactUs">
          <i class="bi bi-envelope-fill"></i>
          <span v-if="!isCollapsed" class="ms-2">Report Bug</span>
        </router-link>
      </li>
    </ul>

    <!-- User info section -->
    <div class="dropdown user-info" v-if="loggedInUser">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img :src="loggedInUser.imageURL" alt="User Profile" width="32" height="32" class="rounded-circle me-2">
        <strong v-if="!isCollapsed">{{ loggedInUser.firstName }}</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
        <li><a class="dropdown-item" href="#" @click="signOut">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      isCollapsed: false,
    };
  },
  
  computed:{
      loggedInUser() {
        return this.$store.state.user;
      }
    },
  methods: {
    toggleNavbar() {
      this.isCollapsed = !this.isCollapsed;
    },
    
    signOut() {
            this.$router.push('/');
      }

  },
};
</script>

<style scoped>
.side-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 200px;
  height: 100vh;
  background-color: #2c3e50;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;
  z-index: 1000;
  padding-top: 20px;
}

.side-navbar-collapsed {
  width: 80px;
}

.side-navbar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-navbar a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.side-navbar a:hover {
  color: #1abc9c;
}

.bi {
  color: white;
  margin-right: 10px;
}

.arrow-fade-enter-active,
.arrow-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.arrow-fade-enter,
.arrow-fade-leave-to {
  opacity: 0;
  transform: rotate(180deg);
}

.ms-2 {
  margin-left: 10px;
}

.side-navbar-collapsed .nav-link span {
  display: none;
}
</style>
