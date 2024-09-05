import { defineStore } from 'pinia';
import { ref } from 'vue';

let nextId = 0;

export interface BasketItem {
    id: number;
    productId: number;
}

export const useBasketStore = defineStore('basket', () => {
    const items = ref<BasketItem[]>([]);

    async function loadBasket() {
        items.value = []
    }

    function addItem(productId: number) {
        items.value.push({ id: nextId++ ,productId });
    }

    function removeItem(id: number) {
        items.value = items.value.filter((item) => item.id !== id);
    }

    return {
        items,
        loadBasket,
        addItem,
        removeItem,
    };
});
