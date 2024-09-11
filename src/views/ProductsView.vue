<template>
  <div class="admin">
    <h1>Products Page</h1>

    <!-- products -->
    <div class="product-container">
      <div class="product-title">
        <h2>Products</h2>
        <div class="row gap-2">
          <div class="d-flex flex-wrap gap-3">
            <div class="col-md-2">
              <input type="text" v-model="searchQuery" class="form-control" placeholder="Search by name or category" />
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
              <th>Stock</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
            <tr v-if="searchProducts.length === 0">
              <td colspan="7" class="no-products">Product not provided</td>
            </tr>
            <tr v-else v-for="product in searchProducts" :key="product.prodID">
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
    <AddProductModal :visible="showAddProductModal" @update:visible="showAddProductModal = false"
      @add-product="handleAddProduct" />

      <!-- Edit Product Modal -->
      <EditProductModal
      :visible="showEditProductModal"
      :product="selectedProduct"
      @update:visible="showEditProductModal = false"
    />
  </div>
</template>

<script>
import AddProductModal from '@/components/AddProductModal.vue'
import EditProductModal from '@/components/EditProductModal.vue'
export default {
  name: 'ProductsView',
  components: {
    AddProductModal,
    EditProductModal
  },
  data() {
    return {
      searchQuery: '',
      showAddProductModal: false,
      showEditProductModal: false,
      selectedProduct: null,
    };
  },
  computed: {
    products() {
      return this.$store.state.products || [];
    },
    searchProducts() {
      return this.products.filter((product) => {
        const search = this.searchQuery.toLowerCase();
        return (
          product.prodName.toLowerCase().includes(search) ||
          product.category.toLowerCase().includes(search)
        );
      });
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
}
</script>


<style scoped>
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
}

td img {
  max-width: 50px;
}

.actions i {
  margin: 0 5px;
  cursor: pointer;
}
</style>