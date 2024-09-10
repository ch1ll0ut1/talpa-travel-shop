<script setup lang="ts">
import ProductDetails from '../components/ProductDetails.vue'

const props = defineProps<{ id: string }>()
</script>

<template>
  <main>
    <ProductDetails :productId="parseInt(props.id)" />
  </main>
</template>
