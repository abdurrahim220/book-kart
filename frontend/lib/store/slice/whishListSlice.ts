import { IWishlistItem } from "@/lib/interface/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishListState {
  items: IWishlistItem[];
}

const initialState: WishListState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    setWishList: (state, action: PayloadAction<IWishlistItem[]>) => {
      state.items = action.payload;
    },
    clearWishList: (state) => {
      state.items = [];
    },
    addToWishList: (state, action: PayloadAction<IWishlistItem>) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItemIndex !== -1) {
        state.items[existingItemIndex] = action.payload;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromWishList: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setWishList, clearWishList, addToWishList, removeFromWishList } =
  wishListSlice.actions;
export default wishListSlice.reducer;
