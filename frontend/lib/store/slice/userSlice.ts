import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type User = {
  id: string;
  role: string;
  email: string;
};

export type UserState = {
  user: User | null;
  token: null | string;
  isLoginDialogOpen: boolean;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  user: null,
  token: null,
  isLoginDialogOpen: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
    },
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },
    authState: (state) => {
      state.isLoggedIn = true;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  toggleLoginDialog,
  authState,
  setToken,
  updateToken,
} = userSlice.actions;

export default userSlice.reducer;

export const useCurrentToken = (state: RootState) => state.user.token;
export const selectCurrentUser = (state: RootState) => state.user.user;
