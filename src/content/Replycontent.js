import axios from 'axios'
import React from 'react'
import { useQueryClient, useMutation } from 'react-query'
import style from './Replycontent.module.css'
export default function Replycontent({ replycontent, id }) {
    const queryClient = useQueryClient()
    // 删除用户回复的评论的函数 传入用户的id
    const mutation = useMutation(() => {
        return axios.delete(`http://127.0.0.1:4000/deletereply/${id}`)
    })
    // 处理删除回复评论的函数
    const deletreplyhandler = (id) => {
        mutation.mutate
            (   { id },
                { onSuccess: () => { queryClient.invalidateQueries("commentlist") } },
                { onError: (error) => { console.log(error); } },
            )
    }
    return (
        <div>
            {
                replycontent.map((item) =>
                    <div key={item._id} className={style.replycontent}>
                        <div className={style.replycontents}>
                            {item.username}
                            -------------
                            {item.reply}
                        </div>
                        {
                            item.userid === id ?
                                <button onClick={() => deletreplyhandler(item._id)}>删除</button> : null
                        }
                    </div>)
            }
        </div>
    )
}
