import { combineReducers } from "@reduxjs/toolkit";
import { authApi } from "./features/authApi";
import { productApi } from "./features/productApi";
import { cartApi } from "./features/cartApi";
import { wishlistApi } from "./features/wishlistApi";

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
});
