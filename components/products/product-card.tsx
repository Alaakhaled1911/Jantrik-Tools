"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/store"
import { addToCart } from "@/lib/slices/cartSlice"
import { toggleFavorite } from "@/lib/slices/favoritesSlice"
import type { Product } from "@/lib/types/product"

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCardItem({ product, index }: ProductCardProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const favoriteItems = useSelector((state: RootState) => state.favorites.items)
  const isFavorited = favoriteItems.includes(product.id)

  const [showActions, setShowActions] = useState(false)

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.originalPrice,
      }),
    )
  }

  const handleProductClick = () => {
    router.push(`/product/${product.id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(toggleFavorite(product.id))
  }

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>,
      )
    }
    return stars
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden group cursor-pointer relative"
      onClick={handleProductClick}
      onTouchStart={() => setShowActions(true)}
      onTouchEnd={() => {
        setTimeout(() => setShowActions(false), 1500) 
      }}
    >
      {/* Image Container */}
      <div className="relative h-64 bg-transparent overflow-hidden flex items-center justify-center">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain bg-cover bg-center group-hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.1 }}
          className="absolute top-4 right-4 bg-yellow-400 text-black px-2.5 py-1 rounded text-sm"
        >
          -{product.discount}%
        </motion.div>

        {/* Hover / Touch Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showActions ? 1 : 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 bg-black/10 flex items-end justify-between px-4 pb-4
            opacity-100 sm:opacity-0 sm:hover:opacity-100"
        >
          {/* Heart Icon */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFavoriteClick}
            className="transition-opacity"
          >
            <Heart size={20} className={`${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </motion.button>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation()
              handleAddToCart()
            }}
            className="bg-gray-300 -mb-2 py-2 px-4 text-xs tracking-widest hover:bg-yellow-400 hover:text-white transition-colors"
          >
            ADD TO CART
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 mt-12 sm:mt-10">
        {/* Rating */}
        <div className="flex justify-center gap-0.5 mb-2">{renderStars(product.rating)}</div>

        {/* Name */}
        <h3 className="text-center text-gray-700 font-medium text-sm mb-2 line-clamp-1">{product.name}</h3>

        {/* Price */}
        <div className="flex justify-center items-center gap-2">
          <span className="text-gray-900 font-bold text-sm">${product.price.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-xs">${product.originalPrice.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  )
}
