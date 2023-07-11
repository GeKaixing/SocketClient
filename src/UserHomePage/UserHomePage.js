import React, { useState } from 'react'
import './UserHomePage.css'
import Userarticle from './Userarticle'
import Userlikes from './Userlikes'
import Userfavorite from './Userfavorite'
import { useParams } from 'react-router-dom'
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
      default :return <Userarticle></Userarticle>
    }
  }
  const params=useParams()
  console.log(params);

  return (
    <div className='userhomepage'>
      这是名字===={'>'}头像
      这是名字===={'>'}{localStorage.getItem('username')}
      <div className='userhistory'>
        <div onClick={() => { setseletcpage('Userarticle') }}>文章</div>
        <div onClick={() => { setseletcpage('Userlikes') }}>赞</div>
        <div onClick={() => { setseletcpage('Userfavorite') }}>收藏</div>
      </div>
      {rendercompents()}
    </div>

  )
}
