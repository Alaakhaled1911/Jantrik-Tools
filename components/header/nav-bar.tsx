"use client"

import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import type { RootState } from "@/lib/store"
import { ShoppingCart, Heart } from "lucide-react"
import Link from "next/link"




export function NavBar() {
  const router = useRouter()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const favoriteItems = useSelector((state: RootState) => state.favorites.items)

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-white border-b border-gray-200 header-bottom header-sticky sticky top-0 z-50"
    >
      <div className="max-w-8xl mx-auto px-4 py-6 flex items-center justify-around gap-4"> 
        {/* Logo */}
         <Link href="/" > 
<img src="/logo.webp" alt="Jantrik Logo" className="w-28" />

</Link>

        {/* Right Icons */}
        <div className="flex items-center gap-6">

          <motion.button
            onClick={() => router.push("/wishlist")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative text-gray-700 hover:text-[#ffc107] transition-colors"
          >
            <Heart size={20} />
            {favoriteItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoriteItems.length}
              </span>
            )}
          </motion.button>

          <motion.button
            onClick={() => router.push("/cart")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative text-gray-700 hover:text-[#ffc107] transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-2 -right-2 bg-[#ffc107] text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartItems}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.nav>
  )
}
