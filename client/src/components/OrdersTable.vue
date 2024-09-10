<script setup lang="ts">
import { useOrderStore } from '@/stores/orders'

const orderStore = useOrderStore()
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Date</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Products</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orderStore.orders" :key="order.id">
        <td>{{ order.id }}</td>
        <td>{{ new Date(order.date).toLocaleDateString() }}</td>
        <td>{{ order.firstName }}</td>
        <td>{{ order.lastName }}</td>
        <td>
          <ul>
            <li v-for="item in order.items" :key="item.id">
              {{ item.product.name }} - ${{ item.product.price }}
              <ul v-if="item.bundleItems">
                <li v-for="bundle in item.bundleItems" :key="bundle.product.id">
                  {{ bundle.product.name }} - ${{ bundle.product.price }}
                </li>
              </ul>
            </li>
          </ul>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>
