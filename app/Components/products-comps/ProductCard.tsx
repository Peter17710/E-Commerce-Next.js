"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Products } from "@/app/types/products.model"
import Image from "next/image"
import { StarRating } from "react-flexible-star-rating"
import { Heart, ShoppingCart, ZoomIn } from "lucide-react"
import Link from "next/link"
import { useCart } from '@/app/context/CartContext'
import toast from "react-hot-toast"
import { useSession } from "next-auth/react"


export default function ProductCard({ productData }: { productData: Products }) {
    const { addToCart } = useCart()
    const { data: session } = useSession()

   const handleAddToCart = () => {
    const token = (session as any)?.token // ✅ get token from session
    if (!token) {
      toast.error("Please login first!")
      return
    }
    addToCart(productData, token)
    toast.success("Added to cart!")
  }

    return (
        <div className="min-w-0">
            <Card className="relative h-auto w-full group">
                <div className="absolute z-20 flex flex-col gap-5 top-37.5 right-3 rounded-full bg-slate/200 p-2 shadow-lg shadow-black/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button onClick={handleAddToCart} className="text-slate-900 hover:text-blue-700">
                        <ShoppingCart />
                    </button>
                    <button className="text-slate-900 hover:text-blue-700"><Heart /></button>
                    <button className="text-slate-900 hover:text-blue-700">
                        <Link href={`/products/${productData._id}`}>
                            <ZoomIn />
                        </Link>
                    </button>
                </div>
                <CardHeader>
                    <CardTitle className="line-clamp-2 text-base">
                        {productData.title.split(" ").slice(0, 2).join(" ")}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                        {productData.description.split(" ").slice(0, 4).join(" ")}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="relative aspect-square w-full h-75 overflow-hidden rounded-md bg-muted">
                        <Image src={productData.imageCover}
                            alt={productData.title}
                            className="h-full w-full object-cover"
                            fill
                            sizes="(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw"
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t pt-4">
                    <h2 className="text-m font-bold">${productData.price.toFixed(2)}</h2>
                <StarRating initialRating={Math.round(productData.ratingsAverage * 2) / 2} dimension={5} />
                </CardFooter>
            </Card>
        </div>
    )
}