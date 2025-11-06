"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface SlideItem {
  id: number
  bgImage: string
  title: string
  subtitle: string
  category: string
  price: string
  buttonText?: string
}

const slides: SlideItem[] = [
  {
    id: 1,
    bgImage: "/hero1.webp",
    title: "Hand Tools",
    subtitle: "Power Saw Machine",
    category: "Big Sale",
    price: "Shop Now",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    bgImage: "/hero2.webp",
    title: "Big Sale",
    subtitle: "Power Saw Machine",
    buttonText: "Shop Now",
    category: "New Arrivals 2018",
    price: "From: $399.99",
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [autoPlay, current])

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden cursor-pointer group">
      <AnimatePresence mode="wait">
      
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 3 }}
          exit={{ opacity: .4 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image src={slides[current].bgImage} alt="Background" fill className="object-contain" priority />
        </motion.div>

        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-between px-8"
        >
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="z-10 text-white flex flex-col gap-2 max-w-md"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm font-semibold"
            >
              {slides[current].category}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-2xl font-bold"
            >
              {slides[current].title}
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-4xl font-bold"
            >
              {slides[current].subtitle}
            </motion.h2>

            {slides[current].buttonText ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ffb300" }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#ffc107] text-black px-6 py-2 rounded-md font-semibold transition-colors mt-4"
                >
                  {slides[current].buttonText}
                </motion.button>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-lg font-semibold mt-2"
              >
                {slides[current].price}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>


      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        →
      </button>

      <div className="absolute bottom-6 left-8 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setAutoPlay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${idx === current ? "bg-white w-6" : "bg-white/50"}`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  )
}
