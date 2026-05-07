import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20">

      {/* Promo Strip */}
      <div className="bg-indigo-600 py-3 text-center text-white font-semibold text-sm tracking-wide">
        🚚 Free Shipping on orders over 500 EGP — Use code <span className="underline font-bold">FREESHIP</span>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">E-Commerce</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Your one-stop shop for the best products at the best prices. Quality guaranteed, delivered to your door.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-indigo-400 transition-colors duration-200"><Facebook size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors duration-200"><Twitter size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors duration-200"><Instagram size={20} /></a>
            <a href="#" className="hover:text-indigo-400 transition-colors duration-200"><Youtube size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-bold text-lg mb-1">Quick Links</h3>
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Categories", href: "/categories" },
            { label: "Brands", href: "/brands" },
            { label: "Cart", href: "/cart" },
            { label: "Wishlist", href: "/wishlist" },
          ].map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-200 w-fit"
            >
              → {link.label}
            </Link>
          ))}
        </div>

        {/* Customer Service */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white font-bold text-lg mb-1">Customer Service</h3>
          {[
            { label: "FAQ", href: "#" },
            { label: "Shipping Policy", href: "#" },
            { label: "Return Policy", href: "#" },
            { label: "Track Your Order", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms & Conditions", href: "#" },
          ].map(link => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm text-gray-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-200 w-fit"
            >
              → {link.label}
            </Link>
          ))}
        </div>

        {/* Contact & Newsletter */}
        <div className="flex flex-col gap-4">
          <h3 className="text-white font-bold text-lg mb-1">Contact Us</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin size={16} className="text-indigo-400 shrink-0" />
            <span>Cairo, Egypt</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Phone size={16} className="text-indigo-400 shrink-0" />
            <span>+20 123 456 7890</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Mail size={16} className="text-indigo-400 shrink-0" />
            <span>support@ecommerce.com</span>
          </div>

          {/* Newsletter */}
          <div className="mt-2">
            <h4 className="text-white font-semibold text-sm mb-2">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-800 text-white text-sm px-3 py-2 rounded-l-lg outline-none border border-gray-700 focus:border-indigo-500 transition-colors"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-r-lg transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-5 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} E-Commerce. All rights reserved. Built with ❤️ in Cairo.</p>
      </div>

    </footer>
  )
}