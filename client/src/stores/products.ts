import type { Product } from '@/generatedApi';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useProductStore = defineStore('products', () => {
    const categoryFilter = ref('all');
    const dateFilter = ref('all');
    const excludeCategories = ref<string[]>([]);
    const excludedProducts = ref<Product[]>([]);

    const { result, refetch } = useQuery<{ products: Product[] }>(
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

    const categoryOptions = computed(() => getFilterOptions(products.value, 'category'));
    const dateOptions = computed(() => getFilterOptions(products.value, 'date'));

    function getProduct(id: number) {
        return products.value.find(p => p.id === id)
    };

    function setExcludeCategories(categories: string[]) {
        excludeCategories.value = categories;
    }

    const { mutate: submitProduct } = useMutation(gql`
        mutation addProduct($newProductData: NewProductInput!) {
            addProduct(newProductData: $newProductData) {
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
    `);

    async function addProduct(product: Omit<Product, 'id'>) {
        await submitProduct({
            newProductData: product
        });
        
        refetch();
    }

    const { mutate: submitRemovedProduct } = useMutation(gql`
        mutation removeProduct($id: Float!) {
            removeProduct(id: $id)
        }
    `);

    async function deleteProduct(product: Product) {
        await submitRemovedProduct({ id: product.id});

        refetch();
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
        addProduct,
        deleteProduct,
    };
});

const getFilterOptions = (products: Product[], key: keyof Product): string[] => {
    const options = Array.from(new Set(products.map(p => String(p[key]))));

    // Add 'all' option to the beginning of the list
    options.unshift('all');

    return options;
};