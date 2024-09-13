<template>
  <div class="container-fluid">
    <h1>STORE'S REPORT PAGE</h1>

    <!-- Income  -->
    <div class="income">
      <h1>Income</h1>
      <div class="actions-container">
        <button class="btn btn-primary export-btn" @click="downloadIncomeReport">
          Export Income <i class="bi bi-download"></i>
        </button>
      </div>
      <table>
        <tr>
          <th>Income ID</th>
          <th>Order ID</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Income Date</th>
          <th>Description</th>
        </tr>
        <tr v-for="income in incomes" :key="income.incomeID">
          <td>{{ income.incomeID }}</td>
          <td>{{ income.orderID }}</td>
          <td>{{ income.category }}</td>
          <td>{{ income.amount }}</td>
          <td>{{ income.incomeDate }}</td>
          <td>{{ income.description }}</td>
        </tr>
      </table>
    </div>

    <!-- Expenses  -->
    <div class="expenses">
      <h1>Expenses</h1>
      <div class="actions-container">
        <button class="btn btn-primary export-btn" @click="exportExpensesReport">
          Export Expenses <i class="bi bi-download"></i>
        </button>
      </div>
      <table>
        <tr>
          <th>Expense ID</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Expense Date</th>
          <th>Description</th>
        </tr>
        <tr v-for="expense in expenses" :key="expense.expenseID">
          <td>{{ expense.expenseID }}</td>
          <td>{{ expense.category }}</td>
          <td>{{ expense.amount }}</td>
          <td>{{ expense.expenseDate }}</td>
          <td>{{ expense.description }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportView',
  computed: {
    incomes() {
      return this.$store.state.incomes
    },
    expenses() {
      return this.$store.state.expenses
    }
  },
  mounted() {
    this.$store.dispatch('fetchIncomes')
    this.$store.dispatch('fetchExpenses')
  },
  methods: {
    exportExpensesReport() {
      this.$store.dispatch('downloadExpensesReport')
    },
    downloadIncomeReport() {
      this.$store.dispatch('downloadIncomeReport')
    }
  }
}
</script>

<style scoped>
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

.actions-container {
  display: flex;
  justify-content: flex-start; 
  margin-bottom: 10px;
}

.export-btn {
  background: #007bff;
  border: none;
  padding: 10px 20px;
  color: white;
  font-size: 14px;
  border-radius: 5px;
  cursor: pointer;
}

.export-btn i {
  margin-left: 5px;
}
</style>
