import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import style from './Commentlist.module.css'
import Reply from './Reply'
import { LikeFilled } from '@ant-design/icons';
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
        <div>
            {commentdata.map(item =>
                <li key={item._id} className={style.comments} >
                    <span className={style.comment}>
                        {item.namscontent.map(items =>
                            <div className={style.name} key={items}>
                                <div className={style.handimg}></div>
                                <div>测试：</div>
                            </div>)}
                        这是评论{item.comment}</span>
                    <div className={style.Replyimport}>
                        <div className={style.Reply}><Reply cid={item._id} getid={getid} username={username} replydata={item.replycontent} ></Reply></div>
                    </div>
                  
                </li>
            )}
        </div>
    )

}
