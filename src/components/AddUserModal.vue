<template>
  <div  v-if="visible"  class="modal-overlay">
    <div class="modal-content">
      <h3>Add New user</h3>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="profileURL">Product Name</label>
          <input v-model="newUser.profileURL" type="text" id="prodName" required>
        </div>
        <div class="form-group">
          <label for="lastName">lastName</label>
          <input v-model="newUser.lastName" type="text" id="category" required>
        </div>
        <div class="form-group">
          <label for="userAge">userAge</label>
          <input v-model="newUser.userAge" type="number" id="description" required>
        </div>
        <div class="form-group">
          <label for="Gender">Gender</label>
          <input v-model="newUser.Gender" type="text" id="Gender" required>
        </div>
        <div class="form-group">
          <label for="userRole">userRole (R)</label>
          <input v-model="newUser.userRole" type="text" id="userRole" required>
        </div>
        <div class="form-group">
          <label for="emailAdd">Product Image URL</label>
          <input v-model="newUser.emailAdd" type="text" id="emailAdd" required>
        </div>
        <div class="form-group">
          <label for="password">Product Image URL</label>
          <input v-model="newUser.password" type="text" id="password" required>
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
        profileURL: '',
        firstName: '',
        lastName: '',
        userAge: '',
        Gender: '',
        emailAdd:'',
        password: '',
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
