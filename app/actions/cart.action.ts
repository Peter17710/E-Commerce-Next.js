"use server"
import axios from "axios"
import type { Products } from "@/app/types/products.model"
import { cookies } from "next/headers"
import { decode } from "next-auth/jwt"
import { getUserToken } from "@/lib/token.utils"


function normalizeProducts(payload: unknown): Products[] {
    if (Array.isArray(payload)) return payload as Products[]
    return []
}


async function getUserCart() {
    try {

        const token = await getUserToken()
        const response = await axios.get("https://dummyjson.com/cart" , {
            headers: {
                token: token
            }
        })
        const list = normalizeProducts(response?.data?.products) // ✅ fixed
        return { data: list, status: response.status }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { data: [], status: error.response?.status }
        }
        return { data: [], status: 500 }
    }
}

export default getUserCart;