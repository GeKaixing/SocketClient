import React, { useEffect,useState } from 'react'
import { Outlet, Navigate } from "react-router-dom"
export default function Protected({ getid }) {
        /* const loginData = JSON.parse(localStorage.getItem("longinState")) */
    return (
        /* loginData.loginstate */true? <Outlet /> : <Navigate to="/login" replace={true} />
    )
}
