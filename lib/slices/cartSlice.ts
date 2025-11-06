import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
  originalPrice: number
}

interface CartState {
  items: number
  cartItems: CartItem[]
}

const initialState: CartState = {
  items: 0,
  cartItems: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action: PayloadAction<number>) => {
      state.items = action.payload
    },
    addToCart: (
      state,
      action: PayloadAction<{ id: string; name: string; price: number; image: string; originalPrice: number }>,
    ) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cartItems.push({
          id: action.payload.id,
          name: action.payload.name,
          quantity: 1,
          price: action.payload.price,
          image: action.payload.image,
          originalPrice: action.payload.originalPrice,
        })
      }
      state.items += 1
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((item) => item.id === action.payload)
      if (item) {
        state.items -= item.quantity
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload)
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id)
      if (item) {
        const difference = action.payload.quantity - item.quantity
        state.items += difference
        item.quantity = action.payload.quantity
      }
    },
  },
})

export const { setCartItems, addToCart, removeFromCart, updateQuantity } = cartSlice.actions
export default cartSlice.reducer
