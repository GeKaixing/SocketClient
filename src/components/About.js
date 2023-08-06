import React from 'react'
import { Link } from 'react-router-dom'
import style from './About.module.css'
export default function About() {
  return (
    <div className={style.about}>
        <Link to="/">回到主页</Link>
    </div>
  )
}
