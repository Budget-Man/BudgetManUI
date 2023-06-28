<template>
    <div>
      <h1>Welcome to the Project Budget Manager Dashboard</h1>
  
      <div class="summary">
        <h2>Project Summary</h2>
        <p>Total Budget: {{ totalBudget }}</p>
        <p>Total Expenses: {{ totalExpenses }}</p>
        <p>Remaining Budget: {{ remainingBudget }}</p>
      </div>
  
      <div class="expenses">
        <h2>Expense List</h2>
        <ul>
          <li v-for="expense in expenses" :key="expense.id">
            {{ expense.description }} - ${{ expense.amount }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        totalBudget: 10000,
        totalExpenses: 5000,
        expenses: [
          { id: 1, description: 'Office Supplies', amount: 500 },
          { id: 2, description: 'Software License', amount: 2000 },
          { id: 3, description: 'Marketing Campaign', amount: 2500 },
        ],
      };
    },
    computed: {
      remainingBudget() {
        return this.totalBudget - this.totalExpenses;
      },
    },
  };
  </script>
  
  <style scoped>
  .summary {
    margin-bottom: 20px;
  }
  
  .expenses ul {
    list-style-type: none;
    padding: 0;
  }
  </style>