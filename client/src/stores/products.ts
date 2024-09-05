import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export interface Product {
    id: number;
    price: number;
    name: string;
    description: string;
    location: string;
    image: string;
    category: string;
    date: string;
}

export const useProductStore = defineStore('products', () => {
    const products = ref<Product[]>([]);
    const categoryFilter = ref('all');
    const dateFilter = ref('all');

    const filteredProducts = computed(() => products.value.filter(p => {
        return (categoryFilter.value === 'all' || p.category === categoryFilter.value) &&
            (dateFilter.value === 'all' || p.date === dateFilter.value);
    }));

    async function loadProducts() {
        products.value = [{
            id: 1,
            name: 'Sing Airways',
            description: 'Flight to Barcelona with a layover in Paris',
            location: 'Barcelona',
            price: 100,
            image: 'https://via.placeholder.com/150',
            category: 'flight',
            date: '2025-10-01',
        }, {
            id: 2,
            name: 'Thai Airways',
            description: 'Flight to Barcelona with a layover in Paris',
            location: 'Barcelona',
            price: 200,
            image: 'https://via.placeholder.com/150',
            category: 'flight',
            date: '2025-9-01',
        }, {
            id: 3,
            name: 'Grandhotel Pupp',
            description: 'Hotel in Barcelona',
            location: 'Barcelona',
            price: 300,
            image: 'https://via.placeholder.com/150',
            category: 'hotel',
            date: '2025-10-01',
        }, {
            id: 4,
            name: 'Hotel Paris',
            description: 'Hotel in Paris',
            location: 'Paris',
            price: 400,
            image: 'https://via.placeholder.com/150',
            category: 'hotel',
            date: '2025-9-01',
        }, {
            id: 5,
            name: 'Hotel Ritz',
            description: 'Hotel in Paris',
            location: 'Paris',
            price: 500,
            image: 'https://via.placeholder.com/150',
            category: 'hotel',
            date: '2025-10-01',
        }, {
            id: 6,
            name: 'French Airways',
            description: 'Direct flight to Paris',
            location: 'Paris',
            price: 500,
            image: 'https://via.placeholder.com/150',
            category: 'flight',
            date: '2025-10-01',
        }]
    }

    const categoryOptions = computed(() => getFilterOptions(products.value, 'category'));
    const dateOptions = computed(() => getFilterOptions(products.value, 'date'));

    const getProduct = (id: number) => products.value.find(p => p.id === id);

    return {
        products,
        filteredProducts,
        categoryFilter,
        dateFilter,
        loadProducts,
        categoryOptions,
        dateOptions,
        getProduct,
    };
});

const getFilterOptions = (products: Product[], key: keyof Product): string[] => {
    const options = Array.from(new Set(products.map(p => String(p[key]))));

    // Add 'all' option to the beginning of the list
    options.unshift('all');

    return options;
};