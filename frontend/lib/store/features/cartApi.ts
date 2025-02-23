import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_URLS = {
  ADD_TO_CART: `${BASE_URL}/cart/`,
  GET_CART: `${BASE_URL}/cart/`,
  DELETE_FROM_CART: (cartId: string) => `${BASE_URL}/cart/${cartId}`,
};

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (productData) => ({
        url: API_URLS.ADD_TO_CART,
        method: "POST",
        body: productData,
      }),
    }),

    removeFromCart: builder.mutation({
      query: (cartId) => ({
        url: API_URLS.DELETE_FROM_CART(cartId),
        method: "DELETE",
      }),
    }),

    getCart: builder.query({
      query: () => API_URLS.GET_CART,
    }),
  }),
});

export const { useAddToCartMutation, useRemoveFromCartMutation, useGetCartQuery } = cartApi;
