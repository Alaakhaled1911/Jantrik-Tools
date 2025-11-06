"use client"

import type React from "react"

import { motion } from "framer-motion"

interface ServiceInfoBoxProps {
  icon: React.ReactNode
  title: string
  description: string
  index: number
}

export function ServiceInfoBox({ icon, title, description, index }: ServiceInfoBoxProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-center gap-4 p-6 bg-white"
    >
      <div className="flex-shrink-0 text-gray-600">{icon}</div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
        <p className="text-gray-600 text-xs mt-1">{description}</p>
      </div>
    </motion.div>
  )
}
