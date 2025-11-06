"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductCarousel } from "@/components/sections/product-carousel"
import { PromotionalBanners } from "@/components/sections/promotional-banners"
import { ProductShowcase } from "@/components/products/product-showcase"
import { ServiceInfoSection } from "@/components/service-info/service-info-section"
import { BestSellersSection } from "@/components/best-sellers/best-sellers-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <ProductCarousel />
      <PromotionalBanners />
      <ProductShowcase />
      <BestSellersSection />
          <ServiceInfoSection />
    </main>
  )
}
