<template>
  <div v-if="$route.name !== 'HomeView'" class="side-navbar" :class="{ 'side-navbar-collapsed': isCollapsed }">
    <ul>
      <li class="navbar-toggler-wrapper">
        <button class="navbar-toggler" type="button" @click="toggleNavbar">
          <span class="navbar-toggler-icon">
            <transition name="arrow-fade">
              <i v-if="!isCollapsed" class="bi bi-arrow-left-circle"></i>
            </transition>
            <transition name="arrow-fade">
              <i v-if="isCollapsed" class="bi bi-arrow-right-circle"></i>
            </transition>
          </span>
        </button>
      </li>
      <div class="router-links">
        <li>
          <router-link to="/">
            <i class="bi bi-house-fill"></i>
            <span v-if="!isCollapsed"> Home</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about">
            <i class="bi bi-file-earmark-post"></i>
            <span v-if="!isCollapsed"> About</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin">
            <i class="bi bi-building-fill"></i>
            <span v-if="!isCollapsed"> Admin</span>
          </router-link>
        </li>
        <li>
          <router-link to="/admin">
            <i class="bi bi-person-circle"></i>
            <span v-if="!isCollapsed"> Customers</span>
          </router-link>
        </li>
        <li>
          <router-link to="/report">
            <i class="bi bi-envelope-fill"></i>
            <span v-if="!isCollapsed"> Report Bug</span>
          </router-link>
        </li>
      </div>
    </ul>
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
  methods: {
    toggleNavbar() {
      this.isCollapsed = !this.isCollapsed;
    },
  },
};
</script>

<style>
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
}

.side-navbar-collapsed {
  width: 80px;
}

.navbar-toggler-wrapper {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.navbar-toggler {
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 5px;
}

.navbar-toggler-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
}

.arrow-fade-enter-active, .arrow-fade-leave-active {
  transition: opacity 0.3s ease;
}

.arrow-fade-enter, .arrow-fade-leave-to {
  opacity: 0;
}

.side-navbar ul {
  list-style: none;
  margin: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.router-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.side-navbar li {
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
}

.side-navbar a {
  color: #ecf0f1;
  text-decoration: none;
  font-size: 18px;
  display: flex;
  align-items: center;
}

.side-navbar a i {
  margin-right: 10px;
}

.side-navbar a:hover {
  color: #1abc9c;
}

.bi {
  color: white;
}


</style>
