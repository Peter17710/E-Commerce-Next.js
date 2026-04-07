import React from 'react'
import { getProducts } from '../actions/products.action';
import ProductsGridSystem from '../Components/products-comps/ProductsGridSystem';

export default async function ProductsPage() {

  
  const productsResponse = await getProducts();
  const productsData = productsResponse.data ?? [];



  return (
    <div>
      <ProductsGridSystem products={productsData} />
    </div>
  )
}
