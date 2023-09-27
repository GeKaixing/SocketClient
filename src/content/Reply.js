import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Replycontent from './Replycontent'
import TestContext from '../store/TestContext'
import style from './Reply.module.css'
import { LikeFilled } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
export default function Reply({ cid, replycontent, likes, commentid }) {
    /*        回复评论组件        */
    // 获取redux-loginReducer的数据
    const { id, name, loginState } = useSelector(state => state.loginReducer)
    // useQueryClient
    const queryClient = useQueryClient()
    // 获取路由
    const navigate = useNavigate()
    // 显示回复的数据的长度用于显示有多少回复
    const replylength = replycontent.length
    const { setshowreplyhandler, setshowcommenthandler } = useContext(TestContext)
    // 设置是否显示回复输入框
    const [show, setshow] = useState(false)
    // 获取输入框的数据
    const [replyvalue, setrepluvalue] = useState('')
    // 控制回复预览的显示
    const [replyshow, isreplyshow] = useState(false)


    // 获取输入框的函数
    const replyhandle = (e) => {
        e.preventDefault()
        setrepluvalue(e.target.value)
    }
    // useQery的变异方法
    const mutation = useMutation((data) => {
        return axios.post('http://127.0.0.1:4000/postreply', data)
    })
    // 发送回复数据函数
    const submitreply = () => {
        !loginState ? alert('请登入') :
            replyvalue === "" ?
                alert('输入为空') :
                mutation.mutate({
                    data: {
                        name,
                        userid: id,
                        cid: cid,
                        reply: replyvalue,
                    }
                }, {
                    onSuccess: (data) => {
                        console.log(data);
                        // 成功后为空
                        setrepluvalue('')
                        // 隐藏输入框
                        setshow(false)
                        // 重新请求replyconent and commentlist
                        queryClient.invalidateQueries("replyconent")
                        queryClient.invalidateQueries("commentlist")
                    }
                },
                    {
                        onError: (error) => {
                            console.log(error);
                        }
                    }
                )
    }
    // 是否显示回复框的函数
    const ishowheadimghandler = () => {
        isreplyshow(!replyshow)
        setshow(false)
    }
    // 评论点赞按钮
    const likemutation = useMutation((data) => {
        return axios.post(`http://127.0.0.1:4000/updatacommentlike/${commentid}`, data)
    })
    const likehandle = () => {
        likemutation.mutate({ data: { userid: id } }, 
        { onSuccess: () => { queryClient.invalidateQueries("commentlist") } })
    }
    return (
        <>
            <div className={style.reply}>
                <div className={style.like} onClick={likehandle}><LikeFilled />{likes}</div>
                <div onClick={() => setshow(!show)}>回复</div>
                <div className={style.replynumbe} onClick={ishowheadimghandler}>{`${replylength}`}条回复↓</div>
            </div>
            {/* 这是回复 */}
            {replyshow ?
                <div>
                    <Replycontent cid={cid} replycontent={replycontent} id={id} ></Replycontent>
                </div>
                : null}
            {/* 
            show 判断是否显示
            loginState 判断是否登录
            */}
            {show ? (
                loginState ?
                    <div className={style.replyimport}>
                        <input value={replyvalue} onChange={replyhandle}></input>
                        <div onClick={submitreply} className={style.submitreply}>回复</div>
                    </div> : <div className={style.replybutton} onClick={() => navigate('/login')}>未登录,是否点击登录</div>) : null}
        </>
    )
}
