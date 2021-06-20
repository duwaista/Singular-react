import {
	createAsyncThunk,
	createSlice,
	getDefaultMiddleware,
	configureStore,
	PayloadAction,
} from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { firebase } from "../plugins/firebase";
import logger from "redux-logger";
import rootSaga from "./sagas";
import axios from "axios";
import { FLogin, IBoolShitState, ICurrentPost, IFeedState, ISnack, IUserState } from "../types";

const sagaMiddleware = createSagaMiddleware();
export const url = "https://quiet-ridge-83792.herokuapp.com/api/feed/";

export const fetchFeed = createAsyncThunk("fetchFeed", async () => {
	try {
		const response = await axios.get(url);
		return await response.data;
	} catch (error) {
		console.log(error);
		return null;
	}
});

export const fetchLogin = createAsyncThunk("fetchLogin", async ({ email, password }: FLogin) => {
	try {
		const response = await firebase.auth().signInWithEmailAndPassword(email, password);
		return response.user;
	} catch (error) {
		console.log(error);
		return error;
	}
});

export const fetchRegister = createAsyncThunk(
	"fetchRegister",
	async ({ email, password }: FLogin) => {
		try {
			const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
			return response.user;
		} catch (error) {
			console.log(error);
			return null;
		}
	}
);

export const logoutUserFetch = createAsyncThunk("logoutUserFetch", async () => {
	try {
		await firebase.auth().signOut();
	} catch (error) {
		console.log(error);
	}
});

export const deletePostFetch = createAsyncThunk(
	"deletePostFetch",
	async ({ currentPost }: ICurrentPost) => {
		try {
			await axios.delete(url + currentPost.feed._id);
			return currentPost;
		} catch (error) {
			console.log(error);
		}
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
		all: [],
		upload: {
			type: "",
			file: [],
		},
		picture: "",
		currentPost: {
			index: 0,
			feed: {
				_id: "",
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
			state.all.unshift(action.payload);
		},
		setPicture: (state, action) => {
			state.picture = action.payload;
		},
		setProgress: (state, action) => {
			state.uploadProgress = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFeed.fulfilled, (state, action) => {
				state.all = [...action.payload];
				state.all.reverse();
			})
			.addCase(deletePostFetch.fulfilled, (state, action: PayloadAction<any>) => {
				state.all.splice(action.payload.index, 1);
			});
	},
});

export const SnackBar = createSlice({
	name: "snackBar",
	initialState: {
		toasts: [],
	} as ISnack,
	reducers: {
		add: (state, action) => {
			console.log("TOAST ADDED", action);
			state.toasts = [...action.payload];
		},
		removeOne: (state, action) => {
			state.toasts.splice(action.payload.index, 1);
			console.log("TOAST DELETED", action.payload.index);
		},
		clear: (state) => {
			state.toasts = [];
			console.log("TOAST CLEARED");
		},
	},
});

const reducer = combineReducers({
	boolshit: BoolShit.reducer,
	user: User.reducer,
	feed: Feed.reducer,
	snackBar: SnackBar.reducer,
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
	middleware.push(logger);
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
	SnackBar: SnackBar.actions,
};

sagaMiddleware.run(rootSaga);
