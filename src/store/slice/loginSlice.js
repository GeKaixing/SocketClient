import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
    name: 'login',
    initialState: () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return {
                loginState: false,
                token: 'test',
                name: null,
            }
        }
        return {
            loginState: true,
            token: token,
            name: localStorage.getItem('name'),
        }
    },
    reducers: {
        login(state, action) {
           
            state.loginState = true;
            state.token = action.payload.token;
            state.name = action.payload.name;
            // 存在本地储存
            localStorage.setItem('token', state.token)
            localStorage.setItem('name', state.name)
        },
        logout(state, action) {
            state.loginState = false
            state.token = ''
            // 移除本地储存
            localStorage.removeItem('token')
            localStorage.removeItem('name')
        }
    }
})

export const { login, logout } = loginSlice.actions;
export const { reducer: loginReducer } = loginSlice