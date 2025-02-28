import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_URLS = {
  CREATE_PRODUCT: `${BASE_URL}/product/create`,
  UPDATE_PRODUCT: (productId: string) =>
    `${BASE_URL}/product/update/${productId}`,
  GET_ALL_PRODUCTS: `${BASE_URL}/product/`,
  GET_SINGLE_PRODUCT: (productId: string) =>
    `${BASE_URL}/product/single-product/${productId}`,
  GET_SELLER_PRODUCTS: (sellerId: string) =>
    `${BASE_URL}/product/seller-product/${sellerId}`,
  DELETE_PRODUCT: (productId: string) => `${BASE_URL}/product/${productId}`,
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productData) => ({
        url: API_URLS.CREATE_PRODUCT,
        method: "POST",
        body: productData,
      }),
    }),

    getProducts: builder.query({
      query: () => API_URLS.GET_ALL_PRODUCTS,
    }),

    getProductById: builder.query({
      query: (id) => API_URLS.GET_SINGLE_PRODUCT(id),
      // transformResponse: (response) => response.data,
    }),

    getProductBySellerId: builder.query({
      query: (id) => API_URLS.GET_SELLER_PRODUCTS(id),
    }),

    deleteProductById: builder.mutation({
      query: (productId) => ({
        url: API_URLS.DELETE_PRODUCT(productId),
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductBySellerIdQuery,
  useDeleteProductByIdMutation,
} = productApi;
