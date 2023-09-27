import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slice/loginSlice";
import { replyReducer } from "./slice/replySlice";
import LoginApi from "./api/LoginApi";
const store = configureStore({
    reducer: {
        loginReducer,
        replyReducer,
        [LoginApi.reducerPath]: LoginApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(LoginApi.middleware)
})
export default store;