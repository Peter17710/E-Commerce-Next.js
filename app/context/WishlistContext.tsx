"use client"
import { Products } from '@/app/types/products.model'
import React, { createContext, useContext, useState } from 'react'

interface WishlistContextType {
  wishlist: Products[]
  addToWishlist: (product: Products) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  totalWishlistItems: number
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Products[]>([])

  function addToWishlist(product: Products) {
    setWishlist(prev => {
      const exists = prev.find(item => item._id === product._id)
      if (exists) return prev // ✅ don't add duplicates
      return [...prev, product]
    })
  }

  function removeFromWishlist(id: string) {
    setWishlist(prev => prev.filter(item => item._id !== id))
  }

  function isInWishlist(id: string) {
    return wishlist.some(item => item._id === id)
  }

  const totalWishlistItems = wishlist.length

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      totalWishlistItems
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}