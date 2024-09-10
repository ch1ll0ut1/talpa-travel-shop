import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useProductStore } from './products'
import type { Product } from '@/generatedApi'

let nextId = 0

export interface BasketItem {
  id: number
  product: Product
  bundleItems?: Omit<BasketItem, 'bundleItems'>[]
}

export const useBasketStore = defineStore('basket', () => {
  const productStore = useProductStore()
  const items = ref<BasketItem[]>([])

  function addItem(product: Product) {
    items.value.push({ id: nextId++, product })
    productStore.excludedProducts.push(product)
  }

  function removeItem(id: number) {
    const item = items.value.find((item) => item.id === id)
    productStore.excludedProducts = productStore.excludedProducts.filter(
      (product) => product.id !== item?.product.id
    )
    items.value = items.value.filter((item) => item.id !== id)
  }

  /**
   * Create a bundle of products
   * @param basketProductId main product to add bundle items to
   * @param newProductId product to add to the bundle
   */
  function addBundleItem(basketProduct: Product, newProduct: Product) {
    let basketItem = items.value.find((item) => item.product.id === basketProduct.id)

    if (!basketItem) {
      addItem(basketProduct)
      basketItem = items.value.find((item) => item.product.id === basketProduct.id)
    }

    if (basketItem) {
      if (!basketItem.bundleItems) {
        basketItem.bundleItems = []
      }

      basketItem.bundleItems.push({ id: nextId++, product: newProduct })
      productStore.excludedProducts.push(newProduct)
    }
  }

  function removeBundleItem(basketId: number, bundleProduct: Product) {
    const basketItem = items.value.find((item) => item.id === basketId)

    if (basketItem && basketItem.bundleItems) {
      basketItem.bundleItems = basketItem.bundleItems.filter(
        (item) => item.product.id !== bundleProduct.id
      )
      productStore.excludedProducts = productStore.excludedProducts.filter(
        (product) => product.id !== bundleProduct.id
      )
    }
  }

  function isProductInBasket(product: Product) {
    return items.value.some((item) => item.product.id === product.id)
  }

  function clear() {
    items.value = []
    productStore.excludedProducts = []
  }

  return {
    items,
    addItem,
    removeItem,
    addBundleItem,
    removeBundleItem,
    isProductInBasket,
    clear
  }
})
