"use client"
import { ProductCard } from "./product-card"
import { HeroSlider } from "./hero-slider"

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <HeroSlider />
        </div>

        {/* Right Column - Stacked Product Cards */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* Top Product Card - Wood Sharpener */}
          <ProductCard
            image="/newarrival1.webp"
            title="New Tools"
            subtitle="Wood Sharpener"
            category="New Arrivals 2018"
            price="From: $689.99"
            delay={0.3}
          />

          {/* Bottom Product Card - Wood Cutter */}
          <ProductCard
            image="/newarrival2.webp"
            title="New Tools"
            subtitle="Wood Cutter"
            category="New Arrivals 2018"
            price="From: $399.99"
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
