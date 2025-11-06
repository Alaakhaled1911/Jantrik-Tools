"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Breadcrumb } from "@/components/product-details/breadcrumb"
import { ImageGallery } from "@/components/product-details/image-gallery"
import { ProductInfo } from "@/components/product-details/product-info"
import { SimilarProducts } from "@/components/product-details/similar-products"
import { products } from "@/lib/data/products"
import { useParams } from "next/navigation"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId) || products[0]
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details")

 const thumbnails = product.images || [product.image, product.image, product.image, product.image]


  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/" }, { label: "Product" }]} />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ImageGallery mainImage={product.image} thumbnails={thumbnails} />
          <ProductInfo product={product} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="border-t mt-12 pt-8"
        >
          <div className="flex gap-8 border-b mb-6">
            <button
              onClick={() => setActiveTab("details")}
              className={`font-semibold pb-4 transition ${
                activeTab === "details"
                  ? "text-gray-900 border-b-2 border-yellow-500"
                  : "text-gray-600 border-b-2 border-transparent"
              }`}
            >
              DETAILS
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`font-semibold pb-4 transition ${
                activeTab === "reviews"
                  ? "text-gray-900 border-b-2 border-yellow-500"
                  : "text-gray-600 border-b-2 border-transparent"
              }`}
            >
              REVIEWS {product.reviews && product.reviews > 0 ? product.reviews : ""}
            </button>
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            {activeTab === "details" && (
              <div className="text-gray-700 leading-relaxed">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="text-gray-700">
                <p className="mb-4">
                  {product.reviews && product.reviews > 0
                    ? `${product.reviews} review(s) for this product`
                    : "No reviews yet"}
                </p>
                <form className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="Write your review here..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>

        <SimilarProducts products={products} />
      </section>
    </main>
  )
}
