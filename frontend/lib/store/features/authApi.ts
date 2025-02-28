
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { setToken, setUser } from "../slice/userSlice";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const API_URLS = {
  REGISTER: `${BASE_URL}/user/create`,
  SINGLE_USER: `${BASE_URL}/user/single-user`,
  LOGIN: `${BASE_URL}/auth/login`,
  REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: (token: string) => `${BASE_URL}/auth/reset-password/${token}`,
  VERIFY_EMAIL: (token: string) => `${BASE_URL}/user/verify-email/${token}`,
  LOGOUT: `${BASE_URL}/auth/logout`,
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "application/json");
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data.data));
          dispatch(setToken(result.data.data.accessToken));
        } catch (error) {
          // console.error(error);
        }
      },
    }),
    refreshAccessToken: builder.mutation({
      query: (refreshToken) => ({
        url: API_URLS.REFRESH_TOKEN,
        method: "POST",
        body: { refreshToken },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setToken(result.data));
        } catch (error) {
          // console.error(error);
        }
      },
    }),

    forgotPassword: builder.mutation({
      query: (email) => ({
        url: API_URLS.FORGOT_PASSWORD,
        method: "POST",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation({
      query: ({ token, password }) => ({
        url: API_URLS.RESET_PASSWORD(token),
        method: "POST",
        body: JSON.stringify({ password }),
      }),
    }),
    verifyEmail: builder.mutation({
      query: (token) => ({
        url: API_URLS.VERIFY_EMAIL(token),
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: () => API_URLS.SINGLE_USER,
    }),

    logout: builder.mutation({
      query: () => ({
        url: API_URLS.LOGOUT,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshAccessTokenMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
  useGetSingleUserQuery,
  useVerifyEmailMutation,
} = authApi;
