"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { products } from "@/lib/data/products"
import { Star, Heart } from "lucide-react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { addToCart } from "@/lib/slices/cartSlice"
import { toggleFavorite } from "@/lib/slices/favoritesSlice"

export function ProductCarousel() {
  const carouselProducts = products.slice(8, 13)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const favoriteItems = useSelector((state: RootState) => state.favorites.items)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`${
            star <= Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : star - rating < 1
                ? "fill-yellow-400 text-yellow-400 opacity-50"
                : "text-gray-300"
          }`}
        />
      ))}
    </div>
  )

  return (
    <section className="py-12 px-4 bg-white">
      <motion.div
        className="max-w-7xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {carouselProducts.map((product) => {
            const isFavorited = favoriteItems.includes(product.id)

            const handleAddToCart = (e: React.MouseEvent) => {
              e.stopPropagation()
              dispatch(
                addToCart({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  originalPrice: product.originalPrice,
                })
              )
            }

            const handleFavoriteClick = (e: React.MouseEvent) => {
              e.stopPropagation()
              dispatch(toggleFavorite(product.id))
            }

            return (
              <motion.div
                key={product.id}
                variants={itemVariants}
                onClick={() => router.push(`/product/${product.id}`)}
                className="cursor-pointer relative group rounded-lg  "
              >
                {/* Product Image */}
                <div className="relative w-full  ">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}

                   width={200}
                   height={200}
                    className="object-contain bg-cover bg-center group-hover:scale-105 transition-transform duration-300 flex items-center justify-center"
                  />

                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black font-bold px-2 py-1 rounded text-xs">
                      -{product.discount}%
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-col gap-3 bg-white">
                  {renderStars(product.rating)}
                  <h3 className="text-gray-700 font-medium text-sm line-clamp-2 ">
                    {product.name}
                  </h3>
                  <div className="flex gap-2 items-center">
                    <span className="font-bold text-gray-900 text-sm">${product.price.toFixed(2)}</span>
                    <span className="text-gray-400 line-through text-xs">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 -mb-8 hover:border-2 hover:p-5 transition-colors flex items-end justify-between px-4 pb-4"
                >
                  {/* Heart Icon */}
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFavoriteClick}
                    className="transition-opacity"
                  >
                    <Heart
                      size={20}
                      className={`${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </motion.button>

                  {/* Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddToCart}
                    className="bg-gray-300  py-2 px-5 text-xs tracking-widest hover:bg-yellow-400 hover:text-white transition-colors rounded-md"
                  >
                    ADD TO CART
                  </motion.button>
              
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
