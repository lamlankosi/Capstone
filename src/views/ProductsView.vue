<template>
  <div class="admin">
    <h1>Products Page</h1>

    <div class="product-container">
      <div class="product-title">
        <h2>Products</h2>
        <div class="controls">
          <input type="text" v-model="searchQuery" class="input" placeholder="Search by name or category" />
          <select v-model="selectedCategory" class="input">
            <option value="">All Categories</option>
            <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}</option>
          </select>
          <select v-model="sortOrder" class="input">
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
          <button class="btn" @click="showAddProductModal = true">Add Product</button>
        </div>

<<<<<<< HEAD
        <div class="products-table">
          <table>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th @click="toggleSort">Price <span>{{ sortOrder === 'asc' ? '▲' : '▼' }}</span></th>
              <th>Actions</th>
            </tr>
            <tr v-if="sortedAndFilteredProducts.length === 0">
              <td colspan="7" class="no-products">No products available</td>
            </tr>
            <tr v-for="product in sortedAndFilteredProducts" :key="product.prodID">
              <td>{{ product.prodID }}</td>
              <td><img :src="product.prodUrl" :alt="product.prodName" class="product-image" loading="lazy" /></td>
              <td>{{ product.prodName }}</td>
              <td>{{ product.category }}</td>
              <td>{{ product.stock }}</td>
              <td>R{{ product.price }}</td>
              <td class="actions">
                <button @click="openEditModal(product)"><i class="bi bi-pencil"></i></button>
                <button @click="deleteProduct(product.prodID)"><i class="bi bi-trash"></i></button>
              </td>
            </tr>
          </table>
        </div>
=======
        <!-- Products Table -->
    <!-- Products Table -->
<div class="products-table table-responsive">
  <table>
    <tr>
      <th>Product ID</th>
      <th>Image</th>
      <th>Product Name</th>
      <th>Category</th>
      <th>Description</th>
      <th>Stock</th>
      <th @click="sortOrder = sortOrder === 'asc' ? 'desc' : 'asc'">
        Amount
        <span v-if="sortOrder === 'asc'">&#9650;</span>
        <span v-else>&#9660;</span>
      </th>
      <th>Actions</th>
    </tr>
    <tr v-if="sortedAndFilteredProducts.length === 0">
      <td colspan="8" class="no-products">No products available</td>
    </tr>
    <tr v-else v-for="product in sortedAndFilteredProducts" :key="product.prodID">
      <td>{{ product.prodID }}</td>
      <td><img :src="product.prodUrl" :alt="product.prodName" class="product-image" loading="lazy" /></td>
      <td>{{ product.prodName }}</td>
      <td>{{ product.category }}</td>
      <td>{{ product.description }}</td>
      <td>{{ product.stock }}</td>
      <td>R{{ product.price }}</td>
      <td class="actions">
        <button @click="openEditModal(product)"><i class="bi bi-pencil"></i></button>
        <button @click="deleteProduct(product.prodID)"><i class="bi bi-trash"></i></button>
      </td>
    </tr>
  </table>
</div>

>>>>>>> 1377d368b4c319a492328efd0625939f8154d567
      </div>
    </div>

    <AddProductModal :visible="showAddProductModal" @update:visible="showAddProductModal = false" @add-product="handleAddProduct" />
    <EditProductModal :visible="showEditProductModal" :product="selectedProduct" @update:visible="showEditProductModal = false" />
  </div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal.vue';
import EditProductModal from '@/components/EditProductModal.vue';

export default {
  name: 'ProductsView',
  components: { AddProductModal, EditProductModal },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '',
      sortOrder: 'asc',
      showAddProductModal: false,
      showEditProductModal: false,
      selectedProduct: null,
    };
  },
  computed: {
    products() {
      return this.$store.state.products || [];
    },
    uniqueCategories() {
      return [...new Set(this.products.map(product => product.category))];
    },
    sortedAndFilteredProducts() {
      return this.products.filter(product => {
        const search = this.searchQuery.toLowerCase();
        return (
          product.prodName.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
        ) && (!this.selectedCategory || product.category === this.selectedCategory);
      }).sort((a, b) => this.sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    }
  },
  methods: {
    handleAddProduct(product) {
      this.$store.dispatch('addAProduct', product);
    },
    async deleteProduct(productID) {
      await this.$store.dispatch('deleteProduct', productID);
    },
    openEditModal(product) {
      this.selectedProduct = product;
      this.showEditProductModal = true;
    },
    toggleSort() {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }
  },
  async mounted() {
    await this.$store.dispatch('fetchProducts');
  }
};
</script>

<style scoped>
.admin {
  padding: 20px;
  background: #121212;
  color: #fff;
}

h1, h2 {
  text-align: center;
  font-size: 1.5rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.input, .btn {
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
}

.input {
  background: #1e1e1e;
  color: #fff;
}

.btn {
  background: #007bff;
  color: white;
  cursor: pointer;
}

.products-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #1e1e1e;
  color: white;
  border-radius: 10px;
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #333;
  text-align: center;
}

th {
  cursor: pointer;
}

.product-image {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  object-fit: cover;
}

.actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: center;
  }
  table {
    font-size: 0.9rem;
  }
}

@media (max-width: 320px) {
  .admin {
    padding: 10px;
  }
  .input, .btn {
    width: 100%;
  }
  table {
    font-size: 0.8rem;
  }
}


</style>
