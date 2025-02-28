import { ICart } from "@/lib/interface/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICart = {
  _id: "",
  user: "",
  items: [],
  createAt: "",
  updatedAt: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<ICart>) => {
      return { ...state, ...action.payload };
    },
    addToCart: (state, action: PayloadAction<ICart>) => {
      return { ...state, ...action.payload };
    },
    clearCart: () => initialState,
  },
});

export const { setCart, addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
