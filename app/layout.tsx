import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/nav-comps/Navbar";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import ReduxProvider from "app/context/ReduxProvider"
import { WishlistProvider } from "./context/WishlistContext";
import { Toaster } from 'react-hot-toast'
import Footer from "./Components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "E-Commerce app built with Next.js 13 and Tailwind CSS",
  icons: {
    icon: "/shopping_8899734.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Toaster position="top-center" />

        <AuthProvider>
          <CartProvider>
            <WishlistProvider> 
              <ReduxProvider>
                <Navbar />
                {children}
                <Footer />
              </ReduxProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}