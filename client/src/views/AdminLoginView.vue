<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

const auth = useAuthStore();

const username = ref('');
const password = ref('');

</script>

<template>
    <div class="admin-login">
        <h1>Admin Login</h1>
        <form @submit.prevent="auth.login(username, password)">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<style scoped>
.admin-login {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.admin-login h1 {
    text-align: center;
}

.admin-login form {
    display: flex;
    flex-direction: column;
}

.admin-login label {
    margin-bottom: 10px;
}

.admin-login input {
    padding: 10px;
    margin-bottom: 10px;
}

.admin-login button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

.admin-login button:hover {
    background-color: #0056b3;
}
</style>