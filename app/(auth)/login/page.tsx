"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function loginPage() {

   const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  interface Inputs {

    email: string
    password: string
  
  }
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()
 async function onsubmit(values: Inputs) {
    console.log(values , "login");

    try {

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      });

      console.log(response);
      if(response?.ok){
        router.push("/")
     }
      
    } catch (error) {
      console.log(error);
      
    }
    
    setErrorMessage('');
  
    }



  return (
    <div>
        <div className='w-1/2 mx-auto my-10'>
          <form onSubmit={handleSubmit(onsubmit)} className='flex flex-col'>
      
            <h2 className='text-3xl tracking-tighter font-bold my-5'>Login</h2>
            <Input className='p-5 my-5' placeholder='Your Email' type='text' {...register('email' , {required: "Email is required"})} />
            {errors.email && <p className='text-2xl text-red-500 text-center'>{errors.email.message}</p>}
            <Input className='p-5 my-5' placeholder='Your Password' type='password' {...register('password', {required: "Password is required"})} />
            {errors.password && <p className='text-2xl text-red-500 text-center'>{errors.password.message}</p>}
            <Button type='submit' className='w-full py-5 items-center text-2xl text-center text-white bg-black my-5 rounded-2xl' variant='outline'>Login</Button>

          </form>
          </div>
    </div>
  )
}
