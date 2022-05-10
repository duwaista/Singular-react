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
import {
	FLogin,
	IBoolShitState,
	ICurrentPost,
	IFeedState,
	IUserState,
} from "../types";

const sagaMiddleware = createSagaMiddleware();

export const fetchFeed = createAsyncThunk("fetchFeed", async () => {
	const response = await axios.get(`${baseUrl}/feed`);
	return await response.data;
});

export const fetchLogin = createAsyncThunk(
	"fetchLogin",
	async ({ email, password }: any) => {
		const response = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password);
		return response.user;
	}
);

export const fetchRegister = createAsyncThunk(
	"fetchRegister",
	async ({ email, password }: FLogin) => {
		const response = await firebase
			.auth()
			.createUserWithEmailAndPassword(email, password);
		return response.user;
	}
);

export const logoutUserFetch = createAsyncThunk("logoutUserFetch", async () => {
	await firebase.auth().signOut();
});

export const deletePostFetch = createAsyncThunk(
	"deletePostFetch",
	async ({ currentPost }: ICurrentPost) => {
		await axios.delete(`${baseUrl}/feed/${currentPost.feed.id}`);
		return currentPost;
	}
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

export const User = createSlice({
	name: "user",
	initialState: {
		logged: false,
		profile: {
			email: "",
			password: "",
			photoURL: "",
			uid: "",
		},
	} as IUserState,
	reducers: {
		enterChanges: (state, action) => {
			state.logged = action.payload;
		},
		authBuilder: (state, { payload }) => {
			state.profile = {
				email: payload.email,
				password: payload.password,
				photoURL: payload.photoURL,
				uid: payload.uid,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchLogin.fulfilled, (state, action) => {
				User.caseReducers.authBuilder(state, action);
				state.logged = true;
			})
			.addCase(fetchRegister.fulfilled, (state, action) => {
				User.caseReducers.authBuilder(state, action);
				state.logged = true;
			})
			.addCase(logoutUserFetch.fulfilled, (state) => {
				state.profile = {
					email: "",
					password: "",
					photoURL: "",
					uid: "",
				};
				state.logged = false;
			});
	},
});

export const Feed = createSlice({
	name: "feed",
	initialState: {
		posts: [],
		loading: false,
		upload: {
			type: "",
			file: [],
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
			state.uploadProgress = action.payload;
		},
		setLoading: (state, action) => {
			state.loading = action.payload;
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
				if (!action.payload) return
				const posts = [...action.payload];
				// Why..?
				posts.reverse();
				Feed.caseReducers.setPosts(state, { ...action, payload: posts })
				Feed.caseReducers.setLoading(state, { ...action, payload: false });
			})
			.addCase(deletePostFetch.fulfilled, (state, action) => {
				if (action.payload) state.posts.splice(action.payload.index, 1);
			});
	},
});

const reducer = combineReducers({
	boolshit: BoolShit.reducer,
	user: User.reducer,
	feed: Feed.reducer,
});

const devMode = process.env.NODE_ENV === "development";
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
	// middleware.push(logger);
}

const store = configureStore({
	reducer: reducer,
	middleware: middleware,
	devTools: devMode,
});

export default store;

export type AppState = ReturnType<typeof store.getState>;

export const actions = {
	BoolShit: BoolShit.actions,
	User: User.actions,
	Feed: Feed.actions,
};

sagaMiddleware.run(rootSaga);
