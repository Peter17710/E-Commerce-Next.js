"use client"
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/app/context/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const { totalItems } = useCart();

  return (
    <div>
      <NavigationMenu className="text-md max-w-7xl p-5 flex justify-between mx-30">
        <NavigationMenuList>
          <NavigationMenuItem className='text-2xl font-semibold tracking-tighter'>
            <Link href="/">E-Commerce</Link>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className='font-bold text-lg gap-5'>
          <NavigationMenuItem><Link href="/">Home</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/products">Products</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/cart">Cart</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/categories">Categories</Link></NavigationMenuItem>
          <NavigationMenuItem><Link href="/brands">Brands</Link></NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList className='font-bold gap-2'>

          <NavigationMenuItem>
            <Link href="/cart" className='relative'>
              {totalItems > 0 && (
                <Badge variant="default" className='absolute top-[-8px] right-[-8px] z-10 text-xs px-1.5'>
                  {totalItems}
                </Badge>
              )}
              <ShoppingCart />
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/wishlist" className='relative'>
              <Heart />
            </Link>
          </NavigationMenuItem>

          {session ? (
            <NavigationMenuItem>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
              >
                Logout
              </button>
            </NavigationMenuItem>
          ) : (
            <>
              <NavigationMenuItem>
                <Link href="/login">Login</Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/register">Register</Link>
              </NavigationMenuItem>
            </>
          )}

        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}