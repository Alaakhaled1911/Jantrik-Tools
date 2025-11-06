"use client"

import { motion } from "framer-motion"
import { ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import type { Product } from "@/lib/types/product"

interface TopProductsSidebarProps {
  products: Product[]
}

export function TopProductsSidebar({ products }: TopProductsSidebarProps) {
  const [scrollIndex, setScrollIndex] = useState(0)
  const itemsPerView = 5
  const maxScroll = Math.max(0, products.length - itemsPerView)

  const handleScrollUp = () => {
    setScrollIndex(Math.max(0, scrollIndex - 1))
  }

  const handleScrollDown = () => {
    setScrollIndex(Math.min(maxScroll, scrollIndex + 1))
  }

  const visibleProducts = products.slice(scrollIndex, scrollIndex + itemsPerView)

  const renderStars = (rating: number) => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={i < Math.floor(rating) ? "text-yellow-400 text-xs" : "text-gray-300 text-xs"}>
          ★
        </span>,
      )
    }
    return stars
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white p-4">
      {/* Header with Title and Arrows */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <h3 className="text-gray-800 font-semibold text-sm">Top Products</h3>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollUp}
            disabled={scrollIndex === 0}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronUp size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollDown}
            disabled={scrollIndex === maxScroll}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronDown size={18} />
          </motion.button>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {visibleProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex gap-3 pb-3 border-b border-gray-100 last:border-0 last:pb-0"
          >
            {/* Product Image */}
            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={60}
                height={60}
                className="object-contain"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <div className="flex gap-0.5 mb-1">{renderStars(product.rating)}</div>
              <h4 className="text-gray-700 font-medium text-xs truncate">{product.name}</h4>
              <div className="flex gap-2 mt-1">
                <span className="text-gray-900 font-bold text-xs">${product.price.toFixed(2)}</span>
                <span className="text-gray-400 line-through text-xs">${product.originalPrice.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
