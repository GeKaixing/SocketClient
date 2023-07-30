import React from 'react'
import Hompage from '../homepage/Hompage'
import User from './User'
import style from './Home.module.css'
export default function Home() {
  return (
    <>
     <div className={style.home}>
      <Hompage></Hompage>
      <User></User>
    </div>
 
    </>
   
  )
}
