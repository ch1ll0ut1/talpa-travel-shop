<script setup lang="ts">
import type { Product } from '@/generatedApi'
import ProductItem from './ProductItem.vue'

const { products, enableDetailLink } = defineProps<{
  products: Product[]
  enableDetailLink?: boolean
  enableDelete?: boolean
}>()
</script>

<template>
  <div class="product-list">
    <div class="product" v-for="product in products" :key="product.id">
      <ProductItem :productId="product.id">
        <template #actions>
          <router-link
            :to="{ name: 'product', params: { id: product.id } }"
            v-if="enableDetailLink"
          >
            Details
          </router-link>
          <slot name="actions" :product="product"></slot>
        </template>
      </ProductItem>
    </div>
  </div>
</template>

<style scoped></style>
