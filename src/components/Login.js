import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import style from './Login.module.css'
import { useMutation } from 'react-query'
import { useQuery, useQueryClient } from 'react-query'
// import { usePostSocketLoginMutation } from '../store/storeApi'
// import { getName } from '../store/storeSlice'
// import { useDispatch, useSelector } from 'react-redux'
export default function Login({ getvalue, refetch }) {
    const [valuename, setValuename] = useState('')
    const [valuepassword, setValuepassword] = useState('')
    const [responsedata, setresponsedata] = useState(true)
    const [isLoading, setLoading] = useState()
    const [id, setid] = useState('')
    const [showpassword,setshowpassword]=useState(false)
    const showpasswordhandler=()=>{
        setshowpassword(()=>!showpassword)
    }
    // const [AddSoketUser, { data:newdata, isSuccess }] = usePostSocketLoginMutation()
    // const dispatch = useDispatch();
    // dispatch(getName(valuename))    
    // const socketData = useSelector(state=>state.socketData) 
    const get_formname_value = (e) => {
        e.preventDefault()
        setValuename(e.target.value)
    }
    const get_formpassword_value = (e) => {
        e.preventDefault()
        setValuepassword(e.target.value)
    }
    let navigate = useNavigate()
    // axios编写
    const sumbit_user_password = async function () {
        try {
            setLoading(false)
            const response = await axios.post('http://127.0.0.1:4000/login', {
                data: {
                    name: valuename,
                    password: valuepassword
                }
            })
            console.log(response);
            console.log("登录请求");
            setresponsedata(response.data.loginstate)
            getvalue(response.data._id)
            setLoading(true)
            setValuename('')
            setValuepassword('')
            // 回退没有写
        }
        catch (error) {
            console.log(error);
        }
    }
    /* const demo = () => {
        AddSoketUser({
           
                name: valuename,
                password: valuepassword
            
        }).unwrap()
            .then((newdata) => {
                dispatch(getName(newdata))  
                console.log(newdata);
                // setChatId(data._id)
                // localStorage.setItem("token", `${data.token}`)
                // localStorage.setItem("id", `${data._id}`)
                // localStorage.setItem("username", `${data.name}`)
                setValuepassword('')
                setValuename('')
            })
            .catch(function (error) {
                console.log(error);
            });
        // 回退
        navigate(-1)
    } */
    /* console.log(responsedata); */
    // true表示的登陆成功
    // false表示登录失败，提示账号密码是否错误或提示是否注册
    // use query编写 
    const queryClient = useQueryClient()

    const mutation = useMutation(data => {
        return axios.post('http://127.0.0.1:4000/login', data)
    })
    const sumbit_user_password_demo = () => {
        mutation.mutate({
            data: {
                name: valuename,
                password: valuepassword
            }
        }, {
            onSuccess: (data) => {
                console.log(data);
                console.log("登录请求");
                setresponsedata(data.data.loginstate)
                localStorage.setItem("userid", `${data.data._id}`)
                console.log(data.name);
                localStorage.setItem("username", `${data.data.name}`)
                setid(data.data._id)
                getvalue({
                    name: data.data.name,
                    userid: data.data._id
                })
                setLoading(true)
                setValuename('')
                setValuepassword('')
                refetch()
                queryClient.setQueryData('queryname', prev => [...prev, data])
            },
            onError: (error) => { console.log(error); }
        })

    }
    // 查询账号

    return (
        <div className={style.login}>
            {/* 登录页面 */}
            <div className={style.logo}>logo</div>
            <input className={style.name} type={'text'} value={valuename} onChange={get_formname_value} placeholder='名字'>
            </input>
            <div className={style.tip}>
                <input className={style.password} type={showpassword?'text':'password'} value={valuepassword} onChange={get_formpassword_value} placeholder='密码'></input>
                {  showpassword?
                     <EyeOutlined className={style.EyeOutlined} onClick={showpasswordhandler}/>:
                     <EyeInvisibleOutlined className={style.EyeInvisibleOutlined} onClick={showpasswordhandler}/>
                }

            </div>

            {responsedata ? null : <div>登录失败,账号或密码错误</div>}
            <button className={style.button} onClick={sumbit_user_password_demo}>
                登录
            </button>
            <Link className={style.signup} to={"/signup"}>注册</Link>
        </div>

    )
}
