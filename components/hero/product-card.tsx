"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProductCardProps {
  image: string
  title?: string
  subtitle?: string
  backgroundColor?: string
  delay?: number
}

export function ProductCard({ 
  image, 
  title, 
  subtitle, 
  backgroundColor = "transparent", 
  delay = 0 
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative h-[238px]  rounded-lg overflow-hidden cursor-pointer flex items-center justify-between p-6 sm:p-8"
      style={{ backgroundColor }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={subtitle || title || "Product"}
          fill
          className="object-unset"
        />
      </div>

      {/* Hover Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/5 pointer-events-none"
      />
    </motion.div>
  )
}
