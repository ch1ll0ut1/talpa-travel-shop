<script setup lang="ts">
import { ref } from 'vue';

const orders = ref([
    {
        id: 1,
        date: '2022-01-01',
        firstName: 'John',
        lastName: 'Doe',
        products: [{
            id: 1,
            name: 'Product 1',
            price: 100,
            bundledProducts: [{
                id: 2,
                name: 'Product 2',
                price: 200,
            }],
        }],
    },
]);

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
            <tr v-for="order in orders" :key="order.id">
                <td>{{ order.id }}</td>
                <td>{{ order.date }}</td>
                <td>{{ order.firstName }}</td>
                <td>{{ order.lastName }}</td>
                <td>
                    <ul>
                        <li v-for="product in order.products" :key="product.id">
                            {{ product.name }} - ${{ product.price }}
                            <ul v-if="product.bundledProducts">
                                <li v-for="bundleProduct in product.bundledProducts" :key="bundleProduct.id">
                                    {{ bundleProduct.name }} - ${{ bundleProduct.price }}
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