<script setup lang="ts">

const props = defineProps<{
    categoryOptions: string[];
    dateOptions: string[];
}>()

const categoryFilter = defineModel('categoryFilter', {
    type: String,
})

const dateFilter = defineModel('dateFilter', {
    type: String,
})

</script>

<template>
    <div class="filter-box">
        <label for="category">Category:</label>
        <select id="category" v-model="categoryFilter">
            <option v-for="category in props.categoryOptions" :key="category" :value="category">{{ category }}</option>
        </select>
        <label for="date">Date:</label>
        <select id="date" v-model="dateFilter">
            <option v-for="date in props.dateOptions" :key="date" :value="date">{{ date }}</option>
        </select>

    </div>
</template>

<style scoped>
.filter-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
</style>
