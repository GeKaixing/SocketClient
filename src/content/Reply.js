import axios from 'axios'
import React, { useState, useContext } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import Replycontent from './Replycontent'
import TestContext from '../store/TestContext'
import style from './Reply.module.css'
import { LikeFilled } from '@ant-design/icons'
export default function Reply({ cid, getid, username, replycontent }) {
    console.log(replycontent);
    const replylength = replycontent.length
    const { setshowreplyhandler, setshowcommenthandler } = useContext(TestContext)
    const [show, setshow] = useState(false)
    const [replyvalue, setrepluvalue] = useState('')
    const [resreplyvalue, setresrepluvalue] = useState({})
    // 控制回复预览的显示
    const [replyshow, isreplyshow] = useState(false)
    const replyhandle = (e) => {
        e.preventDefault()
        setrepluvalue(e.target.value)
    }
    const mutation = useMutation((data) => {
        return axios.post('http://127.0.0.1:4000/postreply', data)
    })
    const queryClient = useQueryClient()
    const submitreply = () => {
        getid === "" ? alert('请登入') :
            replyvalue === "" ?
                alert('输入为空') :
                mutation.mutate({
                    data: {
                        username,
                        userid: getid,
                        cid: cid,
                        reply: replyvalue,
                    }
                }, {
                    onSuccess: (data) => {
                        console.log(data);
                        setresrepluvalue(data)
                        setrepluvalue('')
                        setshow(false)
                        queryClient.invalidateQueries("replyconent")
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
const ishowheadimghandler=()=>{
    isreplyshow(!replyshow) 
    setshow(false)
}
    return (
        <>
            <div className={style.reply}>
                <div className={style.like}><LikeFilled />赞</div>
                <div onClick={() => setshow(!show)}>回复</div>
                <div className={style.replynumbe} onClick={ishowheadimghandler }>{`${replylength}`}条回复↓</div>
            </div>
            {/* 这是回复 */}
            {replyshow ?
                <div>
                    <Replycontent cid={cid} replycontent={replycontent} getid={getid} ></Replycontent>
                </div>
                : null}
            {show ? <div className={style.replyimport}>
                <input value={replyvalue} onChange={replyhandle}></input>
                <div onClick={submitreply} className={style.submitreply}>回复</div>
            </div> : null}
        </>
    )
}
