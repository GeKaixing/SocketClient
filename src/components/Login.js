import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './Socket.css'
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
    console.log(responsedata);
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
                localStorage.setItem("userid",`${data.data._id}`)
                console.log(data.name);
                localStorage.setItem("username",`${data.data.name}`)
                setid(data.data._id)
                getvalue({
                    name: data.data.name,
                    userid: data.data._id
                })
                setLoading(true)
                setValuename('')
                setValuepassword('')
                refetch()
                  

            },
            onError: (error) => { console.log(error); }
        })

    }
    // 查询账号
  
    return (
        <div className='login'>
            {/* 登录页面 */}
            <input type={'text'} value={valuename} onChange={get_formname_value}>
            </input>
            <input type='password' value={valuepassword} onChange={get_formpassword_value}>
            </input>
            {responsedata ? null : <div>登录失败,账号或密码错误</div>}
            <button onClick={sumbit_user_password_demo}>
                登录
            </button>
            <Link to={"/signup"}>注册</Link>
        </div>

    )
}
