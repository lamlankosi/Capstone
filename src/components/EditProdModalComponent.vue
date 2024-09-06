<template>
    <div v-if="visible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <h2>Edit Product</h2>
        <form @submit.prevent="updateProduct">
          <div class="form-group">
            <label for="editProdName">Product Name</label>
            <input id="editProdName" v-model="localProduct.prodName" type="text" required />
          </div>
          <div class="form-group">
            <label for="editAmount">Amount</label>
            <input id="editAmount" v-model="localProduct.amount" type="number" required />
          </div>
          <div class="form-group">
            <label for="editQuantity">Quantity</label>
            <input id="editQuantity" v-model="localProduct.quantity" type="number" required />
          </div>
          <div class="form-group">
            <label for="editCategory">Category</label>
            <input id="editCategory" v-model="localProduct.category" type="text" required />
          </div>
          <div class="form-group">
            <label for="editProdUrl">Image URL</label>
            <input id="editProdUrl" v-model="localProduct.prodUrl" type="text" required />
          </div>
          <button type="submit" class="btn-primary">Update Product</button>
          <button @click="cancelEdit" class="btn-secondary">Cancel</button>
        </form>
        <button class="modal-close" @click="closeModal">X</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      product: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        localProduct: { ...this.product }
      };
    },
    methods: {
      closeModal() {
        this.$emit('update:visible', false);
      },
      async updateProduct() {
        this.$emit('update-product', this.localProduct);
        this.closeModal();
      },
      cancelEdit() {
        this.closeModal();
      }
    }
  }
  </script>
  
  <style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}
  
.modal-content {
  position: absolute;
  width: 300px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.1); 
  border-radius: 10px;
  box-shadow: 0 2px 10px rgb(68, 255, 0);
  backdrop-filter: blur(10px); 
  display: flex;
  flex-direction: column;
  gap: 15px;
}
  
.modal-close {
    position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
}
  
.form-group {
    margin-bottom: 20px;
}
  
.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}
  
.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 5px;
  font-size: 14px;  
}
  
.btn-primary {
  background-color: #5a67d8;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
  
.btn-secondary {
    background-color: #a89f91;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
}
  </style>
  