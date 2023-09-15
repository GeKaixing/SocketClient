import React, { useContext, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import style from './Links.module.css'
import { HomeFilled, MessageFilled, PlusSquareFilled, BulbFilled } from '@ant-design/icons';
import Portal from '../homepage/Portal'
import usert_text from '../store/Usert_text'
export default function Links({ getid }) {
  /* useContext 生效*/
  const { getuser } = useContext(usert_text)
  const [isshow, setshow] = useState(true)
  const createtext = () => {
    setshow(!isshow)
  }
  const showback = (e) => {
    e.stopPropagation()
    setshow(!isshow)
  }
/*  const loginData = JSON.parse(localStorage.getItem("longinState")) */
  return (
    <div >
      <div className={style.bar} >
        <div className={style.aside}>
          <div className={style.logo}>logo</div>
          <Link className={style.link} to="/"> <div><HomeFilled />主页</div></Link>
          <Link className={style.link} to="/about"><div><BulbFilled />关于</div></Link>
          <Link className={style.link} to='/socket'><div><MessageFilled />聊天</div></Link>
          <Link className={style.link} to='#' onClick={createtext} ><div><PlusSquareFilled />发贴</div></Link>
          {/*loginData.loginstate*/<Link className={style.link} to="/login">登录</Link>}
          {/*  <Link to='/userhomepage'>我的</Link> */}
        </div>
      </div >
      {createPortal(
          <Portal isshow={isshow} getid={getid} access={showback} ></Portal>,
          document.getElementById('portal'))}
      {/* <div className={style.leftplace}></div> */}
    </div>
  )
}
