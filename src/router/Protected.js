import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
export default function Protected({getid}) {
    const id=localStorage.getItem('userid')
    console.log(id);
    return (
        id ? <Outlet /> : <Navigate to="/login" replace={true}/>
    )
}
