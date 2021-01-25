import { createSlice, configureStore} from '@reduxjs/toolkit'

export const BoolShit = createSlice({
    name: 'boolshit',
    initialState: {
        dark: false,
        drawer: false,
        enterSuccess: false,
        isMobile: false,
        inDialog: false,
        upDialog: false
    },
    reducers: {
        changeTheme: (state, action) => {
            state.dark = action.payload;
        },
        changeDrawer: (state, action) => {
            state.drawer = !state.drawer;
        },
        enterChanges: (state, action) => {
            state.enterSuccess = action.payload;
        },
        setMobile: (state, action) => {
            state.isMobile = [...state.isMobile, action.payload];
        },
        changeInDialog: (state, action) => {
            state.inDialog = [...state.inDialog, action.payload];
        },
        changeUpDialog: (state, action) => {
            state.upDialog = [...state.upDialog, action.payload];
        }
    }
})

const store =configureStore({
    reducer: {
        boolshit: BoolShit.reducer
    }
})

export default store;
export const actions = BoolShit.actions;