import {configureStore, PayloadAction} from '@reduxjs/toolkit';
import bookRoomReducer from './reducers/bookRoomReducer';
import locationReducer from './reducers/locationReducer';
import roomReducer from './reducers/roomReducer';
import userReducer from './reducers/userReducer';
import productReducer from "./reducers/productReducer"
import userRoleUserReducer from './reducers/userRoleUserReducer';


export const store = configureStore({
    reducer: {
        userReducer: userReducer,
        locationReducer: locationReducer,
        roomReducer: roomReducer,
        bookRoomReducer: bookRoomReducer,
        productReducer: productReducer,
        userRoleUserReducer: userRoleUserReducer
    }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
