import axios from 'axios'
import React, { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import style from './Replycontent.module.css'
export default function Replycontent({ replycontent, getid }) {
    /*const [replydata, setreply] = useState([])
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
        console.log(replycontent);
        // 这是回复的内容
        */
    console.log(getid);
    console.log(replycontent);

    /*     const deletreplyhandler = (id) => {
            axios.delete(`http://127.0.0.1:4000/deletereply/${id}`)
                .then((response) => {
                    console.log('成功');
                    
                })
                .catch((error) => {
                    console.log(error);
                })
        } */



    const mutation = useMutation((id) => {
        return axios.delete(`http://127.0.0.1:4000/deletereply/${id.id}`)
    })
    const queryClient = useQueryClient()
    const deletreplyhandler = (id) => {
        /*  getid === "" ? alert('请登入') :
             replyvalue === "" ?
                 alert('输入为空') : */
        mutation.mutate(/* {
                    data: {
                        username,
                        userid: getid,
                        cid: cid,
                        reply: replyvalue,
                    }
                }, */
            {
                id
            }, {
            onSuccess: (data) => {
                /*    console.log(data);
                   setresrepluvalue(data)
                   setrepluvalue('')
                   setshow(false)
                   queryClient.invalidateQueries("replyconent") */
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
    return (
        <div>
            {
                replycontent.map((item) =>
                    <div key={item._id} className={style.replycontent}>
                        <div className={style.replycontents}>
                            {item.username}
                            ---------
                            {item.reply}
                        </div>
                        {
                            item.userid == getid ?
                                <button onClick={() => deletreplyhandler(item._id)}>删除</button> : null
                        }
                    </div>)
            }
        </div>
    )
}
