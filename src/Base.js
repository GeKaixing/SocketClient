import React, { useState } from 'react'
import Routers from './router/Routers'
import TestContext from './store/TestContext'
export default function Base() {
     //是否显示评论框
     const [showcomment, setshowcomment] = useState(false)
     const setshowcommenthandler=(e)=>{
      e.stopPropagation()
      setshowcomment(!showcomment)
     }
     // 显示评论或者回复字段
     const [showreply, setshowreply] = useState(false)
     const setshowreplyhandler=(e)=>{
          e.stopPropagation()

      setshowreply(!showreply)
     }
  return (
    <TestContext.Provider value={{showcomment,setshowcommenthandler,showreply,setshowreplyhandler}}>
    <Routers></Routers>
    </TestContext.Provider>
  )
}
