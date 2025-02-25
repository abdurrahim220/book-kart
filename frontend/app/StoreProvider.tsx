"use client";
import BookLoader from "@/lib/constant/BookLoader";

import { persistor, store } from "@/lib/store/store";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistGate loading={<BookLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
