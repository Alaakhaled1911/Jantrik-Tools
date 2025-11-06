"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { addToCart } from "@/lib/slices/cartSlice"
import { toggleFavorite } from "@/lib/slices/favoritesSlice"
import type { RootState } from "@/lib/store"
import type { Product } from "@/lib/types/product"

interface ProductInfoProps {
  product: Product
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const favorites = useSelector((state: RootState) => state.favorites.items)
  const isFavorite = favorites.includes(product.id)

  const handleAddToCart = () => {
    dispatch(addToCart({ id: product.id, name: product.name }))
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h1>
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-lg ${i < Math.floor(product.rating) ? "text-yellow-500" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">(1 Review)</span>
        
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className="text-lg text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-600">IN STOCK {product.stock || 50}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-gray-600 hover:bg-gray-200"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
              className="w-12 text-center border-0 bg-transparent font-medium"
            />
            <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-200">
              +
            </button>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded  w-full md:max-w-[200px]"
          >
            Add to Cart
          </motion.button>
        </div>

        
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleToggleFavorite}
            className="flex-1 w0-full w-[200px]  text-gray-700 font-medium py-2 rounded flex items-center justify-center gap-2 transition"
          >
            <Heart size={18} className={`${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`}/>
            Add To Wish List
          </motion.button>

      </div>

      <div className="pt-4 border-t">
        <p className="text-gray-600 leading-relaxed text-sm">
          Everything you need for a trip to the gym will fit inside this surprisingly spacious Products Name Here. Stock
          it with a water bottle, change of clothes, pair of shoes, and even a few beauty products. Fits inside a locker
          and zips shut for security.
        </p>
      </div>
    </motion.div>
  )
}
