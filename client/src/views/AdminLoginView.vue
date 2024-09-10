<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <div class="admin-login">
    <h1>Admin Login</h1>
    <LoginForm />
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
</style>
