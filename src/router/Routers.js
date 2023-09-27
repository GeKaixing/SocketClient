import React, { useEffect, useState, useContext, useRef } from 'react'
import { Routes, Route, Link, useLocation, json } from 'react-router-dom'
import Home from '../components/Home'
import About from '../components/About'
import Login from '../components/Login'
import Socket from '../components/Socket'
import Protected from './Protected'
import Signup from '../components/Signup'
import Content from '../content/Content'
import Articledata from '../homepage/Articledata'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import UserHomePage from '../UserHomePage/UserHomePage'
import style from "./Routers.module.css"
import User from '../components/User'
import Portal from '../homepage/Portal'
import MainMenu from '../components/MainMenu'
export default function Routers() {
    // 获取当前的url 进行url判断等于根目录就不显示Home组件
    const useridone = localStorage.getItem("userid")
    const Location = useLocation()
    const url = Location.pathname
    const queryClient = useQueryClient()
    const loginData = JSON.parse(localStorage.getItem("longinState"))
    const { data, isError, isLoading } = useQuery('loginData',
        () => axios.get(`http://127.0.0.1:4000/userstate/${loginData._id}`)
        ,
        {
            enabled: Boolean(false),
        },
        {
            onError: (error) => {
                console.log(error);
            }
        },
    )
    return (
        <div className={style.layout}>
            <MainMenu></MainMenu>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route element={<Protected />}>
                    <Route path="/about" element={<About />}></Route>
                    <Route path='/socket' element={<Socket />}></Route>
                    <Route path='/userhomepage/:id' element={<UserHomePage></UserHomePage>}></Route>
                    <Route path='/post' element={<Portal></Portal>}></Route>
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/signup' element={<Signup />}></Route>
                <Route path='/homepage/:id' element={<Content ></Content>}></Route>
            </Routes>
            <User></User>
        </div>

    )
}
