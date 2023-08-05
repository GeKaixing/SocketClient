import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { useParams, Link } from 'react-router-dom'
import Comment from './Comment';
import style from './Content.module.css'
import User from '.././components/User'
import { LikeFilled, StarFilled, RocketFilled, MessageFilled } from '@ant-design/icons';
export default function Content({ getid, username }) {
    const [contentdata, setcontent] = useState({})
    const [getcomment, setgetcomment] = useState('')

    const params = useParams()
    const paramsid = params.id
    console.log("登入id" + getid);
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
        <div className={style.commentpage}>
            <div className={style.message}>
                <div className={style.messagebox}>
                    <div className={style.thisshowname}>
                        <Link className={style.handname} >{contentdata.name}</Link>
                    </div>
                    <div className={style.thisshowtheme}>
                        <Link>{contentdata.theme}</Link>
                    </div>
                    <div className={style.thisshowcontent}>
                        {contentdata.content}
                    </div>
                    <div className={style.thisshowbottom}>
                        <div>
                            <Link className={style.whitelike}/* id='like'  onClick={first ? likehandle : offlikehandle} */><LikeFilled />{contentdata.like}</Link>
                        </div>
                        <div className={style.star}>
                            <StarFilled />收藏
                        </div>
                        <div className={style.share}>
                            <RocketFilled />
                            分享
                        </div>
                    </div>
                    <Comment id={params.id} getid={getid} username={username} getcommenthandle={getcommenthandle}></Comment>
                    {/*  <input placeholder='评论'>
                </input> */}
                </div>
            </div>
           
                <User></User>
            
        </div>
    )
}