<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    categoryOptions?: string[];
    dateOptions?: string[];
    excludeCategory?: string;
}>()

const categoryFilter = defineModel('categoryFilter', { type: String })
const dateFilter = defineModel('dateFilter', { type: String })

const availableCategories = computed(() => {
    return props.categoryOptions?.filter((category) => category !== props.excludeCategory) || []
})

</script>

<template>
    <div class="filter-box">
        <label v-if="!!props.categoryOptions">
            Category:
            <select v-model="categoryFilter">
                <option v-for="category in availableCategories" :key="category" :value="category">{{ category }}</option>
            </select>
        </label>
        <label v-if="!!props.dateOptions">
            Date:
            <select v-model="dateFilter">
                <option v-for="date in props.dateOptions" :key="date" :value="date">{{ date }}</option>
            </select>
        </label>
    </div>
</template>

<style scoped>
.filter-box {
    display: flex;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
}
</style>
