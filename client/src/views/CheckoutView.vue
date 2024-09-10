<script setup lang="ts">
import CheckoutForm from '@/components/CheckoutForm.vue'
import ProductBasket from '@/components/ProductBasket.vue'
</script>

<template>
  <div>
    <h1>Summary</h1>
    <ProductBasket :disableCheckout="true" />
    <h1>Checkout</h1>
    <CheckoutForm />
  </div>
</template>

<style scoped></style>
