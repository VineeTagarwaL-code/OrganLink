import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileSlices from "./slices/profileSlices";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileSlices
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;