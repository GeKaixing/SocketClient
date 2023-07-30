import { useState } from "react"

export const useIsorNot=(init=false)=>{
const [state,setstate]=useState(init)
const updatastate=()=>{
    setstate(()=>!state)
}
return[state,updatastate]
}