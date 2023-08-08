import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom';
import Articledata from './Articledata'
import style from './Hompage.module.css'
export default function Hompage({userarticles}) {
  const {pathname}=useLocation()
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
  /*   useEffect(() => {
      const getarticles = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:4000/getarticles')
          setload(true)
          setarticles(response.data)
        } catch (e) {
          setload(false)
          console.log(e);
        }
      }
      getarticles()
    }, []) */
    console.log(articles);
  return (
    <div >
      {
        pathname==='/'?
        articles.map(function (item, index) {
          return (
            <Articledata
              key={item._id}
              name={item.name}
              contenttheme={item.contenttheme}
              content={item.content}
              comments={item.comments}
              like={item.like}
              isSuccess={isSuccess}
              id={item._id} >
            </Articledata>
          );
        }
        ): 
        userarticles.map(function (item, index) {
          return (
            <Articledata
              key={item._id}
              name={item.name}
              contenttheme={item.contenttheme}
              content={item.content}
              comments={item.comments}
              like={item.like}
              isSuccess={isSuccess}
              id={item._id} >
            </Articledata>
          );
        }
        )
      }
    </div >
  )
}

