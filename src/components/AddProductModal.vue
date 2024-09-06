<template>
  <div  v-if="visible"  class="modal-overlay">
    <div class="modal-content">
      <h3>Add New Product</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="prodName">Product Name</label>
          <input v-model="newProduct.prodName" type="text" id="prodName" required>
        </div>
        <div class="form-group">
          <label for="category">Category</label>
          <input v-model="newProduct.category" type="text" id="category" required>
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input v-model="newProduct.description" type="text" id="description" required>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity</label>
          <input v-model="newProduct.quantity" type="number" id="quantity" required>
        </div>
        <div class="form-group">
          <label for="amount">Amount (R)</label>
          <input v-model="newProduct.amount" type="number" id="amount" required>
        </div>
        <div class="form-group">
          <label for="prodUrl">Product Image URL</label>
          <input v-model="newProduct.prodUrl" type="text" id="prodUrl" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Product</button>
        <button type="button" @click="$emit('update:visible', false)" class="btn btn-secondary">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newProduct: {
        prodName: '',
        category: '',
        description: '',
        quantity: 0,
        amount: 0,
        prodUrl: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$emit('add-product', this.newProduct);
      this.$emit('update:visible', false);
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
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
</style>




