"use client"
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store";
import { useRefreshAccessTokenMutation } from "../features/authApi";
import { logout, updateToken } from "../slice/userSlice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.user.token);
  const [refreshAccessToken] = useRefreshAccessTokenMutation();
  useEffect(() => {
    if (!token) {
      refreshAccessToken(token)
        .unwrap()
        .then((data) => {
          dispatch(updateToken(data.token));
        })
        .catch(() => {
          dispatch(logout());
        });
    }
  }, [dispatch, token, refreshAccessToken]);
  return children;
};

export default AuthProvider;
