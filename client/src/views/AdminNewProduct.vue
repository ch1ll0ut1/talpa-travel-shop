<script setup lang="ts">
import ProductForm from '@/components/ProductForm.vue'
</script>

<template>
  <div class="container">
    <h1>Create New Product</h1>
    <ProductForm />
  </div>
</template>

<style scoped>
.container {
  min-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}
</style>
