/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithErrorHandling = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    // console.error("API Error:", result.error);
  }
  return result;
};
