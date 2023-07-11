import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link ,Routes, Route} from 'react-router-dom'
import { useQueryClient } from 'react-query'
import './Homepage.css'
export default function Articledata(props) {
    // const aa = comment.map((item) => {
    //     <Link key={item.id}>{item.comment}</Link>
    // })
    const [liked, setlike] = useState(props.like)
    const [first, setfirst] = useState(true)
    const [firststyle, setfirststyle] = useState(false)
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
    const likehandle = () => {
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
    const offlikehandle = () => {
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
    return (
        <>
            {
                props.isSuccess &&
                <div className='messagebigbox'>
                    <div className='messagebox'>
                        <div className='thisshowname'>
                            <Link>{props.name}</Link>
                        </div>
                        <div className='thisshowtheme'>
                            <Link>{props.contenttheme}</Link>
                        </div>
                        <div className='thisshowcontent'>
                            {props.content}
                        </div>
                        <div className='thisshowbottom'>
                            <div>
                                <Link className={firststyle ? "redlike" : "whitelike"} onClick={first ? likehandle : offlikehandle}>点赞{props.like}</Link>
                            </div>
                            <div>
                                <Link to={`homepage/${props.content}/${props.id}`}>评论</Link>
                            </div>
                            <div>
                                收藏
                            </div>
                            <div>
                                分享
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
