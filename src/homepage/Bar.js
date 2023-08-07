import React from 'react'
import { Link } from 'react-router-dom'
import Links from '../router/Links'
import Createup from './Portal'
import style from './Bar.module.css'
import User from '../components/User'
export default function Bar({ isshow, getid, username }) {
    return (
        <div className={style.bar}>
            <div className={style.links} >
                <Links getid={getid}></Links>
                <div className={style.leftplace}></div>
            </div>
            {/*  <div className={style.users} ><User></User></div> */}
        </div>
    )
}
