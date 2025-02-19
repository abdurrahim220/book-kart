import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { register } from "module";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_URLS = {
  REGISTER: `${BASE_URL}/user/create`,
  LOGIN: `${BASE_URL}/auth/login`,
  VERIFY_EMAIL: (token: string) => `${BASE_URL}/user/verify-email/${token}`,
  FORGOT_PASSWORD: (email: string) =>
    `${BASE_URL}/auth/forgot-password/${email}`,
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
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: API_URLS.REGISTER,
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (userData) => ({
        url: API_URLS.LOGIN,
        method: "POST",
        body: userData,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (token) => ({
        url: API_URLS.VERIFY_EMAIL(token),
        method: "GET",
      }),
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: API_URLS.FORGOT_PASSWORD,
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: (token) => ({
        url: API_URLS.RESET_PASSWORD(token),
        method: "POST",
        // body:
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: API_URLS.LOGOUT,
        method: "POST",
        // body:
      }),
    }),

    // product endpoints
    addProducts: builder.mutation({
      query: (productData) => ({
        url: API_URLS.CREATE_PRODUCT,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    getProducts: builder.query({
      query: () => API_URLS.GET_ALL_PRODUCTS,
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => API_URLS.GET_SINGLE_PRODUCT(id),
      providesTags: ["Product"],
    }),

    getProductBySellerId: builder.query({
      query: (id) => API_URLS.GET_SELLER_PRODUCTS(id),
      providesTags: ["Product"],
    }),

    deleteProductsById: builder.mutation({
      query: (productId) => ({
        url: API_URLS.DELETE_PRODUCT(productId),
        method: "DELETE",
        // body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    // carts endpoint

    addToCart: builder.mutation({
      query: (productData) => ({
        url: API_URLS.ADD_TO_CART,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: API_URLS.DELETE_PRODUCT(productId),
        method: "DELETE",
        // body: productData,
      }),
      invalidatesTags: ["Cart"],
    }),

    getCart: builder.query({
      query: () => API_URLS.GET_CART,
      providesTags: ["Product"],
    }),

    // wishlist endpoint
    addToWishlist: builder.mutation({
      query: () => ({
        url: API_URLS.ADD_TO_WISHLIST,
        method: "POST",
        // body: productData,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: API_URLS.DELETE_FROM_WISHLIST(productId),
        method: "DELETE",
        // body: productData,
      }),
      invalidatesTags: ["Wishlist"],
    }),

    getWishlist: builder.query({
      query: () => API_URLS.GET_WISHLIST,
      providesTags: ["Wishlist"],
    }),

    // order endpoint
    getUserOrder: builder.query({
      query: () => API_URLS.GET_ALL_ORDERS,
      providesTags: ["Order"],
    }),
    // getOrderById: builder.query({
    //   query: () => API_URLS.CREATE_ORDER,
    //   providesTags: ["Order"],
    // }),


  }),
});

export const { 
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  
  // Product Mutations & Queries
  useAddProductsMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySellerIdQuery,
  useDeleteProductsByIdMutation,

  // Cart Mutations & Queries
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,

  // Wishlist Mutations & Queries
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,

  // Order Queries
  useGetUserOrderQuery,
} = api;
