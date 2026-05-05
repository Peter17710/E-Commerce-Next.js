"use client"
import { Products } from '@/app/types/products.model'
import React, { createContext, useContext, useState } from 'react'
import axios from 'axios'

// ✅ define types here directly
export interface CartItem extends Products {
  quantity: number
}

export interface CartProduct {
  _id: string
  count: number
  price: number
  product: Products
}

export interface CartData {
  _id: string
  cartOwner: string
  products: CartProduct[]
  totalCartPrice: number
}

interface CartContextType {
  cart: CartItem[]
  cartDetails: CartData | null        // ✅ now CartData is defined
  cartId: string | null
  getCartDetails: () => Promise<void>
  setCartDetails: (cart: CartData) => void  // ✅ use CartData not CartDetails
  addToCart: (product: Products, token: string) => void
  removeFromCart: (id: string) => void
  increaseQty: (id: string) => void
  decreaseQty: (id: string) => void
  totalPrice: number
  totalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartId, setCartId] = useState<string | null>(null)
  const [cartDetails, setCartDetails] = useState<CartData | null>(null) // ✅ add state

  async function getCartDetails() {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { headers: { token } }
      )
      if (response?.data?.data) {
        setCartDetails(response.data.data)
        setCartId(response.data.data._id)
      }
    } catch (error) {
      console.error('Failed to get cart details:', error)
    }
  }

async function addToCart(product: Products, token: string) { // ✅ accept token
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id)
      if (existing) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId: product._id },
        { headers: { token } } // ✅ use passed token
      )
      if (response?.data?.data?._id) {
        setCartId(response.data.data._id)
        setCartDetails(response.data.data)
      }
    } catch (error) {
      console.error('Failed to add to cart API:', error)
    }
  }

  function removeFromCart(id: string) {
    setCart(prev => prev.filter(item => item._id !== id))
  }

  function increaseQty(id: string) {
    setCart(prev =>
      prev.map(item => item._id === id ? { ...item, quantity: item.quantity + 1 } : item)
    )
  }

  function decreaseQty(id: string) {
    setCart(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
    )
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      cartId,
      cartDetails,
      getCartDetails,
      setCartDetails,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}