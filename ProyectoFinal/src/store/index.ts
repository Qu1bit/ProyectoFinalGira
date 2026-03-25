import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from './slices/taskSlice';
import userReducer from  './slices/userSlice';


export const store = configureStore({
    reducer:{
        tasks: tasksReducer,
        users: userReducer,
    },


})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;