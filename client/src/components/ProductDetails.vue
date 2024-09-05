<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/products';
import { useBasketStore } from '@/stores/basket';
import ProductBasket from './ProductBasket.vue';

const { productId } = defineProps<{ productId: Product['id'] }>()

const products = useProductStore();
const basket = useBasketStore();

products.loadProducts();

const product = products.getProduct(productId);

</script>

<template>
    <div class="layout" v-if="product">
        <div class="product">
            <img :src="product.image" :alt="product.name" class="item-picture" />
            <div class="wrapper">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <p>Date: {{ product.date }}</p>
                <p>Location: {{ product.location }}</p>
                <p>Price: {{ product.price }} EUR</p>
                <div>
                    <button @click="basket.addItem(productId)">Add to Cart</button>
                </div>
            </div>
        </div>
        <ProductBasket />
    </div>
    <div v-else>
        <p>Product not found</p>
    </div>
</template>

<style scoped>
.layout {
    display: flex;
    flex-direction: row;
    align-items: top;
}

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
