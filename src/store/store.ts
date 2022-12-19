import {
  createAsyncThunk,
  createSlice,
  getDefaultMiddleware,
  configureStore,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import axios from "axios";
import logger from "redux-logger";

import rootSaga from "./sagas";
import { firebase } from "../plugins/firebase";
import { baseUrl } from "../api";
import appReducer from "./app";
import userReducer from "./user";
import {
  IBoolShitState,
  ICurrentPost,
  IFeedState,
} from "../types";

const devMode = process.env.NODE_ENV === "development";
const sagaMiddleware = createSagaMiddleware();

export const fetchFeed = createAsyncThunk("fetchFeed", async () => {
  const response = await axios.get(`${baseUrl}/feed`);
  return response.data;
});

export const logoutUserFetch = createAsyncThunk("logoutUserFetch", async () => {
  await firebase.auth().signOut();
});

export const deletePostFetch = createAsyncThunk(
  "deletePostFetch",
  async ({ currentPost }: ICurrentPost) => {
    await axios.delete(`${baseUrl}/feed/${currentPost.feed.id}`);
    return currentPost;
  },
);

export const BoolShit = createSlice({
  name: "boolshit",
  initialState: {
    dark: false,
    drawer: false,
    isMobile: false,
    bottomMenu: false,
    uploadMenu: false,
    loading: false,
    fullScreenDialog: false,
  } as IBoolShitState,
  reducers: {
    changeTheme: (state, action) => {
      state.dark = action.payload;
    },
    changeDrawer: (state, action) => {
      state.drawer = action.payload;
      if (action.payload) {
        document.body.style.overflow = "hidden";
        if (!state.isMobile) {
          document.body.style.marginRight = "17px";
        } else {
          document.body.style.marginRight = "0";
        }
      } else {
        document.body.style.overflow = "auto";
        document.body.style.marginRight = "0";
      }
    },
    setMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    changeBottomMenu: (state, action) => {
      state.bottomMenu = action.payload;
      if (action.payload) {
        document.body.style.overflow = "hidden";
        if (!state.isMobile) {
          document.body.style.marginRight = "17px";
        } else {
          document.body.style.marginRight = "0";
        }
      } else {
        document.body.style.overflow = "auto";
        document.body.style.marginRight = "0";
      }
    },
    changeLoading: (state, action) => {
      state.loading = action.payload;
    },
    changeFullScreenDialog: (state, action) => {
      state.fullScreenDialog = action.payload;
      if (action.payload) {
        document.body.style.overflow = "hidden";
        if (!state.isMobile) {
          document.body.style.marginRight = "17px";
        } else {
          document.body.style.marginRight = "0";
        }
      } else {
        document.body.style.overflow = "auto";
        document.body.style.marginRight = "0";
      }
    },
  },
});

export const Feed = createSlice({
  name: "feed",
  initialState: {
    posts: [],
    loading: false,
    upload: {
      type: "",
      file: undefined,
    },
    picture: "",
    currentPost: {
      index: 0,
      feed: {
        id: "",
        email: "",
        uid: "",
        posts: "",
        type: "",
        createdAt: "",
      },
    },
    uploadProgress: {
      progress: 0,
      uploading: false,
      done: false,
    },
  } as IFeedState,
  reducers: {
    setBottom: (state, action) => {
      state.currentPost = action.payload;
    },
    setUpload: (state, action) => {
      state.upload = {
        type: action.payload.type,
        file: action.payload.file,
      };
    },
    setPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setPicture: (state, action) => {
      state.picture = action.payload;
    },
    setProgress: (state, action) => {
      state.uploadProgress = {
        ...state.uploadProgress,
        ...action.payload,
      };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    cleanFileToUpload: (state, action) => {
      state.upload = {
        type: "",
        file: undefined,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state, action) => {
        Feed.caseReducers.setLoading(state, { ...action, payload: true });
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        // Reject? Nope
        Feed.caseReducers.setLoading(state, { ...action, payload: false });
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        if (!action.payload) return;
        const posts = [...action.payload];
        Feed.caseReducers.setPosts(state, { ...action, payload: posts });
        Feed.caseReducers.setLoading(state, { ...action, payload: false });
      })
      .addCase(deletePostFetch.fulfilled, (state, action) => {
        if (action.payload) state.posts.splice(action.payload.index, 1);
      });
  },
});

const reducer = combineReducers({
  boolshit: BoolShit.reducer,
  user: userReducer,
  feed: Feed.reducer,
  app: appReducer,
});

const middleware = [
  ...getDefaultMiddleware({
    thunk: true,
    serializableCheck: {
      ignoredActions: ["user/authBuilder", "feed/setUpload"],
    },
    immutableCheck: {
      ignoredPaths: ["feed.upload"],
    },
  }),
  sagaMiddleware,
];

if (devMode) {
  middleware.push(logger);
}

const store = configureStore({
  reducer,
  middleware,
  devTools: devMode,
});

export default store;

export type AppState = ReturnType<typeof store.getState>;

export const actions = {
  BoolShit: BoolShit.actions,
  // User: User.actions,
  Feed: Feed.actions,
};

sagaMiddleware.run(rootSaga);
