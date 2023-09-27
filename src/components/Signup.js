import React, { useState } from 'react'
import style from './Signup.module.css'
import { useNavigate } from 'react-router-dom'
import { useSignupMutation } from '../store/api/LoginApi'
import { useDispatch } from 'react-redux'
import { login } from '../store/slice/loginSlice'
export default function Signup({ getvalue }) {
  // 获取账号
  const [valuename_signup, setValuename_signup] = useState('')
  // 获取密码
  const [valuepassword_signup, setValuepassword_signup] = useState('')
  // 设置登录状态
  const [signupstate, setsignupstate] = useState(true)
  //注册api
  const [signupFn, { error: singnuperror, isSuccess }] = useSignupMutation()
  // 登录slice
  const dispatch = useDispatch()
  //注册成功跳转到上一个路由
  const navigate = useNavigate()

  //获取账号
  const get_formname_signup_value = (e) => {
    e.preventDefault()
    setValuename_signup(e.target.value)
  }
  // 获取密码
  const get_formpassword_signup_value = (e) => {
    e.preventDefault()
    setValuepassword_signup(e.target.value)
  }
  // 注册方法
  // 注册有问题
  const sumbit_signup_user_password = async () => {
    // 判断账号或者密码是非为空
    if (valuename_signup && valuepassword_signup) {
      // api请求登录
      signupFn({
        name: valuename_signup,
        password: valuepassword_signup
      }).then((res) => {
        /* 判断res.data.signupstate是不是true or false
                  true是登录
                  false判断账号重复
        */
        if (res.data.signupstate) {
          //登录login Slice 
          dispatch(login({
            name: res.data.dataToSave.name,
            token: res.data.dataToSave.token,
            d: res.data.dataToSave._id
          }))
          // 设置登录状态
          setsignupstate(res.data.signupstate)
          // 注册后把密码和账号设置为空
          setValuename_signup('')
          setValuepassword_signup('')
          // 登录成功后重定向首页
          navigate('/', { replace: true })
        } else {
          alert("账号重复")
        }
      })
    } else {
      alert("账号和密码为空")
    }
  }
  return (
    <div className={style.signup}>
      {/* 注册页面 */}
      <div className={style.logo}>logo</div>
      <input className={style.name} type='text' value={valuename_signup} onChange={get_formname_signup_value} placeholder='账号'>
      </input>
      <input type='password' className={style.password} value={valuepassword_signup} onChange={get_formpassword_signup_value} placeholder='密码'>
      </input>
      <button onClick={sumbit_signup_user_password} className={style.button}>
        注册
      </button>
      {signupstate ? null : <div>账号重复</div>}
    </div>
  )
}
