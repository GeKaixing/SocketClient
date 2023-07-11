import axios from 'axios'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom';
import Hompage from '../homepage/Hompage'

export default function Userarticle() {
  const [userarticles, setuserarticles] = useState([])
  const id=localStorage.getItem('userid')
  const {pathname}=useLocation()
  console.log(pathname);
  console.log(id);
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
