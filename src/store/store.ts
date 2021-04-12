import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {useSelector} from 'react-redux';
import { firebase } from "../plugins/firebase";
import thunk from "redux-thunk";
import axios from "axios";
import { storage } from "../plugins/firebase";
import { FeedTypes, FLogin, IBoolShitState, IFeedState, IPost, IUpload, IUserState } from "../types";

export const url = "https://quiet-ridge-83792.herokuapp.com/api/feed/";
const fileRef = storage.ref();

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

export const uploadFile = createAsyncThunk("uploadFile", async ({ file, type }: IUpload) => {
	try {
		const uploadImage = fileRef.child("images/" + file.name);
		const uploadVideo = fileRef.child("videos/" + file.name);

		if (file && type === "image") {
			await uploadImage
				.put(file)
				.then(async () => {
					const URL = await uploadImage.getDownloadURL();
					return URL;
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (file && type === "video") {
			await uploadVideo
				.put(file)
				.then(async () => {
					const URL = await uploadVideo.getDownloadURL();
					return URL;
				})
				.catch((error) => {
					console.log(error);
				});
		}
	} catch (err) {
		console.log(err);
	}
});

export const mongoAddPost = createAsyncThunk('mongoAddPost', async ({URL, type}: IPost) => {
    let post = {}
    await axios.post(url, post);
})

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
		changeUploadMenu: (state, action) => {
			state.uploadMenu = action.payload;
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
		bottom: {},
	} as IFeedState,
	reducers: {
		getData: (state, action) => {
			state.all = action.payload;
		},
		setBottom: (state, action) => {
			state.bottom = action.payload;
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

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export const actions = {
	BoolShit: BoolShit.actions,
	User: User.actions,
	Feed: Feed.actions,
};
