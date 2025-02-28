import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";
import wishListReducer from "./slice/whishListSlice";
import { authApi } from "./features/authApi";
import { productApi } from "./features/productApi";
import { cartApi } from "./features/cartApi";
import { wishlistApi } from "./features/wishlistApi";

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "role", "isLoggedIn", "token"],
};

const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};

const wishListPersistConfig = {
  key: "wishlist",
  storage,
  whitelist: ["items"],
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishListReducer = persistReducer(
  wishListPersistConfig,
  wishListReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishListReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: [],
      },
    }).concat([
      authApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
