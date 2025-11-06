"use client"

import { motion } from "framer-motion"
import { products } from "@/lib/data/products"
import { TopProductsSidebar } from "./top-products-sidebar"
import { TabbedProducts } from "./tabbed-products"
import { BannerSection } from "./banner-section"

export function ProductShowcase() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Layout: Sidebar + Tabbed Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Left Sidebar - Top Products */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TopProductsSidebar products={products} />
          </motion.div>

          {/* Right Content - Tabbed Products */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <TabbedProducts products={products} />
          </motion.div>
        </div>

        {/* Banner Section */}
        <BannerSection />
      </div>
    </section>
  )
}
