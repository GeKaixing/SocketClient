import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery,useQueryClient } from 'react-query'
import style from './Commentlist.module.css'
import Reply from './Reply'
import { LikeFilled } from '@ant-design/icons';
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
export default function Commentlist() {
    // 评论列表组件

    // Cannot read properties of undefined (reading 'map')
    // 渲染列表的时候需要给初始值
    // 内嵌只能是数组不能是对象

    // useQuery
    const queryClient=useQueryClient()
    // 获取redux-loginReducer的数据
    const { id: userid, name, loginState } = useSelector(state => state.loginReducer)
    // 获取当前页面的路由的id并求情对应的id文章的评论
    const { id } = useParams()
    // 获取评论
    const [commentdata, setcommentdata] = useState([])
    // 请求文章的所有评论和回复
    const querydata = useQuery('commentlist', async () => {
        const data = await axios.get(`http://127.0.0.1:4000/getallcomment/${id}`)
        return data
    },
        {
            onSuccess: (data) => {
                setcommentdata(data.data)
            }
        },
        {
            onError: (error) => {
                console.log(error);
            }
        }
    )
    const mutation = useMutation((data) => {
        return axios.post(`http://127.0.0.1:4000/updatacommentdelete`, data)
    })
    const deletehandler = (commentId) => {
        mutation.mutate(
            { data: { userid: id ,commentid: commentId} },
            { onSuccess: () => { queryClient.invalidateQueries("commentlist") } }
        )

    }
    return (
        <div>
            {commentdata.map(item =>
                <li key={item._id} className={style.comments} >
                    <span className={style.comment}>
                        <div className={style.name}>
                            <div className={style.handimg}>
                                <img src={`${item.headimg}`} className={style.headimgs}></img>
                            </div>
                            <div>{item.usernames}:</div>
                        </div>
                       
                        {item.comment}

                        {(item.userid == userid) ? item.delete ? null : <button className={style.deletebuttom}  onClick={()=>deletehandler(item._id)}>删除</button> : null}
                    </span>
                    <div className={style.Replyimport}>
                        <div className={style.Reply}>
                            <Reply cid={item._id} commentid={item._id} replycontent={item.replycontent} likes={item.likes} ></Reply>
                        </div>
                    </div>
                </li>
            )}
        </div>
    )

}
