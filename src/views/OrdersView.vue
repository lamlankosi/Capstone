<template>
  <div class="orders">
    <h2>Orders</h2>

    <!-- Search & Add Order Button -->
    <div class="controls">
      <input type="number" v-model="searchOrderQuery" class="input-field" placeholder="Search OrderID">
      <button class="btn" @click="showAddOrderModal = true">Place Order</button>
    </div>

    <!-- Orders Table -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>OrderID</th>
            <th>Order Date</th>
            <th>Email</th>
            <th>Product</th>
            <th>Amount</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in searchOrders" :key="order.orderID">
            <td>{{ order.orderID }}</td>
            <td>{{ order.orderDate }}</td>
            <td>{{ order.emailAdd }}</td>
            <td>{{ order.prodName }}</td>
            <td>R{{ order.totalAmount }}</td>
            <td>{{ order.Location }}</td>
            <td :class="getStatusClass(order.status)">{{ order.status }}</td>
            <td class="actions">
              <button @click="openEditModal(order)"><i class="bi bi-pencil"></i></button>
              <button @click="deleteOrder(order.orderID)"><i class="bi bi-trash"></i></button>
            </td>
          </tr>
          <tr v-if="searchOrders.length === 0">
            <td colspan="8" class="no-orders">No orders found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add & Edit Order Modals -->
    <AddOrderModal :visible="showAddOrderModal" @update:visible="showAddOrderModal = false" @add-order="handleAddOrder" />
    <EditOrderModal :visible="showEditOrderModal" :order="selectedOrder" @update:visible="showEditOrderModal = false" />
  </div>
</template>

<script>
import AddOrderModal from '@/components/AddOrderModal.vue';
import EditOrderModal from '@/components/EditOrderModal.vue';

export default {
  name: 'OrderView',
  components: {
    AddOrderModal,
    EditOrderModal
  },
  data() {
    return {
      searchOrderQuery: '',
      showAddOrderModal: false,
      showEditOrderModal: false,
      selectedOrder: null,
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders || [];
    },
    searchOrders() {
      if (!this.searchOrderQuery) return this.orders;
      return this.orders.filter(order => order.orderID.toString().includes(this.searchOrderQuery));
    }
  },
  methods: {
    getStatusClass(status) {
      return `status-${status.toLowerCase()}`;
    },
    handleAddOrder(order) {
      this.$store.dispatch('addOrder', order);
    },
    async deleteOrder(orderID) {
      await this.$store.dispatch('deleteOrder', orderID);
    },
    openEditModal(order) {
      this.selectedOrder = order;
      this.showEditOrderModal = true;
    }
  },
  mounted() {
    this.$store.dispatch('fetchOrders');
  }
};
</script>

<style scoped>
/* Container Styles */
.orders {
  padding: 20px;
  background: #1e1e1e;
  color: #f5f5f5;
}

h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 15px;
}

/* Controls (Search & Button) */
.controls {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.input-field {
  flex: 1;
  padding: 10px;
  background: #2e2e2e;
  border: 1px solid #7a7a7a;
  color: #fff;
  border-radius: 8px;
}

.btn {
  padding: 10px 15px;
  background: #2E8B57;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;
}

.btn:hover {
  background: #267147;
}

/* Table Styles */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: #7a7a7a;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #7a7a7a;
}

th {
  background: #2e2e2e;
}

td {
  color: #fff;
}

/* Actions */
.actions button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.actions i {
  margin: 0 5px;
}

/* Status Colors */
.status-shipped { color: orange; }
.status-delivered { color: green; }
.status-pending { color: blue; }
.status-cancelled { color: red; }

/* No Orders Message */
.no-orders {
  text-align: center;
  padding: 15px;
  color: #b0b0b0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
  }
  
  table {
    font-size: 14px;
  }
}

@media (max-width: 320px) {
  .orders {
    padding: 10px;
  }

  table {
    font-size: 12px;
  }

  .btn, .input-field {
    width: 100%;
  }
}
</style>
