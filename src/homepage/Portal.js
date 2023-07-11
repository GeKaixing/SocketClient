import axios from 'axios';
import React, { useState } from 'react'
export default function Portal({ isshow, access, getid }) {
    //这里设置禁止滚动,还不会,预留
    // 事件冒泡
    const [gettextarea, settextarea] = useState('')
    const get_user_textarea_value = (e) => {

        settextarea(e.target.value)
    }
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
            <div className='backdrop' >
                <div className='useruploading' >
                    <textarea className='uptext' onChange={get_user_textarea_value}>
                    </textarea>
                    <div className='upimage'>
                        上传图品
                        <input type="file" accept="image/gif,image/jpeg,image/jpg,image/png" multiple />
                    </div>
                </div>
                <div onClick={up_user_textarea} className="uploading">
                    发帖
                </div>
                <div onClick={e => { e.stopPropagation(); access(e) }}>
                    返回
                </div>
            </div>)
    )
}
