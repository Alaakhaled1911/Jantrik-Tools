"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function BannerSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 bg-gray-200 rounded-lg overflow-hidden"
    >
      <div className="relative h-64 md:h-72 w-full flex items-center justify-center">
        {/* Background Image */}
        <Image src="/tools-banner-circular-saw-power-saw.jpg" alt="Circular Saw / Power Saw Banner" fill className="object-cover" />
      </div>
    </motion.div>
  )
}
