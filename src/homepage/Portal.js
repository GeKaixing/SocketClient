import axios from 'axios';
import React, { useState } from 'react'
import Upload from './Upload';
import style from './Portal.module.css'
import { CloseOutlined } from '@ant-design/icons';
export default function Portal({ isshow, access, getid }) {
    //这里设置禁止滚动,还不会,预留
    // 事件冒泡
    const [gettextarea, settextarea] = useState('')
    const get_user_textarea_value = (e) => {

        settextarea(e.target.value)
    }
    const name = localStorage.getItem('username')
    // console.log(gettextarea);
    // 根据用户id,上传用户帖子内容,
    // 服务器根据用户id查询,并在该用户下保存帖子内容
    // 数据库,在用户信息中保存帖子内容
    // 客户端主页差选所有帖子，便按照时间排序新旧
    const up_user_textarea = () => {
        getid === "" ? alert('请登入或者注册') :
            gettextarea === "" ?
                alert('输入为空') :
                axios.post('http://127.0.0.1:4000/uploading', {
                    data: {
                        name: name,
                        content: gettextarea,
                        user: getid
                    }
                })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
    }
    return (
        isshow && (
            /* 事件冒泡 */
            <div className={style.backdrop}>
                <div className={style.deomcolor} >
                    <div className={style.back} onClick={e => { access(e) }}><div><CloseOutlined style={{ fontSize: '20px', }} /></div></div>
                    <div className={style.useruploading}>
                        {/* 头像&名字 */}
                        <div className={style.showname} >
                            <div className={style.handimg} > </div>
                            <div className={style.handname}>这是名字</div>
                        </div>
                        <textarea className={style.uptext} onChange={get_user_textarea_value}></textarea>
                        <Upload></Upload>
                    </div>
                    <div className={style.uploading} onClick={up_user_textarea} >
                        发帖
                    </div>
                </div>
            </div>)
    )
}
