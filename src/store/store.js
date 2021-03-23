import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {firebase} from '../plugins/firebase';
import thunk from 'redux-thunk';
import axios from "axios";

const url = 'https://quiet-ridge-83792.herokuapp.com/api/feed/';


export const fetchFeed = createAsyncThunk('fetchFeed', async () => {
        const response = await axios.get(url);
        return response.data;
    }
)

export const fetchLogin = createAsyncThunk('fetchLogin', async ({email, password}) => {
    const response = await firebase.auth().signInWithEmailAndPassword(email, password);
    return response.user;
});

export const BoolShit = createSlice({
    name: 'boolshit',
    initialState: {
        dark: false,
        drawer: false,
        logged: true,
        isMobile: false,
        inDialog: false,
        upDialog: false,
        bottomMenu: false
    },
    reducers: {
        changeTheme: (state, action) => {
            state.dark = action.payload;
        },
        changeDrawer: (state, action) => {
            state.drawer = action.payload;
        },
        enterChanges: (state, action) => {
            state.logged = action.payload;
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
        email: '',
        password: '',
        photoURL: '',
        uid: '',
    },
    reducers: {},
    extraReducers: {
        [fetchLogin.fulfilled]: (state, actions) => {
            state.email = [...actions.payload.email];
            console.log("thunk", actions.payload);
        }
    }
})

export const Feed = createSlice({
    name: 'feed',
    initialState: {
        all: [],
        bottom: {}
    },
    reducers: {
        getData: (state, action) => {
            state.all = action.payload;
        },
        setBottom: (state, action) => {
            state.bottom = action.payload;
        }
    },
    extraReducers: {
        [fetchFeed.fulfilled]: (state, actions) => {
            state.all = [...actions.payload];
            state.all.reverse();
        }
    },
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
