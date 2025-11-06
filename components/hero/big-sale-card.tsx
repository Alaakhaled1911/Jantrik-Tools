"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface BigSaleCardProps {
  image: string
  tag: string
  title: string
  subtitle: string
  buttonText: string
  delay?: number
}

export function BigSaleCard({ image, tag, title, subtitle, buttonText, delay = 0 }: BigSaleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="relative h-full min-h-[300px] rounded-lg overflow-hidden cursor-pointer group"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="absolute inset-0 bg-black/40" />

  
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: delay + 0.3 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 pr-6 z-10"
      >
        <Image src={image} alt={subtitle} width={220} height={220} className="object-contain drop-shadow-lg" />
      </motion.div>


      <div className="absolute inset-0 p-8 flex flex-col justify-center z-20">
        {/* Tag */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.1 }}
          className="text-sm font-bold text-yellow-300 uppercase tracking-wider mb-2"
        >
          {tag}
        </motion.p>

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
          className="text-xl font-bold text-white mb-1"
        >
          {title}
        </motion.h3>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="text-3xl font-extrabold text-white mb-6"
        >
          {subtitle}
        </motion.h2>

        {/* Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
          whileHover={{ scale: 1.05, backgroundColor: "#ffb300" }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#ffc107] text-black px-6 py-3 rounded-md font-bold w-fit shadow-lg transition-all"
        >
          {buttonText}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.15 }}
        className="absolute inset-0 bg-white pointer-events-none"
      />
    </motion.div>
  )
}
