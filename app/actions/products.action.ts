"use server"

import axios from "axios"
import type { Products } from "@/app/types/products.model"

function normalizeProducts(payload: unknown): Products[] {
    if (Array.isArray(payload)) {
        return payload as Products[]
    }
    return []
}

async function getProducts() {
    try {
        const response = await axios.get(
            "https://ecommerce.routemisr.com/api/v1/products"
        )
        const list = normalizeProducts(response?.data?.data)
        return {
            data: list,
            status: response.status,
            message: response?.data?.message,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
                message:
                    (error.response?.data as { message?: string })?.message ??
                    "an error occurred",
            }
        }
        return {
            data: [],
            status: 500,
            message: error instanceof Error ? error.message : "an error occurred",
        }
    }
}





async function getProductsDetails(id: string) {
    try {
        const response = await axios.get(
            `https://ecommerce.routemisr.com/api/v1/products/${id}`
        )
        const product = response?.data?.data
        return {
            data: product,
            status: response.status,
            message: response?.data?.message,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
                message:
                    (error.response?.data as { message?: string })?.message ??
                    "an error occurred",
            }
        }
        return {
            data: [],
            status: 500,
            message: error instanceof Error ? error.message : "an error occurred",
        }
    }
}

export { getProducts , getProductsDetails}
