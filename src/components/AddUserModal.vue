<template>
  <div  v-if="visible"  class="modal-overlay">
    <div class="modal-content">
      <h3>Add New user</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input v-model="newUser.firstName" type="text" id="prodName" required>
        </div>
        <div class="form-group">
          <label for="lastName">lastName</label>
          <input v-model="newUser.lastName" type="text" id="category" required>
        </div>
        <div class="form-group">
          <label for="gender">gender</label>
          <input v-model="newUser.gender" type="text" id="gender" required>
        </div>
        <div class="form-group">
          <label for="role">role (R)</label>
          <input v-model="newUser.role" type="text" id="role" required>
        </div>
        <div class="form-group">
          <label for="emailAdd">Email Address</label>
          <input v-model="newUser.emailAdd" type="text" id="emailAdd" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="newUser.password" type="text" id="password" required>
        </div>
        <div class="form-group">
          <label for="imageURL">Profile Image</label>
          <input v-model="newUser.imageURL" type="text" id="imageURL" required>
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
      newUser: {
        firstName: '',
        lastName: '',
        gender: '',
        role:'',
        emailAdd:'',
        password: '',
        imageURL: ''
      }
    };
  },
  methods: {
    submitForm() {
      this.$emit('add-user', this.newUser);
      this.$emit('update:visible', false);
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.modal-content {
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
