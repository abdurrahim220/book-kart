import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserState = {
  user: User | null;
  isEmailVerified: boolean;
  isLoginDialogOpen: boolean;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  user: null,
  isEmailVerified: false,
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
    setEmailVerified: (state, action: PayloadAction<boolean>) => {
      state.isEmailVerified = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isEmailVerified = false;
    },
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },
    authState: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const {
  setUser,
  setEmailVerified,
  logout,
  toggleLoginDialog,
  authState,
} = userSlice.actions;


export default userSlice.reducer;