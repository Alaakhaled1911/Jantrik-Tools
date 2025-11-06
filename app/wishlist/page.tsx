"use client"

import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import Link from "next/link"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/product-details/breadcrumb"
import type { RootState } from "@/lib/store"
import { PRODUCTS } from "@/lib/data/products"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { useDispatch } from "react-redux"
import { addToCart } from "@/lib/slices/cartSlice"

export default function WishlistPage() {
  const dispatch = useDispatch()
  const favoriteIds = useSelector((state: RootState) => state.favorites.items)

  const favoriteProducts = PRODUCTS.filter((product) => favoriteIds.includes(product.id))

  const handleAddToCart = (product: (typeof PRODUCTS)[0]) => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      }),
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your wishlist is empty</p>
            <Link href="/" className="text-yellow-500 hover:text-yellow-600 font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {favoriteProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative w-full h-40 bg-gray-100 cursor-pointer">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/product/${product.id}`} className="hover:text-yellow-500 transition">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2">{product.name}</h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xs ${i < (product.rating || 3) ? "text-yellow-400" : "text-gray-300"}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded text-sm transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </main>
  )
}
