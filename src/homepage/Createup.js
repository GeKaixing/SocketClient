import React from 'react'
import { createPortal } from 'react-dom'

export default function Createup() {
    return (
        <div className='creatborder'>
            {createPortal(
                    <div>创建帖子，然后上传</div>,
                    document.getElementById('modal')
            )}
        </div>
    )
}
