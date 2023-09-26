import React, { useState } from 'react'
import style from './UserHomePage.module.css'
import Userarticle from './Userarticle'
import Userlikes from './Userlikes'
import Userfavorite from './Userfavorite'
import { useParams, useNavigate } from 'react-router-dom'
import test from '../test.png'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/slice/loginSlice'
export default function UserHomePage() {
  /* 头像 名字 赞那些文章    *//*         用户的详情页        */

  // 选择组件 用于切换页面使用
  const [seletcpage, setseletcpage] = useState('')
  // redux 派发钩子函数
  const dispatch = useDispatch()
  // redux useSelector 派发钩子函数 用于获取loginReducer切片的默认值
  const { name } = useSelector(state => state.loginReducer)
  // router 钩子函数 用户函数式跳转页面
  const Navigate = useNavigate()


  // 切换组件函数 用switch实现
  const rendercompents = () => {
    switch (seletcpage) {
      case "Userarticle": return <Userarticle></Userarticle>
      case "Userlikes": return <Userlikes></Userlikes>
      case "Userfavorite": return <Userfavorite></Userfavorite>
      default: return <Userarticle></Userarticle>
    }
  }
  // 注销账号的函数
  const closeAnAccountHanlder = () => {
    //loginSlice的logout方法
    dispatch(logout())
    // 重定向 上一个的路由
    Navigate("/", { replace: true })
  }
  return (
    <div className={style.userhomepage}>
      <div className={style.head}>
        <div className={style.headimg}>
          <img src={test} className={style.img}></img>
        </div>
        <p className={style.name}> {name}</p>
        <div  className={style.loginout} onClick={closeAnAccountHanlder}>注销</div>
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
