"use server"
import axios from "axios"
import type { Products } from "@/app/types/products.model"

function normalizeProducts(payload: unknown): Products[] {
    if (Array.isArray(payload)) return payload as Products[]
    return []
}

async function getProducts() {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
        const list = normalizeProducts(response?.data?.data) 
        return { data: list, status: response.status }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { data: [], status: error.response?.status }
        }
        return { data: [], status: 500 }
    }
}

async function getProductsDetails(id: string) {
    try {
        const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        return { data: response?.data?.data, status: response.status }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { data: null, status: error.response?.status }
        }
        return { data: null, status: 500 }
    }
}

export { getProducts, getProductsDetails }