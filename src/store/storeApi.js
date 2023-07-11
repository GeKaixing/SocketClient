import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
// 引入创建api对象
const socketApi = createApi({
    reducerPath: "socketApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://127.0.0.1:4000/"
    }
    ),//设置url
    // endpoints:翻译为端点 Api
    endpoints(build) {
        // 获取全部
        return {
            // getSocketName: bulid.query({
            //     query: () => {
            //         axios.get("/")
            //     }
            // }
            // ),
            //登录api
            /*  postSocketLogin: build.mutation({
                 query(user){
                     console.log(user.valuename);
                     return {
                         url: 'login',
                         method: 'POST',
                         data:{data:{
                                 nema:'nin',
                                 password:"dddd"
                         }
                         }
                     }
                 }
             }), */
            getSocketUserById:build.query({
                query(id){
                    console.log(id);
                    return{
                        
                        url:`queryone/${id}`,
                        method:"GET",
                    }
                }
            }),
            postSocketLogin: build.mutation({
                query(body) {
                    return {
                        url: `login`,
                        method: 'POST',
                        body,
                    }
                },
            })
        }
    }
})
export const {
    usePostSocketLoginMutation,
    useGetSocketUserByIdQuery
} = socketApi;
export default socketApi;