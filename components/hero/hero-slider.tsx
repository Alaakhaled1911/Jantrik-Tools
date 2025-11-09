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
    <div className="relative w-full min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] rounded-lg overflow-hidden cursor-pointer group">
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.4 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={slides[current].bgImage}
            alt="Background"
            fill
            className="object-unset"
            priority
          />
          
        
        </motion.div>

        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 flex flex-col justify-center px-8 sm:px-12 md:px-16 lg:px-20 z-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-white flex flex-col gap-3 sm:gap-4 max-w-[90%] sm:max-w-lg"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-2xl sm:text-3xl md:text-4xl font-cursive italic font-bold text-white"
              style={{ fontFamily: 'cursive' }}
            >
              {slides[current].category}
            </motion.p>

            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white"
            >
              {slides[current].title}
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl  md:text-4xl   leading-tight text-white"
            >
              {slides[current].subtitle}
            </motion.h2>

            {slides[current].buttonText ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-6 sm:mt-8"
              >
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ffb300" }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block bg-[#ffc107]  text-black px-8 sm:px-10 py-3 sm:py-4 rounded-lg shadow-lg transition-all"
                >
                  {slides[current].buttonText}
                </motion.button>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="text-lg md:text-2xl  mt-4"
              >
                {slides[current].price}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-1 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        ←
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-1 sm:p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => {
              setCurrent(idx)
              setAutoPlay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === current ? "bg-white w-6" : "bg-white/50"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  )
}
