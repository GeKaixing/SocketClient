import axios from 'axios'
import React, { useState } from 'react'
import { useMutation,useQueryClient } from 'react-query'
import Replycontent from './Replycontent'

export default function Reply({ cid, getid ,username,replydata}) {
    const [show, setshow] = useState(false)
    const [replyvalue, setrepluvalue] = useState('')
    const [resreplyvalue, setresrepluvalue] = useState({})
    const replyhandle = (e) => {
        e.preventDefault()
        setrepluvalue(e.target.value)
    }
    const mutation = useMutation((data) => {
        return axios.post('http://127.0.0.1:4000/postreply', data)
    })
    const queryClient = useQueryClient()
    const submitreply = () => {
        getid===""?alert('请登入'):
        replyvalue===""?
        alert('输入为空'):
        mutation.mutate({
            data:{
            username,
            userid: getid,
            cid: cid,
            reply: replyvalue,
        }}, {
            onSuccess: (data) => {
                console.log(data);
                setresrepluvalue(data)
                setrepluvalue('')
                setshow(false)
                queryClient.invalidateQueries("replyconent")
            }
        }, 
            {
                onError: (error) => {
                    console.log(error);

                }
            })
    }
    return (
        <>
            <Replycontent cid={cid} reply={replydata}></Replycontent>
            <div onClick={() => setshow(!show)}>回复</div>
            {show ? <><input value={replyvalue} onChange={replyhandle}></input>
                <div onClick={submitreply}>发表评论</div></> : null}

        </>
    )
}
