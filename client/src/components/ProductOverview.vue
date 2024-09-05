<script setup lang="ts">
import { useProductStore } from '@/stores/products'
import ProductFilter from './ProductFilter.vue'
import ProductList from './ProductList.vue'

const store = useProductStore();

store.loadProducts();

</script>

<template>
    <h2 class="text-3xl font-bold text-center">Product Overview</h2>
    <ProductFilter
        :categoryOptions="store.categoryOptions"
        :dateOptions="store.dateOptions"
        v-model:categoryFilter="store.categoryFilter"
        v-model:dateFilter="store.dateFilter"
    />
    <ProductList
        :products="store.filteredProducts"
    />
</template>
