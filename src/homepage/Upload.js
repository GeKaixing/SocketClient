import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { FileImageFilled } from '@ant-design/icons';
export default function Upload() {
    const [base64, setbase] = useState()
    const [upimg, setupimg] = useState()
    const [file, setfile] = useState()
    // console.log(demo);
    // console.log(base);
    // 存图品的dase64 方式一
    /*     const uploadPhoto = (e) => {
            const imgfile = e.target.files[0]
            setupimg(imgfile)
            console.log(imgfile);
            const reader = new FileReader();
            if (imgfile.size > 0) {
                reader.readAsDataURL(imgfile);
                reader.onload = (e) => {
                    const imgcode = e.target.result
                    setbase(imgcode)
                }
            }
        } */
    // 存图品路径  方式二
    const uploadPhotoformdata = (e) => {
        // 实例化formdata对象
        const formdata = new FormData();
        //第一个差数：这个参数是一个key。这个由后端给你
        // 第二个参数：文件对象
        //获取文件对象
        const imgfile = e.target.files[0]
        formdata.append('file', imgfile)
        // 发送文件上传网络请求
        // POST方法携带data为formdata对象
        console.log(formdata);
        setfile(formdata)
    }
    const mutation = useMutation(data => {
        return axios.post('http://127.0.0.1:4000/uploadformdata', data)
    }

    )
    const uploadhandler = (e) => {
        e.preventDefault();
        mutation.mutate(
            {
                data: {
                    // filename: upimg.name,
                    // filesize: upimg.size,
                    // base64: base64
                    file
                }
            },
            {
                onSuccess: (data) => {
                    console.log(data);
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
        <div className='upimage'>
            {/* <img src={`${base64}`}></img> */}
            <form encType=" multipart/form-data ">
                <input type="file"
                    onChange={uploadPhotoformdata}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    multiple
                    encType="multipart/form-data"
                    name='file'
                />
                <button onClick={uploadhandler}><FileImageFilled/>上传图品</button>
            </form>

        </div>
    )
}
