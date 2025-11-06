"use client"

import { motion } from "framer-motion"

interface ProductCardProps {
  image: string
  backgroundColor?: string
  delay?: number
}

export function ProductCard({ image, backgroundColor = "transparent", delay = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="relative h-full rounded-lg overflow-hidden cursor-pointer bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${image})`,
        backgroundColor,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-black/10 pointer-events-none"
      />
    </motion.div>
  )
}
