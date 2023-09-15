import axios from 'axios'
import React, { useContext, useEffect, useState, useDebounce, useCallback } from 'react'
import { Link, Routes, Route, useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import style from './Articledata.module.css'
import { LikeFilled, StarFilled, RocketFilled, MessageFilled } from '@ant-design/icons';
import TestContext from '../store/TestContext'
import test from '../test.png'
export default function Articledata(props) {
    /*  
    在自己的like操作
    */
   /* 
    登录然后查询
        是否点赞
        是否转发
        是否收藏
        是否评论
   */
    // const aa = comment.map((item) => {
    //     <Link key={item.id}>{item.comment}</Link>
    // })
    const [liked, setlike] = useState(props.likes)
    const [first, setfirst] = useState(true)
    const [firststyle, setfirststyle] = useState(false)
    const { setshowcommenthandler } = useContext(TestContext)
    // 收藏数&状态
    const [favorite, setfavorite] = useState(props.favoritess)

    const [favoritestate, setfavoritestate] = useState(false)

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
    const userid = localStorage.getItem('userid')
    const queryClient = useQueryClient()
    const likehandle = useCallback(clickInner(), [])
    function clickInner() {
        
        let timer;
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                first ?
                    setlike((liked) => liked - 1) :
                    setlike((liked) => liked + 1)
                axios.post(
                    `http://127.0.0.1:4000/updataarticlelike/${props.id}`,
                    {
                        data: {
                            like: liked,
                            userid: userid
                        }
                    })
                    .then((data) => {
                        
                        setfirst(!first)
                        /*  setfirst(() => false) */
                        setfirststyle(!firststyle)
                    })
                    .catch((er) => {
                        
                    })
            }, 1000);
            queryClient.invalidateQueries("articles")
        }
    }
    // useEffect(()=>{
    //     axios.post(
    //         `http://127.0.0.1:4000/updataarticlelike/${props.id}`,
    //         { data: { like: liked } })
    //         .then((data) => {
    //             console.log(data);
    //             setfirst(!first)
    //             /*  setfirst(() => false) */
    //             setfirststyle(!firststyle)
    //         })
    //         .catch((e) => {
    //             console.log(e);
    //         })
    //     queryClient.invalidateQueries("articles")
    // },[liked,queryClient])
    /*   const offlikehandle = (e) => {
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
      */
    const navigate = useNavigate()
    const navgatehandle = (e) => {
        e.stopPropagation()
        navigate(`homepage/${props.id}`);
    };
    //patch收藏
    const mutation = useMutation((data) => {
        return axios.patch(`http://127.0.0.1:4000/upfavorite/${props.id}`, data)
    })
    const upfavoritehandler = (e) => {
        e.stopPropagation()
        favoritestate ? setfavorite(favorite => favorite - 1) :
            setfavorite(favorite => favorite + 1)
        mutation.mutate({
            data: {
                favorite
            }
        }, {
            onSuccess: (data) => {
            
                queryClient.invalidateQueries("articles")
                setfavoritestate(!favoritestate)
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
        <>
            {
                props.isSuccess &&
                <div className={style.messagebigbox} onClick={navgatehandle}>
                    <div className={style.messagebox}>
                        <div className={style.thisshowname} onClick={e => e.stopPropagation()}>
                            <div className={style.handimg}>
                                <img src={test} className={style.img}></img>
                            </div>
                            
                            <Link className={style.handname}>{props.name}</Link>
                        </div>
                        <div className={style.thisshowtheme} onClick={e => e.stopPropagation()}>
                            <Link>{props.contenttheme}</Link>
                        </div>
                        <div className={style.thisshowcontent}>

                            {props.content}
                            <img src={test} className={style.img}></img>
                        </div>
                        <div className={style.thisshowbottom} >
                            <div>
                                <Link id='like' className={firststyle ? style.redlike : style.whitelike} onClick={likehandle}><LikeFilled />{props.likes}</Link>
                            </div>
                            <div>
                                <Link onClick={setshowcommenthandler} className={style.MessageFilled} ><MessageFilled />评论</Link>
                            </div>
                            <div className={favoritestate ? style.nostar : style.star} onClick={upfavoritehandler} >
                                <StarFilled />收藏{props.favorites}
                            </div>
                            <div className={style.share} onClick={e => e.stopPropagation()}>
                                <RocketFilled />分享
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
