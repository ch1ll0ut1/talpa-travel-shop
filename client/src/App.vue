<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <div class="wrapper">
            <h1 class="logo">Travel Shop</h1>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <!-- <RouterLink to="/admin">Admin</RouterLink> -->
            </nav>
        </div>
    </header>
    <content>
        <RouterView />
    </content>
</template>

<style>
#app {
    display: flex;
    flex-direction: column;
}
</style>

<style scoped>
header {
    line-height: 1.5;
    min-width: 800px;
    margin-bottom: 25px;
    padding-bottom: 5px;
    border-bottom: 1px solid var(--color-border);
}

header .wrapper {
    display: flex;
    align-items: center;
}

.logo {
    display: inline-block;
}

nav {
    display: flex;
    width: 100%;
    flex: 1;
    margin-left: 50px;
    font-size: 12px;
    text-align: center;
    justify-content: flex-end;
}

nav a.router-link-exact-active {
    color: var(--color-text);
}

nav a.router-link-exact-active:hover {
    background-color: transparent;
}

nav a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
    border: 0;
}

content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 45px);
}
</style>
