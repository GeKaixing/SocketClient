import React from 'react'
import { Link } from 'react-router-dom'
import Links from '../router/Links'
import Createup from './Portal'
// import './Homepage.css'
export default function Bar({ isshow, getid, username }) {
   const id= localStorage.getItem('userid')
    return (
        <div className='rightbar'>
            <Link to={`/userhomepage/${id}`}>{localStorage.getItem('username')}</Link>
            <Links getid={getid}></Links>
        </div>
    )
}
