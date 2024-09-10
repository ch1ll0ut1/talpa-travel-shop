<script setup lang="ts">
import { useBasketStore } from '@/stores/basket';
import { ref } from 'vue';

const basket = useBasketStore();

const firstName = ref('');
const lastName = ref('');

const submitForm = () => {
    // Handle form submission logic here
    console.log('First Name:', firstName.value);
    console.log('Last Name:', lastName.value);
    console.log('basket', basket.items);
};

</script>
<template>
    <div>
        <label for="first-name">First Name:</label>
        <input id="first-name" v-model="firstName" />

        <label for="last-name">Last Name:</label>
        <input id="last-name" v-model="lastName" />

        <button @click="submitForm">Submit</button>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

label {
    margin-bottom: 0.5rem;
}

input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 100%;
}

button {
    padding: 0.5rem 1rem;
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