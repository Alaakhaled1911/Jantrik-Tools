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
import { renderStars } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCardItem({ product, index }: ProductCardProps) {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const favoriteItems = useSelector((state: RootState) => state.favorites.items)
  const isFavorited = favoriteItems.includes(product.id)

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const isHovered = hoveredProduct === product.id

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="overflow-hidden group cursor-pointer relative rounded-lg"
      onClick={handleProductClick}
      onMouseEnter={() => setHoveredProduct(product.id)}
      onMouseLeave={() => setHoveredProduct(null)}
      onTouchStart={() => setHoveredProduct(product.id)}
    >
      {/* Image Container */}
      <div className="h-64 bg-transparent overflow-hidden flex items-center justify-center">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={200}
          height={200}
          className="object-contain bg-cover bg-center group-hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        />

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-2.5 py-1 rounded text-sm">
            -{product.discount}%
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 md:inset-auto md:bottom-0 md:left-0 md:right-0 bg-white/30 md:bg-transparent flex items-center md:items-end gap-2 justify-between px-4 py-4 md:pb-4 md:-mb-12 -mb-8 pointer-events-none md:pointer-events-auto"
        >
          {/* Heart Icon */}
          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFavoriteClick}
            className="transition-opacity pointer-events-auto"
          >
            <Heart size={20} className={`${isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </motion.button>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-gray-300 md:py-2 p-1 md:px-5 text-xs hover:bg-yellow-400 hover:text-white transition-colors pointer-events-auto"
          >
            ADD TO CART
          </motion.button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-3 bg-white">
        {renderStars(product.rating)}
        <h3 className="text-gray-700 font-medium text-sm line-clamp-2">{product.name}</h3>
        <div className="flex gap-2 items-center">
          <span className="font-bold text-gray-900 text-sm">${product.price.toFixed(2)}</span>
          <span className="text-gray-400 line-through text-xs">${product.originalPrice.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  )
}
