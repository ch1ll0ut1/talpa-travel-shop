<script setup lang="ts">
import { useProductStore } from '@/stores/products'
import ProductFilter from './ProductFilter.vue'
import ProductList from './ProductList.vue'
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const store = useProductStore();

store.resetFilters();

</script>

<template>
    <h2 class="text-3xl font-bold text-center">Product Overview</h2>
    <div v-if="auth.isAuthenticated">
        <router-link to="/products/new" class="btn btn-primary">Add Product</router-link>
    </div>
    <ProductFilter :categoryOptions="store.categoryOptions" :dateOptions="store.dateOptions"
        v-model:categoryFilter="store.categoryFilter" v-model:dateFilter="store.dateFilter" />
    <ProductList :products="store.filteredProducts" :enableDetailLink="true" />
</template>
