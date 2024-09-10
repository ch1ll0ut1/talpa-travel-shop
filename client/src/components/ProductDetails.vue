<script setup lang="ts">
import { useProductStore } from '@/stores/products';
import { useBasketStore } from '@/stores/basket';
import ProductBasket from './ProductBasket.vue';
import ProductFilter from './ProductFilter.vue';
import ProductList from './ProductList.vue';
import ProductItem from './ProductItem.vue';
import type { Product } from '@/api';

const { productId } = defineProps<{ productId: Product['id'] }>()

const products = useProductStore();
const basket = useBasketStore();

products.resetFilters();

const product = products.getProduct(productId);

if (product) {
    products.setExcludeCategories([product.category]);
    products.dateFilter = product.date || 'all';
}
</script>

<template>
    <div class="layout" v-if="product">
        <div class="main">
            <ProductItem :productId="product.id">
                <template #actions>
                    <button @click="basket.addItem(product)" v-if="!basket.isProductInBasket(product)">
                        Add to Cart
                    </button>
                </template>
            </ProductItem>
            <div class="bundle">
                <h2 class="text-3xl font-bold text-center">Create bundle by adding one of the following products</h2>
                <ProductFilter :excludeCategory="product.category" v-model:categoryFilter="products.categoryFilter"
                    :categoryOptions="products.categoryOptions" />
                <ProductList :products="products.filteredProducts">
                    <template #actions="props">
                        <button @click="basket.addBundleItem(product, props.product)">Add to Cart</button>
                    </template>
                </ProductList>
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
    min-width: 500px;
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
