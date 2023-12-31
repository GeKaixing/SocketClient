import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './MainMenu.module.css'
import { HomeFilled, MessageFilled, PlusSquareFilled, BulbFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';
export default function MainMenu() {
  const [width, setwidth] = useState(window.innerWidth)
  const data = useSelector(state => state.loginReducer)
  useEffect(() => {
    const handlerResize = () => {
      setwidth(window.innerWidth)
    }
    // 警听
    window.addEventListener('resize', handlerResize)
    return () => {
      // 卸载警听
      window.removeEventListener('resize', handlerResize);
    }
  }, [window.innerWidth])
  return (
    <div>
      <div className={style.bar} >
        {
          width < 750 ? null :
            <div className={style.logo}>logo</div>
        }
        <Link className={style.link} to="/"> <div><HomeFilled />{width < 750 ? null : "主页"}</div></Link>
        <Link className={style.link} to="/about"><div><BulbFilled />{width < 750 ? null : "关于"}</div></Link>
        <Link className={style.link} to='/socket'><div><MessageFilled />{width < 750 ? null : "聊天"}</div></Link>
        <Link className={style.link} to='/post' ><div><PlusSquareFilled />{width < 750 ? null : "发帖"}</div></Link>
        {data.loginState ? null : <Link className={style.link} to="/login">{width < 750 ? null : "登录"}</Link>}
      </div>
      {/* 脱离文档流，父元素坍塌问题 */}
      {
        width < 750 ? null :
          <div className={style.leftplace}></div>
      }

    </div>
  )
}
