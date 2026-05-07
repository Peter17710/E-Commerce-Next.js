"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/app/context/CartContext';
import { useWishlist } from '@/app/context/WishlistContext';
import DarkModeToggle from '../dark-mode/page';

export default function Navbar() {
  const { data: session } = useSession();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-gray-900"
      }`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold tracking-tight text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
            E-Commerce
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200 group"
              >
                {link.label}
                {/* ✅ underline animation on hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-5">

            {/* Dark Mode */}
            <DarkModeToggle />

            {/* Cart */}
            <Link href="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200">
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 z-10 text-xs w-5 h-5 flex items-center justify-center p-0 bg-indigo-600">
                  {totalItems}
                </Badge>
              )}
              <ShoppingCart size={22} />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="relative text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors duration-200">
              {totalWishlistItems > 0 && (
                <Badge className="absolute -top-2 -right-2 z-10 text-xs w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                  {totalWishlistItems}
                </Badge>
              )}
              <Heart size={22} />
            </Link>

            {/* Auth */}
            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  Hi, {(session.user?.name ?? 'User').split(' ')[0]}
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-screen py-4' : 'max-h-0'}`}>
          <div className="container mx-auto px-6 flex flex-col gap-4 pb-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              <Link href="/cart" className="relative" onClick={() => setMobileOpen(false)}>
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center p-0 bg-indigo-600">
                    {totalItems}
                  </Badge>
                )}
                <ShoppingCart size={22} className="text-gray-600 dark:text-gray-300" />
              </Link>

              <Link href="/wishlist" className="relative" onClick={() => setMobileOpen(false)}>
                {totalWishlistItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 text-xs w-5 h-5 flex items-center justify-center p-0 bg-red-500">
                    {totalWishlistItems}
                  </Badge>
                )}
                <Heart size={22} className="text-gray-600 dark:text-gray-300" />
              </Link>

              <DarkModeToggle />
            </div>

            {session ? (
              <button
                onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
                className="cursor-pointer text-sm font-semibold px-4 py-2 rounded-full bg-black text-white hover:bg-indigo-600 transition-all duration-200 w-fit"
              >
                Logout
              </button>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold px-4 py-2 rounded-full border border-gray-300 hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200">
                  Login
                </Link>
                <Link href="/register" onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold px-4 py-2 rounded-full bg-black text-white hover:bg-indigo-600 transition-all duration-200">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ spacer so content doesn't hide under fixed navbar */}
      <div className="h-[73px]" />
    </>
  )
}