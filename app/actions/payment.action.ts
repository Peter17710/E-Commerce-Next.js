"use server"
import axios from "axios"
import { Products } from "../types/products.model"
import { getUserToken } from "@/lib/token.utils"

function normalizeProducts(payload: unknown): Products[] {
    if (Array.isArray(payload)) return payload as Products[]
    return []
}

interface ShippingAddressTypes {
    details: string
    phone: string
    city: string
}

interface ShippingAddressPayload {
    shippingAdress: ShippingAddressTypes
}

async function getCashPayment(cartId: string, shippingAddress: ShippingAddressPayload) {
    try {
        const token = await getUserToken()
        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            shippingAddress,
            { headers: { token: token as string } }
        )
        return { data: response?.data, status: response.status } // ✅ return full response data
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { data: null, status: error.response?.status }
        }
        return { data: null, status: 500 }
    }
}

async function getOnlinePayment(cartId: string, shippingAddress: ShippingAddressPayload) {
    try {
        const token = await getUserToken()
        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            shippingAddress,
            { headers: { token: token as string } }
        )
        return { 
            data: response?.data, // ✅ return full response — contains session.url
            status: response.status 
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return { data: null, status: error.response?.status }
        }
        return { data: null, status: 500 }
    }
}

export { getCashPayment, getOnlinePayment }