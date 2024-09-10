import type { Product } from '@/generatedApi';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProductStore = defineStore('products', () => {
    const categoryFilter = ref('all');
    const dateFilter = ref('all');
    const excludeCategories = ref<string[]>([]);
    const excludedProducts = ref<Product[]>([]);

    const { result } = useQuery<{ products: Product[] }>(
        gql`
            query allProducts {
                products {
                    id
                    price
                    name
                    description
                    location
                    image
                    category
                    date
                }
            }
        `,
    )

    const products = computed(() => result.value?.products ?? []);

    const filteredProducts = computed(() => products.value.filter(p => {
        if (excludeCategories.value.includes(p.category)) {
            return false;
        }

        if (excludedProducts.value.includes(p)) {
            return false;
        }

        return (categoryFilter.value === 'all' || p.category === categoryFilter.value) &&
            (dateFilter.value === 'all' || p.date === dateFilter.value);
    }));

    function resetFilters() {
        categoryFilter.value = 'all';
        dateFilter.value = 'all';
        excludeCategories.value = [];
    }

    function createProduct(product: Omit<Product, 'id'>) {
        products.value.push({ ...product, id: products.value.length + 1 });
    }

    const categoryOptions = computed(() => getFilterOptions(products.value, 'category'));
    const dateOptions = computed(() => getFilterOptions(products.value, 'date'));

    function getProduct(id: number) {
        return products.value.find(p => p.id === id)
    };

    function setExcludeCategories(categories: string[]) {
        excludeCategories.value = categories;
    }

    return {
        products,
        filteredProducts,
        categoryFilter,
        dateFilter,
        categoryOptions,
        dateOptions,
        getProduct,
        resetFilters,
        setExcludeCategories,
        excludedProducts,
        createProduct,
    };
});

const getFilterOptions = (products: Product[], key: keyof Product): string[] => {
    const options = Array.from(new Set(products.map(p => String(p[key]))));

    // Add 'all' option to the beginning of the list
    options.unshift('all');

    return options;
};