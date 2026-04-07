import { getCategories } from '@/app/actions/categories.action'
import React from 'react'
import CategorySliderComp from './CategorySliderComp';

export default async function CategorySlider() {

    const response = await getCategories();
    console.log(response?.data , "slider");
  return (
    <div className='my-5'>
        <CategorySliderComp category={response?.data}/>
    </div>
  )
}
