"use server"
import axios from "axios"

async function getCategories() {
    try {
        const response = await axios.get("https://dummyjson.com/products/categories");
        return {
            data: response?.data, // ✅ plain array, no .data.data
            status: response.status,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
            }
        }
    }
}

export { getCategories }