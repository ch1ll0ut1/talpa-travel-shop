<script setup lang="ts">
import type { Product } from '@/generatedApi';
import { useProductStore } from '@/stores/products';
const store = useProductStore();

const { productId } = defineProps<{ productId: Product['id'] }>()

const product = store.getProduct(productId);
</script>

<template>
    <div class="product" v-if="product">
        <img :src="product.image" :alt="product.name" class="item-picture" />
        <div class="wrapper">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>{{ product.date }} | {{ product.location }} | {{ product.price }} EUR</p>
        </div>
        <slot name="actions" :product="product"></slot>
        <slot name="details" :product="product"></slot>
    </div>
</template>

<style scoped>
.product {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    color: var(--color-text);
}

.product:hover {
    background-color: #f9f9f9;
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
