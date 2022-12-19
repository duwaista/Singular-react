import { createSlice } from "@reduxjs/toolkit";

import * as reducers from "./reducers";

export interface IAppState {
  showDrawer: boolean;
  isMobile: boolean;
  isHiddenOverflow: boolean;
  loading: boolean;
}

const initialState: IAppState = {
  showDrawer: false,
  isMobile: false,
  isHiddenOverflow: false,
  loading: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers,
});

export const {
  setShowAppDrawer,
  setIsMobile,
  setIsHiddenOverflow,
} = appSlice.actions;
export default appSlice.reducer;
