import axios from 'axios'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import Commentlist from './Commentlist'
import { useQueryClient } from 'react-query'
import style from './Comment.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
export default function Comment() {
    // 获取redux-loginReducer的数据
    const { id: getid, name, loginState } = useSelector(state => state.loginReducer)
    const queryClient = useQueryClient()
    // 获取页面路由
    const { id } = useParams()
    // 获取输入框数据
    const [comment, setcomment] = useState('')


    //获取输入框的数据
    const setcomments = (e) => {
        e.preventDefault()
        setcomment(e.target.value.trim())
    }
    // react-query useMutation post
    const mutation = useMutation(data => { return axios.post('http://127.0.0.1:4000/postcomment', data) })
    // 发表评论
    const publishhandle = () => {
        !loginState ? alert('还没有登入') :
            comment === '' ?
                alert('不能为空') :
                mutation.mutate({
                    data: {
                        username: name,
                        userid: `${getid}`,
                        articleid: `${id}`,
                        comment: `${comment}`,
                        likes: 0,
                    }
                }, {
                    onError: (error) => {
                        console.log(error)
                    },
                    onSettled: () => {
                        // 重新请求
                        queryClient.invalidateQueries("commentlist")
                        // 输入框数据设置空
                        setcomment('')
                    }

                })}
                
    return (
        <>
            <div className={style.comment}>
                <input className={style.commentimport} value={comment} onChange={setcomments} placeholder='评论'></input>
                <button className={style.commentbutton} onClick={publishhandle}>发表</button>
            </div>
            <Commentlist></Commentlist>
        </>

    )
}
