import type { Order } from '@/generatedApi';
import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import type { BasketItem } from './basket';

export const useOrderStore = defineStore('orders', () => {

    const { result, refetch } = useQuery<{ orders: Order[] }>(gql`
        query allOrders {
            orders {
                firstName
                lastName
                date
                items {
                    product {
                        id
                        price
                        name
                        description
                        location
                        image
                        category
                        date
                    }
                    bundleItems {
                        product {
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
                }
            }
        }
    `)

    const orders = computed(() => result.value?.orders ?? []);

    const { mutate: submitOrder } = useMutation(gql`
        mutation addOrder($newOrderData: NewOrderInput!) {
            addOrder(newOrderData: $newOrderData) {
                firstName
                lastName
                date
                items {
                    product {
                        id
                        price
                        name
                        description
                        location
                        image
                        category
                        date
                    }
                    bundleItems {
                        product {
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
                }
            }
        }
    `);

    async function addOrder(items: BasketItem[], firstName: string, lastName: string) {
        await submitOrder({
            newOrderData: {
                firstName,
                lastName,
                items: items.map((item) => ({
                    productId: item.product.id,
                    bundleItems: item.bundleItems?.map((bundleItem) => ({
                        productId: bundleItem.product.id,
                    })),
                })),
            }
        });
        
        refetch();
    }

    return {
        orders,
        addOrder,
    };
});
