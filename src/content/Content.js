import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom'
import Comment from './Comment';
export default function Content({getid ,username}) {
    const [contentdata, setcontent] = useState({})
    const [getcomment, setgetcomment] = useState('')
 
    const params = useParams()
    const paramsid = params.id
    console.log("登入id"+getid);
    const getcommenthandle = (value) => {
        setgetcomment(value)
    }
    const querydata = useQuery(`${paramsid}`, async () => {
        const data = await axios.get(`http://127.0.0.1:4000/getonearticle/${paramsid}`)
        return data
    },
        {
            onSuccess: (data) => {
                setcontent(data.data);
            }
        },
        {
            onError: (error) => {
                console.log(error)
            }
        }
    )
console.log(contentdata);
    return (
        <div className='messagebigbox'>
            <div className='messagebox'>
                <div className='thisshowname'>
                    <Link>{contentdata.name}</Link>
                </div>
                <div className='thisshowtheme'>
                    <Link>{contentdata.theme}</Link>
                </div>
                <div className='thisshowcontent'>
                    {contentdata.content}
                </div>
                <div className='thisshowbottom'>
                    <div>
                        <Link>点赞</Link>
                    </div>
                    <div>
                        <Link>评论</Link>
                    </div>
                    <div>
                        收藏
                    </div>
                    <div>
                        分享
                    </div>
                </div>
            </div>
            <Comment id={params.id} getid={getid} username={username} getcommenthandle={getcommenthandle}></Comment>
            {/*  <input placeholder='评论'>
                </input> */}
        </div>
    )
}