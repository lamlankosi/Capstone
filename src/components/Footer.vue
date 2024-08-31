<template>
  <div class="container-fluid">
        <div class="row">
            <p class="lead">
                Lamlankosi Nomnganga &copy; <span id="currYear"> {{ cYear  }}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FooterComponent',
    data(){
        return{
           cYear: new Date().getUTCFullYear()
       }
  }
}
</script>

<style scoped>

.container-fluid{
    background: grey;
    color: white;
}

</style>