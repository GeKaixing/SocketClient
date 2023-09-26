import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom';
import Articledata from './Articledata'
import style from './Hompage.module.css'
export default function Hompage({ userarticles }) {
  const { pathname } = useLocation()
  const [articles, setarticles] = useState([])
  const { isSuccess } = useQuery("articles", async () => {
    const response = await axios.get('http://127.0.0.1:4000/retrievearticle')
    return response
  }, {
    onSuccess: (data) => {
      setarticles(data.data)
    },
    onError: (error) => {
      console.log(error);
    }
  })
  console.log(articles);

  
  return (
    <div >
      {/* pathname根据是否再/ route判断形式什么组件，当不在"/"显示用户发布的POST */}
      {
        pathname === '/' ?
          articles.map(function (item, index) {
            return (
              <Articledata
                key={item._id}
                id={item._id}
                name={item.name}
                content={item.content}
                comments={item.comments}
                likes={item.likes}
                favorites={item.favorites}
                isSuccess={isSuccess}
              /* contenttheme={item.contenttheme} */
              >
              </Articledata>
            );
          }
          ) :
          userarticles.map(function (item, index) {
            return (
              <Articledata
                key={item._id}
                id={item._id}
                name={item.name}
                content={item.content}
                comments={item.comments}
                likes={item.likes}
                favorites={item.favorites}
                isSuccess={isSuccess} >
              </Articledata>
            );
          }
          )
      }
    </div >
  )
}

