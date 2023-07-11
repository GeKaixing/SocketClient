import axios from 'axios';
import React from 'react'
// 引入usequery
import { useQuery } from 'react-query';
export default function Query() {
  // 查询
  const querydata = useQuery("articles",
    async () => {
    const data= await axios.get("http://127.0.0.1:4000/getarticles")
    return data
    },
    {
      onSuccess:(data)=>{
        console.log(data);
      }
    },
    {
      onError:(error)=>{
        console.log(error);
      }
    })
console.log(querydata);
return (
  <div>Query</div>
)
}
