<template>
  <div class="orders">
    <div class="orders-tables">
      <h2>Orders</h2>
      <div class="row gap-2">
        <div class="col-md-2">
          <input type="number" class="form-control" v-model="searchOrderQuery" placeholder="Search OrderID">
        </div>
        <div class="col-md-6">
          <button class="btn btn-primary" @click="showAddOrderModal = true">Place Order</button>
        </div>
      </div>
      <table>
        <tr>
          <th>OrderID</th>
          <th>Order Date</th>
          <th>Email</th>
          <th>Product Name</th>
          <th>Amount</th>
          <th>Address</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        <tr v-for="order in searchOrders" :key="order.orderID">
          <td>{{ order.orderID }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.emailAdd }}</td>
          <td>{{ order.prodName }}</td>
          <td>{{ order.totalAmount }}</td>
          <td>{{ order.Location }}</td>
          <td :class="getStatusClass(order.status)">{{ order.status }}</td>
          <td class="action">
            <button><i class="bi bi-pencil"></i></button>
            <button @click="deleteOrder(order.orderID)"><i class="bi bi-trash"></i></button>
          </td>
        </tr>
      </table>
    </div>

    <AddOrderModal :visible="showAddOrderModal" @update:visible="showAddOrderModal = false"
    @add-order="handleAddOrder" />
  </div>
</template>

<script>
import AddOrderModal from '@/components/AddOrderModal.vue';
export default {
  name: 'OrderView',
  components:{
    AddOrderModal
  },
  data(){
    return {
      searchOrderQuery: null,
      showAddOrderModal: false,
    }
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
    searchOrders(){
      if (this.searchOrderQuery === null || this.searchOrderQuery === '') {
        return this.orders;
      } else {
        return this.orders.filter((order)=>{
          return order.orderID === parseInt(this.searchOrderQuery);
        })
      }
    }
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case 'shipped':
          return 'status-shipped';
        case 'delivered':
          return 'status-delivered';
        case 'pending':
          return 'status-pending';
        case 'cancelled':
          return 'status-cancelled';
        default:
          return '';
      }
    },
    handleAddOrder(order) {
    this.$store.dispatch('addOrder', order)
    },
    async deleteOrder(orderID) {
      await this.$store.dispatch('deleteOrder', orderID)
    }
  },
  mounted() {
    this.$store.dispatch('fetchOrders');
  }
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

/* Status colors */
.status-shipped {
  color: orange;
}

.status-delivered {
  color: green;
}

.status-pending {
  color: blue;
}

.status-cancelled {
  color: red;
}
</style>
