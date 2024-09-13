<template>
  <div class="admin">
    <h1>Products Page</h1>

    <!-- products -->
    <div class="product-container">
      <div class="product-title">
        <h2>Products</h2>
        <div class="row gap-2">
          <div class="d-flex flex-wrap gap-3">
            <!-- Search Input -->
            <div class="col-md-2">
              <input type="text" v-model="searchQuery" class="form-control" placeholder="Search by name or category" />
            </div>

            <!-- Category Filter -->
            <div class="col-md-2">
              <select v-model="selectedCategory" class="form-control">
                <option value="">All Categories</option>
                <option v-for="category in uniqueCategories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <!-- Sort By Price -->
            <div class="col-md-2">
              <select v-model="sortOrder" class="form-control">
                <option value="asc">Sort by Price: Low to High</option>
                <option value="desc">Sort by Price: High to Low</option>
              </select>
            </div>

            <!-- Add Product Button -->
            <div class="col-md-4">
              <button class="btn btn-primary" @click="showAddProductModal = true">
                Add Product
              </button>
            </div>
          </div>
        </div>

        <!-- Products Table -->
        <div class="products-table">
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
      </div>
    </div>

    <!-- Add Product Modal -->
    <AddProductModal :visible="showAddProductModal" @update:visible="showAddProductModal = false" @add-product="handleAddProduct" />

    <!-- Edit Product Modal -->
    <EditProductModal :visible="showEditProductModal" :product="selectedProduct" @update:visible="showEditProductModal = false" />
  </div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal.vue';
import EditProductModal from '@/components/EditProductModal.vue';

export default {
  name: 'ProductsView',
  components: {
    AddProductModal,
    EditProductModal,
  },
  data() {
    return {
      searchQuery: '',
      selectedCategory: '', // For category filtering
      sortOrder: 'asc', // For sorting price
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
      // Get unique categories for the dropdown
      const categories = this.products.map((product) => product.category);
      return [...new Set(categories)];
    },
    sortedAndFilteredProducts() {
      // Filter products by search query and selected category
      let filteredProducts = this.products.filter((product) => {
        const search = this.searchQuery.toLowerCase();
        const matchesSearch = product.prodName.toLowerCase().includes(search) || product.category.toLowerCase().includes(search);
        const matchesCategory = this.selectedCategory ? product.category === this.selectedCategory : true;
        return matchesSearch && matchesCategory;
      });

      // Sort products by price
      filteredProducts.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (this.sortOrder === 'asc') {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });

      return filteredProducts;
    },
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
  },
  async mounted() {
    await this.$store.dispatch('fetchProducts');
  },
};
</script>

<style scoped>
/* Styles remain the same */
button {
  background: black;
  border-radius: 10px;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
  cursor: pointer;
}

td img {
  max-width: 50px;
}

.actions i {
  margin: 0 5px;
  cursor: pointer;
}
</style>
