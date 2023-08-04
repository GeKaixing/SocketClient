import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import style from './Replycontent.module.css'
export default function Replycontent({ cid, reply }) {
    const [replydata, setreply] = useState([])
     useQuery("replyconent", async () => {
        const data = await axios.get(`http://127.0.0.1:4000/getreplycontents/${cid}`)
        return data
    },
        {
            onSuccess: (data) => {
                console.log(data);
                setreply(data.data)
            }
        },
        {
            onError: (error) => {
                console.log(error);
            }
        }
    )
    console.log('这是回复的内容');
    console.log(replydata);
    // 这是回复的内容
   
    return (
        <div>
            {
                replydata.map((item) => 
                <div key={item._id} className={style.replycontent}>{item.username}名字------{item.reply}</div>)
            }
        </div>
    )
}
