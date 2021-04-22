import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { firebase } from "../plugins/firebase";
import thunk from "redux-thunk";
import rootSaga from "./sagas";
import axios from "axios";
import { FeedTypes, FLogin, IBoolShitState, IFeedState, IUserState } from "../types";

const sagaMiddleware = createSagaMiddleware();
export const url = "https://quiet-ridge-83792.herokuapp.com/api/feed/";

export const fetchFeed = createAsyncThunk("fetchFeed", async () => {
	try {
		const response = await axios.get(url);
		return await response.data;
	} catch (err) {
		console.log(err);
		return null;
	}
});

export const fetchLogin = createAsyncThunk("fetchLogin", async ({ email, password }: FLogin) => {
	try {
		const response = await firebase.auth().signInWithEmailAndPassword(email, password);
		return response.user;
	} catch (err) {
		console.log(err);
		return null;
	}
});

export const fetchRegister = createAsyncThunk(
	"fetchRegister",
	async ({ email, password }: FLogin) => {
		try {
			const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
			return response.user;
		} catch (e) {
			console.log(e);
			return null;
		}
	}
);

export const BoolShit = createSlice({
	name: "boolshit",
	initialState: {
		dark: false,
		drawer: false,
		isMobile: false,
		inDialog: false,
		upDialog: false,
		bottomMenu: false,
		uploadMenu: false,
		loading: false,
	} as IBoolShitState,
	reducers: {
		changeTheme: (state, action) => {
			state.dark = action.payload;
		},
		changeDrawer: (state, action) => {
			state.drawer = action.payload;
		},
		setMobile: (state, action) => {
			state.isMobile = action.payload;
		},
		changeInDialog: (state, action) => {
			state.inDialog = action.payload;
		},
		changeUpDialog: (state, action) => {
			state.upDialog = action.payload;
		},
		changeBottomMenu: (state, action) => {
			state.bottomMenu = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFeed.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchFeed.fulfilled, (state) => {
				state.loading = false;
			});
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
			.addCase(fetchLogin.fulfilled, (state, action: PayloadAction<any>) => {
				User.caseReducers.authBuilder(state, action);
				state.logged = true;
			})
			.addCase(fetchRegister.fulfilled, (state, action: PayloadAction<any>) => {
				User.caseReducers.authBuilder(state, action);
				state.logged = true;
			});
	},
});

export const Feed = createSlice({
	name: "feed",
	initialState: {
		all: [],
		upload: {},
		currentPost: {},
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
			console.log("ABOBA ADDED");
		},
		deletePost: (state, action) => {
			state.all.splice(action.payload.index, 1);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFeed.fulfilled, (state, action: PayloadAction<FeedTypes[]>) => {
			state.all = [...action.payload];
			state.all.reverse();
		});
	},
});

const reducer = combineReducers({
	boolshit: BoolShit.reducer,
	user: User.reducer,
	feed: Feed.reducer,
});

const store = createStore(reducer, applyMiddleware(thunk, sagaMiddleware));

export default store;

export type AppState = ReturnType<typeof store.getState>;

export const actions = {
	BoolShit: BoolShit.actions,
	User: User.actions,
	Feed: Feed.actions,
};

sagaMiddleware.run(rootSaga);
