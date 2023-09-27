import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux';
import Articledata from '../homepage/Articledata'
export default function Userlikes() {
  /*        用户点赞的文章      */
  // 获取登录用户发布的文章
  const [userlikearticles, setuserlikearticles] = useState([])
  //获取loginReducer 切片的用户数据
  const { id } = useSelector(state => state.loginReducer)

  const { isSuccess } = useQuery('userlikearticles', async () => {
    const data = await axios.get(`http://127.0.0.1:4000/userlikearticles/${id}`)
    return data
  }, {
    onSuccess: (data) => {
      setuserlikearticles(data.data)
    },
    onError: (error) => {
      console.log(error);
    }
  })
  return (
    <>
      {userlikearticles.map((item) => <Articledata
        key={item._id}
        id={item._id}
        name={item.name}
        content={item.content}
        comments={item.comments}
        likes={item.likes}
        favorites={item.favorites}
        isSuccess={isSuccess}
      >
      </Articledata>)}
    </>
  )
}
