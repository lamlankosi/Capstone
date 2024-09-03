<template>
  <div class="about">
    <h1>This is an about page</h1>
  <div class="product-container">
    <div class="product-title">
      <h2>products</h2>
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
        </tr>
        <tr v-for="product in products" :key="product.prodID">
        <td>{{ product.prodID }}</td>
        <td><img :src="product.prodUrl" :alt="product.prodName" class="product-image"></td>
        <td>{{ product.prodName }}</td>
        <td>{{ product.category }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.quantity }}</td>
        <td>{{ product.amount }}</td>
      </tr>
      </table>
    </div>
  </div>
  <div class="user-container">
    <div class="user-title">
      Users
    </div>
    <div class="products-table">
      <table>
        <tr>
          <th>User ID</th>
          <th>Profile</th>
          <th>firstName</th>
          <th>Surname</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Role</th>
          <th>Email Address</th>
          <th>Password</th>
        </tr>
        <tr v-for="user in users" :key="user.userID">
          <td>{{ user.userID }}</td>
          <td><img :src="user.profileURL" :alt="user.firstName" class="product-image"></td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.userAge }}</td>
          <td>{{ user.Gender }}</td>
          <td>{{ user.userRole }}</td>
          <td>{{ user.emailAdd }}</td>
          <td>{{ user.password }}</td>
        </tr>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
export default{
  name: 'AboutView',
  computed:{
    products(){
      return this.$store.state.products
    },
    users(){
      return this.$store.state.users
    }
  },
  mounted(){
    this.$store.dispatch('fetchProducts'),
    this.$store.dispatch('fetchUsers')
  }
 
}

</script>

<style>.about {
  padding-left: 15rem; 
}

.products-table {
  margin-top: 20px;
  margin-right: 5rem;
  margin-bottom: 5rem;
  overflow-x: auto;
}

.products-table table {
  width: 100%;
  border-collapse: collapse;
  min-width: 600px; 
}

.products-table th, .products-table td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.products-table img {
  display: block;
}

.product-image {
  width: 100px;
  height: auto;
  margin-right: 15px;
  border-radius: 4px;
}

/* Add a media query for smaller screens */
@media (max-width: 768px) {
  .about {
    padding-left: 0; /* Remove padding on small screens */
  }

  .products-table table {
    min-width: 100%; /* Ensure table fits on small screens */
  }
}

</style>