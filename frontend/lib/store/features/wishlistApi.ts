import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../hooks/baseQueryWithErrorHandling";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_URLS = {
  ADD_TO_WISHLIST: `${BASE_URL}/wish-list/add`,
  GET_WISHLIST: `${BASE_URL}/wish-list/`,
  DELETE_FROM_WISHLIST: (productId: string) =>
    `${BASE_URL}/wish-list/${productId}`,
};

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    addToWishlist: builder.mutation({
      query: (productData) => ({
        url: API_URLS.ADD_TO_WISHLIST,
        method: "POST",
        body: productData,
      }),
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: API_URLS.DELETE_FROM_WISHLIST(productId),
        method: "DELETE",
      }),
    }),

    getWishlist: builder.query({
      query: () => API_URLS.GET_WISHLIST,
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
} = wishlistApi;
