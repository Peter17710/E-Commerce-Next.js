"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from '../context/CartContext'
import { getCashPayment, getOnlinePayment } from '../actions/payment.action'

export default function CheckoutPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const { cartId, setCartDetails } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null)

  interface Inputs {
    details: string
    city: string
    phone: string
  }

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

  async function onsubmit(values: Inputs) {

    if (!cartId) {
      setErrorMessage('Your cart is empty!')
      return
    }

    if (!paymentMethod) {
      setErrorMessage('Please select a payment method!')
      return
    }

    const shippingAdress = {
      shippingAdress: {
        details: values.details,
        phone: values.phone,
        city: values.city,
      }
    }

    if (paymentMethod === "cash") {
      try {
        const response = await getCashPayment(cartId as string, shippingAdress)
        console.log(response);
        if (response.status === 201) {
          setCartDetails({} as any) // ✅ clear cart details
          router.push('/')
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Payment failed. Please try again.')
      }

    } else if (paymentMethod === "online") { // ✅ removed duplicate if
      try {
        const response = await getOnlinePayment(cartId as string, shippingAdress)
        console.log(response);
        if (response.status === 200) {
          const data = response.data as any
          window.location.href = data.session.url
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Payment failed. Please try again.')
      }
    }
  }

  return (
    <div className='w-1/2 mx-auto my-10'>
      <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col'>
        <h2 className='text-3xl tracking-tighter font-bold my-5'>Payment</h2>
        {errorMessage && <p className='text-2xl text-red-500 text-center mb-5'>{errorMessage}</p>}

        <Input className='p-5 my-5' placeholder='Your Details' type='text' {...register('details', { required: "Details is required" })} />
        {errors.details && <p className='text-2xl text-red-500 text-center'>{errors.details.message}</p>}

        <Input className='p-5 my-5' placeholder='Your Phone Number' type='tel' {...register('phone', { required: "Phone number is required" })} />
        {errors.phone && <p className='text-2xl text-red-500 text-center'>{errors.phone.message}</p>}

        <Input className='p-5 my-5' placeholder='Your City' type='text' {...register('city', { required: "City is required" })} />
        {errors.city && <p className='text-2xl text-red-500 text-center'>{errors.city.message}</p>}

        <RadioGroup onValueChange={(val) => setPaymentMethod(val as "online" | "cash")} className='my-5'>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="cash" id="cash" />
            <Label htmlFor="cash">Cash Payment</Label>
          </div>
          <div className="flex items-center gap-3">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online">Online Payment</Label>
          </div>
        </RadioGroup>

        <Button type='submit' className='w-full py-5 cursor-pointer items-center text-2xl text-center text-white bg-black my-5 rounded-2xl' variant='outline'>
          Checkout
        </Button>
      </form>
    </div>
  )
}