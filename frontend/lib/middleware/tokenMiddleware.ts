import { Middleware } from "@reduxjs/toolkit";
import { useRefreshAccessTokenMutation } from "../store/features/authApi";
import { logout, updateToken } from "../store/slice/userSlice";

const tokenMiddleware: Middleware = (storeAPI) => (next) => async (action) => {
  if (action.type === "user/checkTokenExpiry") {
    const state = storeAPI.getState();
    const refreshToken = state.user.token;

    if (!refreshToken) {
      storeAPI.dispatch(logout());
      return;
    }

    // ✅ Extract the mutation function correctly
    const [refreshAccessToken] = useRefreshAccessTokenMutation();

    try {
      const response = await refreshAccessToken({ refreshToken }).unwrap();
      storeAPI.dispatch(updateToken(response.accessToken));
    } catch (error) {
      storeAPI.dispatch(logout());
    }
  }

  return next(action);
};

export default tokenMiddleware;
