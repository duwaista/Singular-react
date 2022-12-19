import { createAsyncThunk } from "@reduxjs/toolkit";

import { firebase } from "../../plugins/firebase";
import { AuthPayloadType } from "./types";

export const fetchLogin = createAsyncThunk(
  "user/fetchLogin",
  async ({ email, password }: AuthPayloadType) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    return response.user;
  },
);

export const fetchRegister = createAsyncThunk(
  "user/fetchRegister",
  async ({ email, password }: AuthPayloadType) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    return response.user;
  },
);

export const fetchLogout = createAsyncThunk(
  "user/fetchLogout",
  async () => {
    await firebase.auth().signOut();
  },
);
