import React, { useEffect, useState} from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from '../components/Home'
import About from '../components/About'
import Login from '../components/Login'
import Socket from '../components/Socket'
import Protected from './Protected'
import Signup from '../components/Signup'
import Links from './Links'
import Bar from '../homepage/Bar'
import Content from '../content/Content'
import Articledata from '../homepage/Articledata'
import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import UserHomePage from '../UserHomePage/UserHomePage'
import style from "./Routers.module.css"
export default function Routers() {
    const [getuser, setuser] = useState({
        name:'',
        userid:''
    })
    const [getuserid, setuserid] = useState('')
    const [username, setusername] = useState('')
    const { name, userid } = getuser
    useEffect(() => {
        
        setusername(name)
        setuserid(userid)
    }, [name,userid])
    // 利用回调函数获取子组件的值，往下穿，根据id查询数据
    const getloginId = (value) => {
        setuser(value)
    }
    // console.log(getid);
    // 获取当前的url 进行url判断等于根目录就不显示Home组件
    const useridone=localStorage.getItem("userid")
    const { refetch } = useQuery('queryname', async () => {
        const data = await axios.get(`http://127.0.0.1:4000/queryname/${useridone}`)
        return data
    },
        {
            onSuccess: (data) => {
              
                console.log(data);
            }
        },
        {
            onError: (error) => {
                console.log(error);
            }
        }
    )
    const Location = useLocation()
    const url = Location.pathname
    return (
        <>
            <Bar getid={getuserid} username={username}></Bar>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route element={<Protected getid={getuserid} />}>
                    <Route path="/about" element={<About />}></Route>
                    <Route path='/socket' element={<Socket getid={getuserid} usernames={username}/>}></Route>
                    <Route path='/userhomepage/:id' element={<UserHomePage username={username}></UserHomePage>}></Route>
                </Route> 
                <Route path='/login' element={<Login refetch={refetch} getvalue={getloginId} />}></Route>
                <Route path='/signup' element={<Signup getvalue={getloginId} />}></Route>
                <Route path='/homepage/:id' element={<Content getid={getuserid} username={username}></Content>}></Route>
            </Routes>
        </>

    )
}
