import { configureStore } from "@reduxjs/toolkit";
import socketApi from "./storeApi";
import { socketReducer } from "./storeSlice";
const store=configureStore({
    reducer:{
        socketData:socketReducer,
        [socketApi.reducerPath]:socketApi.reducer
    },
    middleware:getDefaultMiddleware=>
    getDefaultMiddleware().concat(socketApi.middleware)
})
export default store;