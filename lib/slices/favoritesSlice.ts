import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FavoritesState {
  items: string[]
}

const initialState: FavoritesState = {
  items: [],
}

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload
      const index = state.items.indexOf(id)
      if (index > -1) {
        state.items.splice(index, 1)
      } else {
        state.items.push(id)
      }
    },
  },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
