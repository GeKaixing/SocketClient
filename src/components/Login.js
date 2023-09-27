import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import style from './Login.module.css'
import { useLoginMutation } from '../store/api/LoginApi'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../store/slice/loginSlice'
export default function Login() {
    // 设置账号init
    const [valuename, setValuename] = useState('')
    // 设置密码init
    const [valuepassword, setValuepassword] = useState('')
    // 是否显示密码
    const [showpassword, setshowpassword] = useState(false)
    // uselonginMutation Api
    const [loginFN, { isError: longinerror, isSuccess }] = useLoginMutation()

    // 利用该钩子返回上一个路由
    const navigate = useNavigate()
    //通过dispatch()来获取派发器对象
    const dispatch = useDispatch()


    // 获取账号方法
    const get_formname_value = (e) => {
        e.preventDefault()
        setValuename(e.target.value)
    }
    // 获取密码方法
    const get_formpassword_value = (e) => {
        e.preventDefault()
        setValuepassword(e.target.value)
    }
    // 是否显示密码函数
    const showpasswordhandler = () => {
        setshowpassword(() => !showpassword)
    }
    //登录方法
    const sumbit_user_password_demo = () => {
        // 判断账号和密码是否为空
        if (valuename && valuepassword) {
            loginFN({
                name: valuename,
                password: valuepassword
            }).then(res => {
                if (res.data?.loginstate) {
                    // 把状态设置到loginSlice中并且持久化数据
                    dispatch(login({
                        token: res.data.token,
                        name: res.data.name,
                        id: res.data._id
                    }))
                    // 登录成功后把账号和密码设置为空
                    setValuename('');
                    setValuepassword('');
                    // 登录成功后重定向主页
                    navigate(-1, { replace: true })
                } else {
                    alert('密码或账号错误')
                }
            }
            )
                .catch((error) => {
                    console.log(error);
                })
        } else {
            alert('name or password is null')
        }
    }
    return (
        <div className={style.login}>
            {/* 登录页面 */}
            <div className={style.logo}>logo</div>
            <input className={style.name} type={'text'} value={valuename} onChange={get_formname_value} placeholder='名字'>
            </input>
            <div className={style.tip}>
                <input className={style.password} type={showpassword ? 'text' : 'password'} value={valuepassword} onChange={get_formpassword_value} placeholder='密码'></input>
                {/* 显示密码的图标 */}
                {showpassword ?
                    <EyeOutlined className={style.EyeOutlined} onClick={showpasswordhandler} /> :
                    <EyeInvisibleOutlined className={style.EyeInvisibleOutlined} onClick={showpasswordhandler} />
                }
            </div>

            <button className={style.button} onClick={sumbit_user_password_demo}>
                登录
            </button>
            <Link className={style.signup} to={"/signup"}>注册</Link>
        </div>

    )
}