import React, { useContext, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Login from './components/Login';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store';
import Query from './Query';
import './index.css'
import Demoupload from './Demoupload';
// 引入usequery使用文件
import { QueryClientProvider, QueryClient } from 'react-query'
//引入usequery开放工具
import { ReactQueryDevtools } from 'react-query/devtools'
import Demo from './Demo';
import UploadDemo from './UploadDemo';
import Replycontent from './content/Replycontent';
import Test_react_query from './Test_react_query';
const root = ReactDOM.createRoot(document.getElementById('root'));
// 在入口文件配置usequery

//查询/mutation/修改使用react-query 
const queryClient = new QueryClient()
document.documentElement.style.fontSize = 100 / 750 + 'vm';
root.render(
    <Provider store={store}>
        <BrowserRouter>
            {/* 配置usequery */}
            <QueryClientProvider client={queryClient}>
                {/*<Login></Login> */}
                <App></App>
                {/*    <Test_react_query></Test_react_query> */}
                {/*  <UploadDemo></UploadDemo> */}
                {/* <Replycontent></Replycontent> */}
                {/*    <Demo></Demo> */}
                {/* <Query></Query> */}
                {/*  <Demoupload></Demoupload> */}
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </BrowserRouter>
    </Provider>
);
