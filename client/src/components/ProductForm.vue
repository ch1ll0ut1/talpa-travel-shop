<script setup lang="ts">
import type { Product } from '@/generatedApi'
import router from '@/router'
import { useProductStore } from '@/stores/products'
import { ref } from 'vue'

const products = useProductStore()

const product = ref<Omit<Product, 'id' | 'softDelete'>>({
  name: '',
  price: 0,
  description: '',
  location: '',
  image: '',
  category: '',
  date: ''
})

function submitProduct() {
  products.addProduct(product.value)
  router.push('/')
}
</script>

<template>
  <form @submit.prevent="submitProduct">
    <label for="name">Name:</label>
    <input type="text" id="name" v-model="product.name" required />

    <label for="price">Price:</label>
    <input type="number" id="price" v-model="product.price" required />

    <label for="description">Description:</label>
    <textarea id="description" v-model="product.description" required></textarea>

    <label for="location">Location:</label>
    <input type="text" id="location" v-model="product.location" required />

    <label for="image">Image:</label>
    <input type="text" id="image" v-model="product.image" required />

    <label for="category">Category:</label>
    <input type="text" id="category" v-model="product.category" required />

    <label for="date">Date:</label>
    <input type="date" id="date" v-model="product.date" required />

    <button type="submit">Create Product</button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: 10px;
}

label {
  font-weight: bold;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
