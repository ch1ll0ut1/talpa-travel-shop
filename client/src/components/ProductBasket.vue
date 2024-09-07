<script setup lang="ts">
import ProductItem from './ProductItem.vue';
import { useBasketStore } from '@/stores/basket';
import ProductList from './ProductList.vue';

const basket = useBasketStore();
</script>

<template>
    <div class="basket">
        <h2>Your Basket</h2>
        <ul>
            <li v-for="item in basket.items" :key="item.id">
                <ProductItem :productId="item.product.id">
                    <template #actions>
                        <button @click="basket.removeItem(item.id)">Remove</button>
                    </template>
                    <template #details v-if="item.bundleItems">
                        <ProductList :products="item.bundleItems.map(item => item.product)">
                            <template #actions="props">
                                <button @click="basket.removeBundleItem(item.id, props.product)">X</button>
                            </template>
                        </ProductList>
                    </template>
                </ProductItem>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.basket {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    margin-bottom: 10px;
}
</style>