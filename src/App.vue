<template>
  <div>
    <nav v-if="$route.name !== 'HomeView'">
      <router-link to="/">sign out</router-link> |
      <router-link to="/dashboard">Dashboard</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style src="@/assets/css/style.css"></style>
