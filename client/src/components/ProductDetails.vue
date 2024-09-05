<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/products';

const { productId } = defineProps<{ productId: Product['id'] }>()

const store = useProductStore();

store.loadProducts();

const product = store.getProduct(productId);

</script>

<template>
    <div class="product" v-if="product">
        <img :src="product.image" :alt="product.name" class="item-picture" />
        <div class="wrapper">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>Date: {{ product.date }}</p>
            <p>Location: {{ product.location }}</p>
            <p>price: {{ product.price }} EUR</p>
            <div>
                <!-- <button @click="store.addToCart(product)">Add to Cart</button>
                <button @click="store.removeFromCart(product)">Remove from Cart</button> -->
            </div>
        </div>
    </div>
    <div v-else>
        <p>Product not found</p>
    </div>
</template>

<style scoped>
.product {
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 10px;
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
