<template>
<div class="admin">
    <h1>Admin Page</h1>

    <!-- user -->
    <div v-if="user" class="logged-in-user">
      <div class="user-profile">
        <img :src="user.profileURL" :alt="user.firstName" class="profile-image" loading="lazy">
      </div>
      <div class="user-info">
        <h2 class="fw-bold">{{ user.firstName }} {{ user.lastName }}</h2>
        <p><span class="fw-bold">Age:</span> {{ user.userAge }}</p>
        <p><span class="fw-bold">Gender:</span> {{ user.Gender }}</p>
        <p><span class="fw-bold">Role:</span>{{ user.userRole }}</p>
        <p><span class="fw-bold">Email:</span> {{ user.emailAdd }}</p>
      </div>
    </div>

    <!-- products -->
    <div class="product-container">
      <div class="product-title">
        <h2>Products</h2>
        <div class="row gap-2">

        <div class="d-flex flex-wrap gap-3">
          <div class="col-md-2">
            <input 
              type="text" 
              v-model="searchQuery" 
              class="form-control" 
              placeholder="Search by name or category"
            >
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary" @click="showAddProductModal = true">
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div class="products-table">
        <table>
          <tr>
            <th>Product ID</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
          <tr v-if="searchProducts.length === 0">
            <td colspan="7" class="no-products">Product not provided</td>
          </tr>
          <tr v-else v-for="product in searchProducts" :key="product.prodID">
            <td>{{ product.prodID }}</td>
            <td><img :src="product.prodUrl" :alt="product.prodName" class="product-image" loading="lazy"></td>
            <td>{{ product.prodName }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.quantity }}</td>
            <td>R{{ product.amount }}</td>
            <td class="actions">
              <button @click="editProduct(product)"><i class="bi bi-pencil" ></i></button>
              <button @click="deleteProduct(product.prodID)"><i class="bi bi-trash" ></i></button>
              
          
            </td>
          </tr>
        </table>
      </div>
    </div>

    <!-- users -->

    <div v-if="users.length" class="user-container">
      <div class="user-title">
        <h2>Users</h2>
        <div class="col-md-3">
            <h5 class="search">Search Users</h5>
            <input 
              type="text" 
              v-model="searchQueryuser" 
              class="form-control" 
              placeholder="Search by first Name or Surname"
            >
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary" @click="showAddUserModal = true">
              Add User
            </button>
          </div>
      </div>
      <div class="products-table">
        <table>
          <tr>
            <th>User ID</th>
            <th>Profile</th>
            <th>First Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Email Address</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
          <tr v-if="searchUsers.length === 0">
            <td colspan="7" class="no-products">User not on database</td>
          </tr>
          <tr v-else v-for="user in searchUsers" :key="user.userID">
            <td>{{ user.userID }}</td>
            <td><img :src="user.profileURL" :alt="user.firstName" class="product-image" loading="lazy"></td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.userAge }}</td>
            <td>{{ user.Gender }}</td>
            <td>{{ user.userRole }}</td>
            <td>{{ user.emailAdd }}</td>
            <td>{{ user.password }}</td>
            <td class="actions">
              
              <button @click="editUser(user)"><i class="bi bi-pencil" ></i></button>
              <button @click="deleteUser(user.userID)"><i class="bi bi-trash-fill"></i></button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <AddProductModal
      :visible="showAddProductModal"
      @update:visible="showAddProductModal = $event"
      @add-product="handleAddProduct"
    />

    <AddUserModal :visible="showAddUserModal" @update:visible="showAddUserModal = $event" @add-user="handleAddUser"/>

</div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal.vue'
import AddUserModal from '@/components/AddUserModal.vue';
export default {
  name: 'AdminView',
  components:{
    AddProductModal,
    AddUserModal
  },
  data() {
    return {
      searchQuery: '',
      searchQueryuser: '',
      showAddProductModal: false,
      selectedProduct: null,
      showAddUserModal: false,
      selectUser: null,
    }
  },
  computed: {
    products() {
      return this.$store.state.products || []
    },
    users() {
      return this.$store.state.users || []
    },
    user() {
      return this.$store.state.user || null
    },
    searchProducts() {
      return this.products.filter(product => {
        const search = this.searchQuery.toLowerCase()
        return (
          product.prodName.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
        )
      })
    },
    searchUsers() {
      return this.users.filter(user => {
        const search = this.searchQueryuser.toLowerCase()
        return (
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search)
        )
      })
    }
  },
  methods: {
    // Trigger the store action to delete a product
    async deleteProduct(productID) {
      await this.$store.dispatch('deleteProduct', productID)
    },
    // Open a modal or form to edit a product
    editProduct(product) {
      // Logic to open the modal and fill it with product details goes here
      // For example, you could store the product in a local data property for editing
      this.$store.commit('setProduct', product)
      // Then open the modal (you'd need a modal component)
    },
    // Trigger the store action to delete a user
    async deleteUser(userID) {
      await this.$store.dispatch('deleteUser', userID)
    },
    // Open a modal or form to edit a user
    editUser(user) {
      // Logic to open the modal and fill it with user details goes here
      this.$store.commit('setUser', user)
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProducts')
    await this.$store.dispatch('fetchUsers')
    
    const userId = this.$store.state.user?.userId
    if (userId) {
      await this.$store.dispatch('fetchUser', userId)
    }
  }
}
</script>

<style scoped>
button{
  background: black;
  border-radius: 10px;
}
</style>
