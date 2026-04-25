"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

export default function BrandsPage() {

  const session = useSession();
  if(!session.data){
    return <p>You need to Login</p>
  }
  console.log(session);
  


  return (
    <div>
        BrandsPage
    </div>
  )
}
