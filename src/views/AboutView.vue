<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="content">
      Welcome to Lamla Gaming Store, your ultimate destination for all things gaming! We specialize in offering a wide range of video game consoles and games to cater to every type of gamer. Whether you're a fan of the latest cutting-edge systems or looking for classic retro consoles, we’ve got you covered. Our extensive catalog includes the hottest new releases, exclusive titles, and beloved classics across all major platforms. Owned and managed by Lamlankosi Nomnganga, who oversees every aspect of the business, we're dedicated to providing a seamless shopping experience with competitive prices, fast shipping, and exceptional customer service. Dive into the world of gaming with us and elevate your entertainment to the next level!
    </div>

    <!-- user -->
    <!-- <div v-if="user" class="logged-in-user">
      <div class="user-profile">
        <img :src="user.profileURL" :alt="user.firstName" class="profile-image">
      </div>
      <div class="user-info">
        <h2 class="fw-bold">{{ user.firstName }} {{ user.lastName }}</h2>
        <p><span class="fw-bold">Age:</span> {{ user.userAge }}</p>
        <p><span class="fw-bold">Gender:</span> {{ user.Gender }}</p>
        <p><span class="fw-bold">Role:</span>{{ user.userRole }}</p>
        <p><span class="fw-bold">Email:</span> {{ user.emailAdd }}</p>
      </div>
    </div> -->
    
    <!-- products -->
    <!-- <div v-if="products.length" class="product-container">
      <div class="product-title">
        <h2>Products</h2>
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
            <td>R{{ product.amount }}</td>
          </tr>
        </table>
      </div>
    </div>
     -->
    
     <!-- user -->
    <!-- <div v-if="users.length" class="user-container">
      <div class="user-title">
        Users
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'AboutView',
  computed: {
    products() {
      return this.$store.state.products || []
    },
    users() {
      return this.$store.state.users || []
    },
    user() {
      return this.$store.state.user || null
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


<style>
.about {
  padding-left: 15rem;
  background-image: url(https://lamlankosi.github.io/eCommerce-Images/gamingBackground.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: #f0f0f0;
}

.logged-in-user {
  display: flex;
  align-items: center;
  width: 93%;
  margin-bottom: 2rem;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-profile {
  margin-right: 20px;
}

.profile-image {
  width: 150px;
  height: 150px;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-info h2 {
  margin: 0;
  font-size: 24px;
  color: #333;
}

.user-info p {
  margin: 4px 0;
  font-size: 18px;
  color: #555;
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


</style>
