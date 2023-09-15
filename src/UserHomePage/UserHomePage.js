import React, { useState } from 'react'
import style from './UserHomePage.module.css'
import Userarticle from './Userarticle'
import Userlikes from './Userlikes'
import Userfavorite from './Userfavorite'
import { useParams, useNavigate } from 'react-router-dom'
import test from '../test.png'
export default function UserHomePage() {

  const [seletcpage, setseletcpage] = useState('')
  // 查询用户信息
  /* 
    头像
    名字
    赞那些文章
       */
  const rendercompents = () => {
    switch (seletcpage) {
      case "Userarticle": return <Userarticle></Userarticle>
      case "Userlikes": return <Userlikes></Userlikes>
      case "Userfavorite": return <Userfavorite></Userfavorite>
      default: return <Userarticle></Userarticle>
    }
  }
  const params = useParams()
  const Navigate = useNavigate()
  const initlonginState = { loginstate: false, }
  const initlonginStateData = JSON.stringify(initlonginState)
  const closeAnAccountHanlder = () => {
    localStorage.setItem('longinState', initlonginStateData)
    Navigate('/')
  }
  return (
    <div className={style.userhomepage}>
      <div className={style.head}>
        <div className={style.headimg}>
          <img src={test} className={style.img}></img>
        </div>
        <p className={style.name}> {localStorage.getItem('username')}</p>
        <div onClick={closeAnAccountHanlder}>注销</div>
      </div>
      <div className={style.userhistory}>
        <div onClick={() => { setseletcpage('Userarticle') }}>文章</div>
        <div onClick={() => { setseletcpage('Userlikes') }}>赞</div>
        <div onClick={() => { setseletcpage('Userfavorite') }}>收藏</div>
      </div>
      {rendercompents()}
    </div>
  )
}
