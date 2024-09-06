<template>
    <div class="modal" v-if="isVisible">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Edit {{ isUser ? 'User' : 'Product' }}</h2>
  
        <!-- If editing a user -->
        <div v-if="isUser">
          <input v-model="editedUser.firstName" placeholder="First Name" />
          <input v-model="editedUser.lastName" placeholder="Last Name" />
          <input v-model="editedUser.emailAdd" placeholder="Email Address" />
          <!-- Add more user fields as needed -->
          <button @click="updateUser">Save User</button>
        </div>
  
        <!-- If editing a product -->
        <div v-if="!isUser">
          <input v-model="editedProduct.prodName" placeholder="Product Name" />
          <input v-model="editedProduct.category" placeholder="Category" />
          <input v-model="editedProduct.price" placeholder="Price" />
          <!-- Add more product fields as needed -->
          <button @click="updateProduct">Save Product</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      isUser: Boolean,
      user: Object,
      product: Object,
    },
    data() {
      return {
        editedUser: { ...this.user },
        editedProduct: { ...this.product },
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      updateUser() {
        this.$store.dispatch('updateUser', this.editedUser);
        this.closeModal();
      },
      updateProduct() {
        this.$store.dispatch('updateProduct', this.editedProduct);
        this.closeModal();
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    display: block;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  