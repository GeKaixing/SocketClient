import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from './User.module.css'
import { SearchOutlined } from '@ant-design/icons';
import TestContext from '../store/TestContext';
import UserReply from './UserReply';
import test from '../test.png'
import usert_text from '../store/Usert_text';
export default function User() {
    const {getuser}=useContext(usert_text)
    
    const id = localStorage.getItem('userid')
    return (
        <div className={style.user}>{getuser.loginstate?
            <div className={style.userbox}>
                <div className={style.handimg}>
                    <img src={test} className={style.test}></img>
                </div>
                <Link className={style.usernames} to={`/userhomepage/${id}`}>{getuser.name}</Link>
            </div>:null}
            <div className={style.search}>
                <input className={style.searchimport} type='text' placeholder='search more'></input>
                <SearchOutlined className={style.SearchOutlined} style={{ fontSize: '25px', color: '#f6f6f6 ' }} />
            </div>
            <div className={style.recommend}>
                <div>推荐关注</div>
                <div className={style.recommends}>
                    <div> <div className={style.recommendhand}>
                    <img src={test} className={style.test}></img>
                        </div><Link to={`/userhomepage/${id}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div> <div className={style.recommendhand}></div><Link to={`/userhomepage/${id}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div> <div className={style.recommendhand}></div><Link to={`/userhomepage/${id}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div> <div className={style.recommendhand}></div><Link to={`/userhomepage/${id}`} className={style.recommendname}>{localStorage.getItem('username')}</Link><div>关注</div></div>
                    <div>更多...</div>
                </div>
            </div>
          <UserReply></UserReply>
        </div>

    )
}
