<template>
  <div class="orders">
    <div class="orders-tables">
      <h2>Orders</h2>
      <table>
        <tr>
          <th>OrderID</th>
          <th>Order Date</th>
          <th>Email</th>
          <th>Product Name</th>
          <th>Amount</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
        <tr v-for="order in orders" :key="order.orderID">
          <td>{{ order.orderID }}</td>
          <td>{{ order.orderDate }}</td>
          <td>{{ order.emailAdd }}</td>
          <td>{{ order.prodName }}</td>
          <td>{{ order.totalAmount }}</td>
          <td>{{ order.Location }}</td>
          <td :class="getStatusClass(order.status)">{{ order.status }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderView',
  computed: {
    orders() {
      return this.$store.state.orders;
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
