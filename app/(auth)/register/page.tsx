"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function registerPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  interface Inputs {
    name: string
    email: string
    password: string
    rePassword: string
    phone: string
  }
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
 async function onsubmit(values: Inputs) {
    setErrorMessage('');
    if (values.password !== values.rePassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    console.log(values);

    try {
          let response = await axios.post('https://dummyjson.com/users/add', values)
          if(response?.data?.message === 'success') {
            router.push('/login')
          }

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error occurred while registering user:', error.response?.status, error.response?.data, error.message);
        if (error.response?.status === 409) {
          setErrorMessage('This email is already registered. Please try logging in instead.');
        } else {
          setErrorMessage('Registration failed. Please try again.');
        }
      }       
    }
  }
  return (
    <div className='w-1/2 mx-auto my-10'>
    <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col'>

      <h2 className='text-3xl tracking-tighter font-bold my-5'>Register</h2>
      {errorMessage && <p className='text-2xl text-red-500 text-center mb-5'>{errorMessage}</p>}
      <Input className='p-5 my-5' placeholder='Your Name' type='text' {...register('name' , {required: "Name is required"})  } />
      {errors.name && <p className='text-2xl text-red-500 text-center'>{errors.name.message}</p>}
      <Input className='p-5 my-5' placeholder='Your Email' type='email' {...register('email' , {required: "Email is required"})} />
      {errors.email && <p className='text-2xl text-red-500 text-center'>{errors.email.message}</p>}
      <Input className='p-5 my-5' placeholder='Your Password' type='password' {...register('password', {required: "Password is required"})} />
      {errors.password && <p className='text-2xl text-red-500 text-center'>{errors.password.message}</p>}
      <Input className='p-5 my-5' placeholder='Confirm Password' type='password' {...register('rePassword', {required: "Please confirm your password"})} />
      {errors.rePassword && <p className='text-2xl text-red-500 text-center'>{errors.rePassword.message}</p>}
      <Input className='p-5 my-5' placeholder='Your Phone Number' type='tel' {...register('phone', {required: "Phone number is required"})} />
      {errors.phone && <p className='text-2xl text-red-500 text-center'>{errors.phone.message}</p>}
      <Button type='submit' className='w-full py-5 items-center text-2xl text-center text-white bg-black my-5 rounded-2xl' variant='outline'>Register</Button>

    </form>
    </div>
  )
}
