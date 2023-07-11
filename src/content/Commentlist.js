import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import './Comment.css'
import Reply from './Reply'
export default function Commentlist({ id, getid, username }) {
    // Cannot read properties of undefined (reading 'map')
    // 渲染列表的时候需要给初始值
    // 内嵌只能是数组不能是对象
    const [commentdata, setcommentdata] = useState([])
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
    console.log(commentdata);
    return (
        <div >
            {commentdata.map(item =>
                <li key={item._id} className='comment' >
                    <span>
                        {item.namscontent.map(items =>
                            <div key={items}>
                                这是名字:
                            </div>
                        )}
                    </span>
                    <span>这是评论{item.comment}</span>
                    <div>赞</div>
                    <Reply cid={item._id} getid={getid} username={username} replydata={item.replycontent} ></Reply>
                </li>
            )}

        </div>
    )

}
