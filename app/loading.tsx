import React from 'react'
import { LoaderCircle } from 'lucide-react';



export default function LoadnigPage() {
  return (
    <div>

        <div className='flex justify-center items-center h-screen'>
            <LoaderCircle className='animate-spin' size={50}/>
        </div>  

    </div>
  )
}
