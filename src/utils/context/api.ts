import { ref, provide, inject } from 'vue'
import axios from 'axios'
import type { Product } from '../types/products'

const BASE_URL = 'https://dummyjson.com'

export async function getAllProducts() {
  try {
    const res = await axios.get(`${BASE_URL}/products?limit=100`)
    return res.data.products
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getProductById(id: number) {
  try {
    const res = await axios.get(`${BASE_URL}/products/${id}`)
    return res.data
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }
}

export async function getProductsByCategory(category: string) {
  try {
    const res = await axios.get(`${BASE_URL}/products/categories/${category}`)
    return res.data.products
  } catch (error) {
    console.error(`Error fetching products with category ${category}:`, error)
    return []
  }
}

export async function getCategories() {
  try {
    const res = await axios.get(`${BASE_URL}/products/categories`)
    return res.data
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export function createApi() {
  const products = ref<Product[]>([])
  const categories = ref<string[]>([])

  return {
    products,
    categories,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getCategories
  }
}
