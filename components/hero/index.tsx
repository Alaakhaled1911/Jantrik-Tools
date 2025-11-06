"use client"
import { ProductCard } from "./product-card"
import { HeroSlider } from "./hero-slider"

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 min-h-[400px]">
          <HeroSlider />
        </div>

        {/* Right Column - Stacked Product Cards */}
        <div className="flex flex-col ">
          {/* Top Product Card - Wood Sharpener */}
          <ProductCard
            image="/newarrival1.webp"
            title="New Tools"
            subtitle="Wood Sharpener"
            category="New Arrivals 2018"
            price="From: $689.99"
            backgroundColor=""
            delay={0.3}
          />

          {/* Bottom Product Card - Wood Cutter */}
          <ProductCard
            image="/newarrival2.webp"
            title="New Tools"
            subtitle="Wood Cutter"
            category="New Arrivals 2018"
            price="From: $399.99"
            backgroundColor=""
            delay={0.4}
          />
        </div>
      </div>
    </section>
  )
}
