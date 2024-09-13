<template>
  <div class="footer">
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


.footer {
    background: #2E8B57;
    color: white;
    /* position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: 10px 0; */
}

</style>