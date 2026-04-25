"use client"
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import React from 'react'
import { useCart } from '@/app/context/CartContext'
import Link from 'next/link'

export default function CartTable() {
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice, totalItems } = useCart()

  if (cart.length === 0) {
    return (
      <div className='w-3/4 mx-auto text-center my-20'>
        <h2 className='text-2xl font-bold mb-4'>Your cart is empty</h2>
        <Link href="/" className='text-blue-600 underline'>Continue Shopping</Link>
      </div>
    )
  }

  return (
    <div className='w-3/4 mx-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-6 text-center">Product</TableHead>
            <TableHead className='p-6 text-center'>Price</TableHead>
            <TableHead className='p-6 text-center'>Quantity</TableHead>
            <TableHead className="p-6 text-center">SubTotal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium p-3 text-center">
                <div className='items-center flex text-center gap-4'>
                  <div className='relative'>
                    <Badge
                      onClick={() => removeFromCart(item.id)}
                      className='absolute top-[-8px] left-[-8px] cursor-pointer z-10 bg-red-500 hover:bg-red-700'
                    >x</Badge>
                    <Image src={item.thumbnail} alt={item.title} width={64} height={64} className='rounded object-cover' />
                  </div>
                  <p className='text-left'>{item.title}</p>
                </div>
              </TableCell>
              <TableCell className='p-6 text-center'>${item.price.toFixed(2)}</TableCell>
              <TableCell className='p-6'>
                <div className="flex items-center text-center justify-center">
                  <button onClick={() => decreaseQty(item.id)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">-</button>
                  <span className="bg-gray-100 text-gray-800 font-bold py-2 px-4">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r">+</button>
                </div>
              </TableCell>
              <TableCell className="p-6 text-center">${(item.price * item.quantity).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableRow className="bg-gray-100 font-bold">
          <TableCell className="text-center">Total Price</TableCell>
          <TableCell className="text-center"></TableCell>
          <TableCell className="text-center">{totalItems} items</TableCell>
          <TableCell className="text-center">
            <p className='mb-2 font-bold'>${totalPrice.toFixed(2)}</p>
            <button className="bg-blue-600 hover:bg-black py-3 text-white font-bold px-4 rounded">
              Check Out
            </button>
          </TableCell>
        </TableRow>
      </Table>
    </div>
  )
}