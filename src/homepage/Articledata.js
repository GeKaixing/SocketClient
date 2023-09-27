import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from 'react-query'
import style from './Articledata.module.css'
import { LikeFilled, StarFilled, RocketFilled, MessageFilled } from '@ant-design/icons';
import TestContext from '../store/TestContext'
import test from '../test.png'
import useQueryUpdataArticleLike from '../hooks/useQueryUpdataArticleLike'
import useQueryUpdataArticleFavorite from '../hooks/useQueryUpdataArticleFavorite'
export default function Articledata(props) {
    /*          根目录的文章           */
    //在自己的like操作
    /* 
     登录然后查询
         是否点赞
         是否转发
         是否收藏
         是否评论
    */
    // useQuery
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const [first, setfirst] = useState(true)
    const [firststyle, setfirststyle] = useState(false)
    const { setshowcommenthandler } = useContext(TestContext)
    // 收藏数&状态
    const [favoritestate, setfavoritestate] = useState(false)
    // 自定义hook 修改点赞
    const { linke_mutation } = useQueryUpdataArticleLike(props.id)
    // 自定义hook 修改收藏
    const { favorite_mutation } = useQueryUpdataArticleFavorite(props.id)

    // 点赞按钮
    const likehandle = (event) => {
        event.stopPropagation()
        linke_mutation()
        queryClient.invalidateQueries("articles")
    }

    // 更新按钮
    const upfavoritehandler = (e) => {
        e.stopPropagation()
        favorite_mutation()
        queryClient.invalidateQueries("articles")
    }

    // 跳转到指点的路由的函数
    const navgatehandle = (e) => {
        e.stopPropagation()
        /*在ulr加/斜杠和不加是有区别的，加入会把路径替换，不加这是在路径后面加上这个路径  */
        navigate(`/homepage/${props.id}`);
    };
    // 分享按钮设置，点击然后分享url
    const sharehandler = (e) => {
        e.stopPropagation()
        const pathname = `http://localhost:3000/homepage/${props.id}`
        navigator.clipboard.writeText(pathname).then(() => {
            console.log("复制成功");
        }, (error) => {
            console.log("复制失败：", error);
        });
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
                                <Link onClick={setshowcommenthandler} className={style.MessageFilled} ><MessageFilled />{props.comments}</Link>
                            </div>
                            <div className={favoritestate ? style.nostar : style.star} onClick={upfavoritehandler} >
                                <StarFilled />收藏{props.favorites}
                            </div>
                            <div className={style.share} onClick={sharehandler}>
                                <RocketFilled />分享
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
