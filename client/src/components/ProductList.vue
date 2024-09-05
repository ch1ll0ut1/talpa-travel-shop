<script setup lang="ts">
import type { Product } from '@/stores/products';

const { products } = defineProps<{ products: Product[] }>()
</script>

<template>
    <div class="product-list">
        <div class="product" v-for="product in products" :key="product.id">
            <!-- <router-link :to="{ name: 'ProductDetail', params: { id: product.id } }"> -->
                <img :src="product.image" :alt="product.name" class="item-picture" />
                <div class="wrapper">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.description }}</p>
                    <p>{{ product.date }} | {{ product.location }} | {{ product.price }} EUR</p>
                </div>
            <!-- </router-link> -->
        </div>
    </div>
</template>

<style scoped>
.product {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.product:hover {
    background-color: #f9f9f9;
    cursor: pointer;
}

.item-picture {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 10px;
}

.product .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>
