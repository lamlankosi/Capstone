<template>
  <div class="wrapper">
    <NavbarComponent/>
    <SpinnerComp/>
    <main class="main-content ">
      <router-view/>
    </main>
  <Footer/>

  </div>

</template>

<script>
import Footer from '@/components/Footer.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'
import SpinnerComp from '@/components/SpinnerComp.vue'
export default {
  name: 'App',
  components:{
    Footer,
    NavbarComponent,
    SpinnerComp
  }
}
</script>

<style src="@/assets/css/style.css">


</style>


