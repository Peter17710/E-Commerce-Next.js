import { getProductsDetails } from '@/app/actions/products.action';
import ProductDetailsComp from '@/app/Components/products-comps/ProductDetailsComp';
import React from 'react'

export default async function ProductDetails({params} : {params :{id : string}}) {

        const {id} = await params;

        const {data:  productDetails } = await getProductsDetails(id); 

        
  return (

      <div className="container mx-auto">
        <ProductDetailsComp ProductDetails={productDetails} />
      </div>



  )
}
