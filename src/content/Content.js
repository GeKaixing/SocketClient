import axios from 'axios';
import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useParams, Link, useLocation  } from 'react-router-dom'
import Comment from './Comment';
import style from './Content.module.css'
import { LikeFilled, StarFilled, RocketFilled } from '@ant-design/icons';
import useQueryUpdataArticleLike from '../hooks/useQueryUpdataArticleLike'
import useQueryUpdataArticleFavorite from '../hooks/useQueryUpdataArticleFavorite'
export default function Content() {
    // useQuery
    const queryClient = useQueryClient()
    // 获取文章数据的useState
    const [contentdata, setcontent] = useState({})
    //获取当前路由
    const {pathname}  = useLocation()
    // 获取页面路由的id
    const { id } = useParams()
    // 自定义hook 修改点赞
    const { linke_mutation } = useQueryUpdataArticleLike(id)
    // 自定义hook 修改收藏
    const { favorite_mutation } = useQueryUpdataArticleFavorite(id)


    // 获取当前文章详情页的数据
    const querydata = useQuery('conten', async () => {
        const data = await axios.get(`http://127.0.0.1:4000/getonearticle/${id}`)
        return data
    },
        { onSuccess: (data) => { setcontent(data.data[0]); } },
        { onError: (error) => { console.log(error) } }
    )
    // 点赞按钮
    const likehandle = (event) => {
        event.stopPropagation()
        linke_mutation()
        queryClient.invalidateQueries("conten")
    }

    // 更新按钮
    const upfavoritehandler = (event) => {
        event.stopPropagation()
        favorite_mutation()
        queryClient.invalidateQueries("conten")
    }
    // 分享按钮
    const sharehandler = () => {
        const at_present_pathname = `http://localhost:3000${pathname}`
        navigator.clipboard.writeText(at_present_pathname).then(() => {
            console.log("复制成功");
        }, (error) => {
            console.log("复制失败：", error);
        });

    }
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
                    <div className={style.thisshowbottom} onClick={likehandle}>
                        <div >
                            <Link className={style.whitelike} ><LikeFilled />{contentdata.likes}</Link>
                        </div>
                        <div className={style.star} onClick={upfavoritehandler}>
                            <StarFilled />{contentdata.favorites}
                        </div>
                        <div className={style.share} onClick={sharehandler}>
                            <RocketFilled />
                            分享
                        </div>
                    </div>
                    <Comment ></Comment>
                    {/*  <input placeholder='评论'>
                </input> */}
                </div>
            </div>
        </div>
    )
}