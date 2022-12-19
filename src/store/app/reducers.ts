import { PayloadAction } from "@reduxjs/toolkit";

import { IAppState } from "./index";

export const setShowAppDrawer = (state: IAppState, action: PayloadAction<boolean>): void => {
  state.showDrawer = action.payload;
};

export const setIsMobile = (state: IAppState, action: PayloadAction<boolean>): void => {
  state.isMobile = action.payload;
};

export const setIsHiddenOverflow = (state: IAppState, action: PayloadAction<boolean>): void => {
  state.isHiddenOverflow = action.payload;
};

export const setIsLoading = (state: IAppState, action: PayloadAction<boolean>): void => {
  state.loading = action.payload;
};
