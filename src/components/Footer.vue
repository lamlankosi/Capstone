<template>
<<<<<<< HEAD
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
=======
  <div class="footer">
        <div class="Footer">
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
>>>>>>> 1377d368b4c319a492328efd0625939f8154d567
  }
  </script>
  
  <style scoped>
  .footer {
  background: #2E8B57;
  color: white;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  font-size: 14px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  position: relative; /* Fixes overlapping */
  bottom: 0;
}
  </style>