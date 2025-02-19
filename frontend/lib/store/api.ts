import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_URLS = {
  REGISTER: `${BASE_URL}/user/create`,
  LOGIN: `${BASE_URL}/auth/login`,
  VERIFY_EMAIL: (token: string) => `${BASE_URL}/user/verify-email/${token}`,
  FORGOT_PASSWORD: (token: string) =>
    `${BASE_URL}/auth/forgot-password/${token}`,
  RESET_PASSWORD: (token: string) => `${BASE_URL}/auth/reset-password/${token}`,
  LOGOUT: `${BASE_URL}/auth/logout`,

  // PRODUCT RELATED URLS
  CREATE_PRODUCT: `${BASE_URL}/product/create`,
  UPDATE_PRODUCT: (productId: string) =>
    `${BASE_URL}/product/update/${productId}`,
  GET_ALL_PRODUCTS: `${BASE_URL}/product/`,
  GET_SINGLE_PRODUCT: (productId: string) =>
    `${BASE_URL}/product/single-product/${productId}`,
  GET_SELLER_PRODUCTS: (sellerId: string) =>
    `${BASE_URL}/product/seller-product/${sellerId}`,
  DELETE_PRODUCT: (productId: string) => `${BASE_URL}/product/${productId}`,

  // ORDER RELATED URLS
  CREATE_ORDER: `${BASE_URL}/order/`,
  GET_ALL_ORDERS: `${BASE_URL}/order/`,
  DELETE_ORDER: (orderId: string) => `${BASE_URL}/order/${orderId}`,

  // CART RELATED URLS
  ADD_TO_CART: `${BASE_URL}/cart/`,
  GET_CART: `${BASE_URL}/cart/`,
  DELETE_FROM_CART: (cartId: string) => `${BASE_URL}/cart/${cartId}`,

  // WISHLIST RELATED URLS
  ADD_TO_WISHLIST: `${BASE_URL}/wish-list/add`,
  GET_WISHLIST: `${BASE_URL}/wish-list/`,
  DELETE_FROM_WISHLIST: (productId: string) =>
    `${BASE_URL}/wish-list/${productId}`,
};

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, credentials: "include" }),
  tagTypes: ["User", "Product", "Order", "Cart", "Wishlist"],
  endpoints: (builder) => ({}),
});

export { API_URLS };
