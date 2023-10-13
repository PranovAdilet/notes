import {configureStore, combineReducers} from "@reduxjs/toolkit";
import notesSlice from "../reducers/notes/notes"


const rootReducer = combineReducers({
    notesSlice: notesSlice
})

const store = configureStore({
    reducer: rootReducer
})

export type RootReducer = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store