import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import TestContext from '../store/TestContext';
import style from './UserReply.module.css'

export default function UserReply() {
    /* 
    把逻辑独立独立出来
    当前页面的尽量在独立出来
    */
    // 获取当前的URL
    const location = useLocation();
    const path = location.pathname;
    const pathstate = path == '/'
    // 显示评论或者回复字段
    const { showcomment, showreply, setshowreplyhandler } = useContext(TestContext)
    return (
        <>
            {showcomment &&
                pathstate &&
                <div className={style.replyimport
                } >
                    <input className={style.reply} placeholder={showreply ? '输入你的回复' : '输入你的评论'} type={'text'}></input>
                    <div className={style.submit} >{showreply ? '回复' : '评论'}</div>
                </div >
            }
            {
                showreply ?
                    <div className={style.replyimport
                    } >
                        <input className={style.reply} placeholder={showreply ? '输入你的回复' : '输入你的评论'} type={'text'}></input>
                        <div className={style.submit} >{showreply ? '回复' : '评论'}</div>
                    </div > : null
            }
        </>

    )
}
