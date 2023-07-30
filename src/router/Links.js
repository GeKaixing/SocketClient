import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import style from './Links.module.css'
import { HomeFilled, MessageFilled, PlusSquareFilled, BulbFilled } from '@ant-design/icons';
import Portal from '../homepage/Portal'
export default function Links({ getid }) {
  const [isshow, setshow] = useState(false)
  const createtext = () => {
    setshow(!isshow)
  }
  const showback = (e) => {
    e.stopPropagation()
    setshow(!isshow)
  }
  return (
    <>
      <div className={style.bar}>
        <div className={style.aside}>
        <div className={style.logo}>logo</div>
        <Link className={style.link} to="/"> <div><HomeFilled />主页</div></Link>
        <Link className={style.link} to="/about"><div><BulbFilled />关于</div></Link>
        <Link className={style.link} to='/socket'><div><MessageFilled />聊天</div></Link>
        <Link className={style.link} to='#' onClick={createtext} ><div><PlusSquareFilled />发贴</div></Link>
        <Link className={style.link} to="/login">登录</Link>
        {/*  <Link to='/userhomepage'>我的</Link> */}
        </div>
      </div >
      
      {
        createPortal(
          <Portal isshow={isshow} getid={getid} access={showback} ></Portal>,
          document.getElementById('portal'))
      }
    </>
  )
}
