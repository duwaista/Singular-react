import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from "axios";
const url = 'https://quiet-ridge-83792.herokuapp.com/api/feed/';


export const fetchFeed = createAsyncThunk(
    'fetchFeed',
    async () => {
        const response = await axios.get(url);
        return response.data;
    }

)

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
            state.drawer = !state.drawer;
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
        photoURL: '',
        uid: '',
    },
    reducers: {}
})

export const Feed = createSlice({
    name: 'feed',
    initialState: {
        all: []
    },
    reducers: {
         getData: (state, action) => {
             state.all = action.payload
             console.log(action.payload)
        }
    },
    extraReducers: {
        [fetchFeed.fulfilled]: (state, actions) => {
            state.all= [...actions.payload];
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
