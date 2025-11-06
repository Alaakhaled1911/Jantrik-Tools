"use client"

import { motion } from "framer-motion"
import { PhoneIcon, Globe } from "lucide-react"

export function TopBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Phone */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <PhoneIcon size={18} />
          <span className="text-sm">Call Us : +123</span>
        </div>


        {/* Right: Language and Currency */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-colors">
            <Globe size={18} />
            <span className="text-sm">Language: English</span>
          </div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-600 transition-colors">
            <span className="text-sm">Currency: USD</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
