"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import type { Product } from "@/lib/types/product"
import { ProductCardItem } from "./product-card"

interface TabbedProductsProps {
  products: Product[]
}

type TabType = "new" | "featured" | "rated"

export function TabbedProducts({ products }: TabbedProductsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("featured")

  const tabs = [
    { id: "new", label: "New Arrivals", key: "new" as TabType },
    { id: "featured", label: "Featured", key: "featured" as TabType },
    { id: "rated", label: "Top Rated", key: "rated" as TabType },
  ]

  const filteredProducts = products.filter((product) => product.category === activeTab)

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
              activeTab === tab.key ? "text-gray-900" : "text-gray-600 hover:text-gray-900"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {tab.label}
            {activeTab === tab.key && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-1 bg-yellow-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Products Grid */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      >
        {filteredProducts.map((product, index) => (
          <ProductCardItem key={product.id} product={product} index={index} />
        ))}
        
      </motion.div>
    </div>
  )
}
