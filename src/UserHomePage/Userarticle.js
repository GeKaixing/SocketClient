import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux';
import Hompage from '../homepage/Hompage'
export default function Userarticle() {
  /*        用户发布的文章      */
  // 获取登录用户发布的文章
  const [userarticles, setuserarticles] = useState([])
  //获取loginReducer 切片的用户数据
  const { id } = useSelector(state => state.loginReducer)

  const querydata = useQuery('userarticle', async () => {
    const data = await axios.get(`http://127.0.0.1:4000/userarticles/${id}`)
    return data
  }, {
    onSuccess: (data) => {
      setuserarticles(data.data)
    },
    onError: (error) => {
      console.log(error);
    }
  })
  console.log(userarticles);
  return (
     <Hompage userarticles={userarticles}></Hompage> 
  )
}
