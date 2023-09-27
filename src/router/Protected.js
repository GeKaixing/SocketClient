import React from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from 'react-redux'
export default function Protected({ getid }) {
    const { loginState } = useSelector(state => state.loginReducer);
    return (
        loginState ? <Outlet /> : <Navigate to="/login" replace={true} />
    )
}
