import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { useQuery } from 'react-query'
import Commentlist from './Commentlist'
import { useQueryClient } from 'react-query'
import style from'./Comment.module.css'
export default function Comment({ id, getcommenthandle, /* getid */ username }) {
    const getid=localStorage.getItem('userid')
    const [comment, setcomment] = useState('')
    const [commentdata, setcommentdata] = useState({})
    // const [rescomment, setrescomment] = useState({})
    const queryClient = useQueryClient()
    const setcomments = (e) => {
        e.preventDefault()
        setcomment(
            e.target.value.trim()
        )
    }
    useEffect(() => {
        setcommentdata({
            data: {
                username: username,
                userid: `${getid}`,
                articleid: `${id}`,
                comment: `${comment}`,
                likes: 0,
            }
        }
        )
    }, [comment])
    const mutation = useMutation(
        data => {
            return axios.post('http://127.0.0.1:4000/postcomment', data)
        }
    )
    // publish 发表
    console.log(getid === '');
    const publishhandle = () => {
        getid === '' ? alert('还没有登入') :
            comment === '' ?
                alert('不能为空') :
                mutation.mutate(commentdata, {
                    onSuccess: (data) => {
                        // setrescomment(data.data);
                        getcommenthandle(data.data.comment)
                    },
                    onError: (error) => {
                        console.log(error)
                    },
                    onSettled: () => {
                        queryClient.invalidateQueries("commentlist")
                    }

                })
        setcomment('')
    }
    return (
        <>
            <div className={style.comment}>
                <input  className={style.commentimport} value={comment} onChange={setcomments} placeholder='评论'></input>
                <button className={style.commentbutton} onClick={publishhandle}>发表</button>
            </div>
            <Commentlist id={id} getid={getid} username={username}></Commentlist>
        </>

    )
}
