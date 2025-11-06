"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export function PromotionalBanners() {
  const banners = [
    {
      title: "Tools Set",
      subtitle: "Adjustable Wrench",
      price: "$350.99",
      bgImage: 'url("https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&h=400&fit=crop")',
      bgColor: "from-orange-600/60 to-red-700/60",
    },
    {
      title: "New Tools",
      subtitle: "Ac Drill Machine",
      price: "$290.99",
      bgImage: 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop")',
      bgColor: "from-blue-600/60 to-teal-700/60",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section className="py-12 px-4 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative h-64 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: banner.bgImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Dark Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${banner.bgColor} transition-opacity duration-300 group-hover:opacity-40`}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2">{banner.title}</p>
                  <h3 className="text-white font-bold text-2xl mb-2">{banner.subtitle}</h3>
                  <p className="text-white font-bold text-lg">From: {banner.price}</p>
                </div>

              </div>

            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
