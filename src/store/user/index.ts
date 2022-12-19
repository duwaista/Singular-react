import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

import { fetchLogin, fetchLogout, fetchRegister } from "./asyncThunks";
import type { User } from "./types";

export interface IUserState {
  isLogged: boolean;
  profile: User | null,
}

const initialState: IUserState = {
  isLogged: false,
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      if (!action.payload) return;
      const { email, photoURL, uid } = action.payload;
      state.isLogged = true;
      state.profile = {
        email,
        photoURL,
        uid,
      };
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      if (!action.payload) return;
      const { email, photoURL, uid } = action.payload;
      state.isLogged = true;
      state.profile = {
        email,
        photoURL,
        uid,
      };
    });
    builder.addCase(fetchLogout.fulfilled, (state, action) => {
      state.profile = null;
      state.isLogged = false;
    });
  },
});

export const {
  setUserIsLogged,
  updateUserInfo,
} = userSlice.actions;

export default userSlice.reducer;
