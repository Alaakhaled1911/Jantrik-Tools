"use client"

import { useSelector, useDispatch } from "react-redux"
import { motion } from "framer-motion"
import Link from "next/link"
import type { RootState } from "@/lib/store"
import { removeFromCart, updateQuantity } from "@/lib/slices/cartSlice"
import Image from "next/image"

export default function CartPage() {
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.cartItems)

  const cartDetails = cartItems.map((item) => ({
    ...item,
    total: item.price * item.quantity,
  }))

  const subtotal = cartDetails.reduce((sum, item) => sum + item.total, 0)
  const total = subtotal

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id))
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }))
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Cart</h1>

        {cartDetails.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link href="/" className="text-yellow-500 hover:text-yellow-600 font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 md:space-y-0 md:border md:rounded-lg md:overflow-hidden"
              >
                <table className="w-full hidden md:table">
                  <thead>
                    <tr className="bg-gray-50 border-b">
                      <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Image</th>
                      <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                      <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                      <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                      <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Total</th>
                      <th className="px-4 md:px-6 py-4 text-left text-sm font-semibold text-gray-900">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="px-4 md:px-6 py-4">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="rounded"
                          />
                        </td>
                        <td className="px-4 md:px-6 py-4 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 md:px-6 py-4 text-sm text-gray-900">${item.price?.toFixed(2)}</td>
                        <td className="px-4 md:px-6 py-4">
                          <div className="flex items-center gap-2 bg-gray-100 rounded w-fit">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                            >
                              −
                            </button>
                            <span className="px-2 font-medium">{item.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-200"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-4 text-sm font-semibold text-gray-900">
                          ${item.total?.toFixed(2)}
                        </td>
                        <td className="px-4 md:px-6 py-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemove(item.id)}
                            className="text-gray-400 hover:text-red-500 transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>

                <div className="md:hidden space-y-4">
                  {cartDetails.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 bg-white"
                    >
                      <div className="flex gap-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h3 className="font-semibold text-gray-900 text-sm md:text-base break-words">
                              {item.name}
                            </h3>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemove(item.id)}
                              className="text-gray-400 hover:text-red-500 transition flex-shrink-0"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </motion.button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">Price: ${item.price?.toFixed(2)}</p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 bg-gray-100 rounded">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-200 text-sm"
                              >
                                −
                              </button>
                              <span className="px-2 font-medium text-sm">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="px-2 py-1 text-gray-600 hover:bg-gray-200 text-sm"
                              >
                                +
                              </button>
                            </div>
                            <span className="font-semibold text-gray-900">${item.total?.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-50 rounded-lg p-6 md:p-8 h-fit order-last lg:order-last"
            >
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-6">CART TOTALS</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <span className="text-sm md:text-base text-gray-600">SUBTOTAL</span>
                  <span className="text-yellow-500 font-bold text-sm md:text-base">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-base md:text-lg font-bold text-gray-900">TOTAL</span>
                  <span className="text-xl md:text-2xl font-bold text-yellow-500">${total.toFixed(2)}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded mt-8 transition text-sm md:text-base"
              >
                PROCEED TO CHECKOUT
              </motion.button>
              
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-6 md:mt-8">
                <Link href="/" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 md:px-10 rounded transition w-full text-sm md:text-base"
                  >
                    CONTINUE SHOPPING
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </section>
    </main>
  )
}
