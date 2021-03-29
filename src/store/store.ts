import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {firebase} from '../plugins/firebase';
import thunk from 'redux-thunk';
import axios from "axios";
import {FeedTypes, FLogin, IBoolShitState, IFeedState, IUserState} from "../types";

const url = 'https://quiet-ridge-83792.herokuapp.com/api/feed/';

export const fetchFeed = createAsyncThunk('fetchFeed',
    async () => {
        const response = await axios.get(url);
        return await response.data;
    }
)

export const fetchLogin = createAsyncThunk('fetchLogin',
    async ({email, password}: FLogin) => {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);
        return response.user;
    });

export const fetchRegister = createAsyncThunk('fetchRegister',
    async ({email, password}: FLogin) => {
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
        return response.user;
    })

export const BoolShit = createSlice({
    name: 'boolshit',
    initialState: {
        dark: false,
        drawer: false,
        isMobile: false,
        inDialog: false,
        upDialog: false,
        bottomMenu: false
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
        }
    }
})

export const User = createSlice({
    name: 'user',
    initialState: {
        logged: false,
        profile: {
            email: '',
            password: '',
            photoURL: '',
            uid: '',
        }
    } as IUserState,
    reducers: {
        enterChanges: (state, action) => {
            state.logged = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<any>) => {
                state.profile.email = action.payload.email;
                state.profile.photoURL = action.payload.photoURL;
                state.profile.uid = action.payload.uid;
                state.logged = true;
            })
            .addCase(fetchRegister.fulfilled, (state, action: PayloadAction<any>) => {
                state.profile.email = action.payload.email;
                state.profile.photoURL = action.payload.photoURL;
                state.profile.uid = action.payload.uid;
                state.logged = true;
            })
    }
})

export const Feed = createSlice({
    name: 'feed',
    initialState: {
        all: [],
        bottom: {}
    } as IFeedState,
    reducers: {
        getData: (state, action) => {
            state.all = action.payload;
        },
        setBottom: (state, action) => {
            state.bottom = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchFeed.fulfilled, (state, action: PayloadAction<FeedTypes[]>) => {
            state.all = [...action.payload];
            state.all.reverse();
        })
    }
})

const reducer = combineReducers({
    boolshit: BoolShit.reducer,
    user: User.reducer,
    feed: Feed.reducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;

export const actions = {
    BoolShit: BoolShit.actions,
    User: User.actions,
    Feed: Feed.actions
}
