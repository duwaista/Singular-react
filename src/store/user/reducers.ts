import { PayloadAction } from "@reduxjs/toolkit";

import { IUserState } from "./index";
import type { User } from "./types";

export const setUserIsLogged = (state: IUserState, action: PayloadAction<boolean>): void => {
  state.isLogged = action.payload;
};

// Nooo u can't use any... Idc
export const updateUserInfo = (
  state: IUserState,
  action: PayloadAction<any>,
): void => {
  state.profile = {
    ...state.profile,
    ...action.payload,
  };
};
