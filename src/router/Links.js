import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

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
      <div className='bar'>
        <Link to="/">主页</Link>
        <Link to="/about">关于</Link>
        <Link to="/login">登录</Link>
        <Link to='/socket'>聊天</Link>
        <Link to='#' onClick={createtext} >发贴</Link>
        <Link to='/userhomepage'>我的</Link>
        
      </div>
      {
        createPortal(
          <Portal isshow={isshow} getid={getid} access={showback}></Portal>,
          document.getElementById('portal'))
      }
    </>
  )
}
