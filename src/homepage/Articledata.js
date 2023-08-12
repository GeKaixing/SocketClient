import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import style from './Articledata.module.css'
import { LikeFilled, StarFilled, RocketFilled, MessageFilled } from '@ant-design/icons';
import TestContext from '../store/TestContext'
import test from '../test.png'
export default function Articledata(props) {
    // const aa = comment.map((item) => {
    //     <Link key={item.id}>{item.comment}</Link>
    // })
    const [liked, setlike] = useState(props.like)
    const [first, setfirst] = useState(true)
    const [firststyle, setfirststyle] = useState(false)
    const { setshowcommenthandler } = useContext(TestContext)
    /* 抽出来成为一个组件 
    useEffect(() => {
        const getarticles = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4000/getarticles')
                setarticles(response.data)
            } catch (e) {
                console.log(e);
            }
        }
        getarticles()
    }, []) */
    /* 获取评论
    useEffect(() => {
        const getcomment = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:4000/getcomment')
                setcomment(response.data)
            } catch (e) {
                console.log(e);
            }
        }
        getcomment()
    }, []) */
    const queryClient = useQueryClient()
    const likehandle = (e) => {
        e.stopPropagation()

        setlike((liked) => liked + 1)
        setfirst(false)
        axios.post(
            `http://127.0.0.1:4000/updataarticlelike/${props.id}`,
            { data: { like: liked } })
            .then((data) => {
                console.log(data);
                setfirst(() => false)
                setfirststyle(() => false)
            })
            .catch((e) => {
                console.log(e);
            })
        queryClient.invalidateQueries("articles")
    }
    const offlikehandle = (e) => {
        e.stopPropagation()
        setlike((liked) => liked - 1)
        axios.post(
            `http://127.0.0.1:4000/updataarticlelike/${props.id}`,
            { data: { like: liked } })
            .then((data) => {
                console.log(data);
                setfirst(() => true)
                setfirststyle(() => true)
            })
            .catch((e) => {
                console.log(e);
            })
        queryClient.invalidateQueries("articles")
    }
    const navigate = useNavigate()
    const navgatehandle = (e) => {
        e.stopPropagation()
        navigate(`homepage/${props.id}`);
      };
    return (
        <>
            {
                props.isSuccess &&
                <div className={style.messagebigbox} onClick={navgatehandle}>
                    <div className={style.messagebox}>
                        <div className={style.thisshowname} onClick={e=>e.stopPropagation()}>
                            <div className={style.handimg}>
                            <img src={test} className={style.img}></img>
                            </div>
                            {console.log(props.name)}
                            <Link className={style.handname}>{props.name}</Link>
                        </div>
                        <div className={style.thisshowtheme} onClick={e=>e.stopPropagation()}>
                            <Link>{props.contenttheme}</Link>
                        </div>
                        <div className={style.thisshowcontent}>
                            
                            {props.content}
                            <img src={test} className={style.img}></img>
                        </div>
                        <div className={style.thisshowbottom} >
                            <div>
                                <Link id='like' className={firststyle ? style.redlike : style.whitelike} onClick={first ? likehandle : offlikehandle}><LikeFilled />{props.like}</Link>
                            </div>
                            <div>
                                <Link onClick={setshowcommenthandler} className={style.MessageFilled} ><MessageFilled />评论</Link>
                            </div>
                            <div className={style.star} onClick={e=>e.stopPropagation()}>
                                <StarFilled />收藏
                            </div>
                            <div className={style.share} onClick={e=>e.stopPropagation()}>
                                <RocketFilled />分享
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
