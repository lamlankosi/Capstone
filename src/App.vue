<template>
  <div class="wrapper">
    <NavbarComponent/>
    <main class="main-content ">
      <router-view/>
    </main>
  <Footer/>

  </div>

</template>

<script>
import Footer from '@/components/Footer.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'

export default {
  name: 'App',
  components:{
    Footer,
    NavbarComponent
  }
}
</script>

<style src="@/assets/css/style.css">


</style>


