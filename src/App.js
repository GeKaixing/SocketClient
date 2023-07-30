import React, { useContext, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Socket from './components/Socket'
import Protected from './router/Protected'
import Signup from './components/Signup'
import Routers from './router/Routers'
import Base from './Base'
export default function App() {
   return (
            <Base></Base>
    )
}
