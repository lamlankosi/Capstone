<!-- components/EditProductModal.vue -->
<template>
    <div v-if="visible" class="modal-backdrop">
      <div class="modal">
        <div class="modal-header">
          <h3>Edit Product</h3>
          <button class="close-btn" @click="$emit('update:visible', false)">X</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="updateProduct">
            <div class="form-group">
              <label for="prodName">Product Name</label>
              <input v-model="editedProduct.prodName" type="text" id="prodName" required />
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <input v-model="editedProduct.category" type="text" id="category" required />
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea v-model="editedProduct.description" id="description" required></textarea>
            </div>
            <div class="form-group">
              <label for="stock">Stock</label>
              <input v-model="editedProduct.stock" type="number" id="stock" required />
            </div>
            <div class="form-group">
              <label for="price">Price</label>
              <input v-model="editedProduct.price" type="number" id="price" required />
            </div>
            <div class="form-group">
              <label for="prodUrl">Image URL</label>
              <input v-model="editedProduct.prodUrl" type="url" id="prodUrl" required />
            </div>
            <button type="submit" class="btn btn-primary">Update Product</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true,
      },
      product: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        editedProduct: { ...this.product },
      };
    },
    methods: {
      updateProduct() {
        this.$emit('update-product', this.editedProduct);
        this.$emit('update:visible', false); // Close the modal after update
      },
    },
    watch: {
      product(newProduct) {
        this.editedProduct = { ...newProduct };
      },
    },
  };
  </script>
  
  <style scoped>
 .modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure the modal appears above other content */
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  width: 100%;
  z-index: 10000; /* Ensure the modal is above the backdrop */
}

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  .form-group {
    margin-bottom: 10px;
  }
  input,
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
  }
  button {
    background-color: black;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  