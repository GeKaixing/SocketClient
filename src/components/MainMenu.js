import React from 'react'
import { Link } from 'react-router-dom'
import style from './MainMenu.module.css'
import { HomeFilled, MessageFilled, PlusSquareFilled, BulbFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
export default function MainMenu() {
  const data = useSelector(state => state.loginReducer)
  return (
    <div> 
      <div className={style.bar} >
        <div className={style.logo}>logo</div>
        <Link className={style.link} to="/"> <div><HomeFilled />主页</div></Link>
        <Link className={style.link} to="/about"><div><BulbFilled />关于</div></Link>
        <Link className={style.link} to='/socket'><div><MessageFilled />聊天</div></Link>
        <Link className={style.link} to='/post' ><div><PlusSquareFilled />发贴</div></Link>
        {data.loginState ? null : <Link className={style.link} to="/login">登录</Link>}
      </div>
      {/* 脱离文档流，父元素坍塌问题 */}
      <div className={style.leftplace}></div>
    </div>
  )
}
