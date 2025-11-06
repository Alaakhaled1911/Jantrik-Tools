"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface ImageGalleryProps {
  mainImage: string
  thumbnails: string[]
}

export function ImageGallery({ mainImage, thumbnails }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(mainImage)

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg overflow-hidden aspect-square"
      >
        <Image
          src={selectedImage || "/placeholder.svg"}
          alt="Product"
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="flex gap-2">
        {thumbnails.map((thumb, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedImage(thumb)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-16 h-16 rounded border-2 overflow-hidden ${
              selectedImage === thumb ? "border-yellow-500" : "border-gray-200"
            }`}
          >
            <Image
              src={thumb || "/placeholder.svg"}
              alt={`Thumbnail ${index + 1}`}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </div>
  )
}
