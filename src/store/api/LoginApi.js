import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
// 引入创建api对象
const LoginApi = createApi({
    reducerPath: "LoginApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:4000/',
        //设置url
        prepareHeaders: (headers, { getState }) => {
            const token = getState().loginReducer.token
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        }
    }),
    // endpoints:翻译为端点 Api
    endpoints(build) {
        return {
            login: build.mutation({
                query(data) {
                    return {
                        url: 'login',
                        method: 'post',
                        body: {
                            data
                        }
                    }
                }
            }),
            signup: build.mutation({
                query(data) {
                    return {
                        url: 'signup',
                        method: 'post',
                        body: {
                            data
                        }
                    }
                }
            }),
        }
    }
})
export const {
    useLoginMutation,
    useSignupMutation
} = LoginApi;
export default LoginApi;