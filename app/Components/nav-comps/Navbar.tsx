import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';
import { ShoppingCart , Heart  } from 'lucide-react';


export default function Navbar() {
  return (
    <div>
        <NavigationMenu className= "text-md max-w-7xl p-5 flex justify-between mx-30">
  <NavigationMenuList>
    <NavigationMenuItem className='text-2xl font-semibold tracking-tighter'>
      <Link href="/">E-Commerce</Link>
    </NavigationMenuItem>
  </NavigationMenuList>

 <NavigationMenuList className='font-bold text-lg gap-5'>
    <NavigationMenuItem> <Link href="/">Home</Link> </NavigationMenuItem>

    <NavigationMenuItem> <Link href="/products">Products</Link> </NavigationMenuItem>

    <NavigationMenuItem> <Link href="/cart">Cart</Link> </NavigationMenuItem>

    <NavigationMenuItem> <Link href="/category">Categories</Link> </NavigationMenuItem>

    <NavigationMenuItem> <Link href="/brands">Brands</Link> </NavigationMenuItem>
  </NavigationMenuList>

  <NavigationMenuList className='font-bold gap-2'>
    <NavigationMenuItem><button><ShoppingCart /></button></NavigationMenuItem>
    <NavigationMenuItem><button><Heart /></button></NavigationMenuItem>
  </NavigationMenuList>


</NavigationMenu>
    </div>
  )
}