import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
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
    console.log(replydata);
    const replycontent = replydata.map((item) => <div key={item._id}>这是名字{item.username}------{item.reply}</div>)
    return (
        <div>
            {
                replycontent
            }
        </div>
    )
}
