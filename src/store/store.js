import { createSlice} from '@reduxjs/toolkit';
import {createStore, combineReducers} from 'redux';

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
        uid: ''
    },
    reducers: {

    }
})

const reducer = combineReducers({
    boolshit: BoolShit.reducer,
    user: User.reducer
})

const store = createStore(reducer)

export default store;
export const actions = BoolShit.actions;
