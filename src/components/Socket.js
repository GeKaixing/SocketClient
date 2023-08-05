import React, { useEffect, useRef, useState } from 'react'
import socketIO from 'socket.io-client'
import { useNavigate } from 'react-router-dom'
import style from './Socket.module.css'
import axios from 'axios'
// import { useGetSocketUserByIdQuery } from '../store/storeApi'
// import { getName } from '../store/storeSlice'
// import { useDispatch, useSelector } from 'react-redux'
const socket = socketIO.connect('http://localhost:4000', { autoConnect: false })
export default function Socket({ getid, usernames }) {
    // const dispatch = useDispatch()
    // const socketname = useSelector(state => state.socketData)
    // console.log(socketname);
    console.log(socket);
    const [data, setdata] = useState('')
    const [messages, setMessages] = useState([])
    const [username, setname] = useState()
    const [isLoading, setLoading] = useState()
    const [connet, setconnet] = useState(false)
    const ref=useRef(null)
    // const { data: dataname, isSuccess } = useGetSocketUserByIdQuery(socketname._id._id)
    const navigate = useNavigate()
    useEffect(() => {
        setLoading(false)
        axios.get(`http://127.0.0.1:4000/queryone/${getid}`)
            .then(
                (res) => {
                    setname(res.data)
                    setLoading(true)
                }
            )
            .catch((e) => {
                console.log(e);
            })
    }, [getid])

    const connect = function () {
        console.log(socket);
        setconnet(false)
        socket.connect()
    }
    const disconnect = function () {
        console.log(socket);
        setconnet(true)
        socket.disconnect()
        alert('你已断开连接')
    }
    const handlersend = (e) => {
        e.preventDefault()
        if (connet) {
            alert('你已断开连接')
        } else {
            socket.emit('msg', {
                id: socket.id,
                name: username.name,
                message: data
            })
        }
        setdata('')
    }
    /*   const home = function () {
          navigate('/')
      }
      const about = function () {
          navigate('/about')
      }
      const login = function () {
          navigate('/login')
      } */
    const getvalue = function (e) {
        if (connet) { alert('你已断开连接') }
        else {
            setdata(e.target.value)
        }
    }
    console.log(messages);
    useEffect(() => {
        console.log(ref);
        ref.current.scrollTop=ref.current.scrollHeight;
        const getmessages = function (value) {
            setMessages(previous => [...previous, value]);
        }
        socket.on('sendmessage', getmessages);
        return () => {
            socket.off('sendmessage', getmessages);
        }
    }, [messages,ref])
    return (
        <div className={style.socketpage}>
            {/* 聊天界面 */}
            <div className={style.chatborder} ref={ref}>
                {
                    messages.map((item, index) =>
                        username.name === item.name ?
                            <p className={style.one} key={index}>{item.message}:{item.name}<div className={style.handimg}></div></p> :
                            <p className={style.chatmassage} key={index} ><div className={style.handimg}></div>{item.name}:{item.message}</p>
                    )
                }
                {/* 聊天输入框 */}
            </div>
            <div className={style.two}>
                {/* 判断是否连接后显示断开连接按钮 */}
                {/*  <button onClick={home}>
                    主页
                </button>
                <button onClick={about}>
                    关于
                </button>
                <button onClick={login}>
                    登录
                </button> */}
                <button onClick={connect} className={style.link}>
                    连接
                </button>
                <button onClick={disconnect} className={style.closelink}>
                    断开连接
                </button>
                {isLoading ?
                    <div>
                        {usernames || username.name}
                    </div> :
                    null
                }
                <form>
                    <input value={data} onChange={getvalue} className={style.chatinput}>
                    </input>

                </form>
                <button className={style.chatbutton} onClick={handlersend}>
                    发送
                </button>
            </div>
        </div>
    )
}
