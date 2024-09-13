<template>
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SpinnerComp',
    data() {
      return {
        isLoading: true, 
      };
    },
    mounted() {
      setTimeout(() => {
        this.isLoading = false;
      }, 5000);
    },
  };
  </script>
  
  <style>
  
  </style>
  