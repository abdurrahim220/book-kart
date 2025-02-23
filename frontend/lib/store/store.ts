import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
} from "redux-persist";
import userReducer from "./slice/userSlice";
import { authApi } from "./features/authApi";
import { productApi } from "./features/productApi";
import { cartApi } from "./features/cartApi";
import { wishlistApi } from "./features/wishlistApi";

// Persist Config
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user", "role", "isLoggedIn"],
};

// Wrap user reducer with persist config
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

// ✅ Include all reducers in the store
export const store = configureStore({
  reducer: {
    user: persistedUserReducer, // ✅ Persisted user reducer
    [authApi.reducerPath]: authApi.reducer, // ✅ RTK Query reducers
    [productApi.reducerPath]: productApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      authApi.middleware,
      productApi.middleware,
      cartApi.middleware,
      wishlistApi.middleware,
    ]),
});

// ✅ Setup RTK Query listeners
setupListeners(store.dispatch);

// ✅ Persist store
export const persistor = persistStore(store);

// ✅ Correctly define RootState
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
