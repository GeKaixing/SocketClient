import React from 'react'
import './Aside.css'
import Main from './Main'
export default function aside() {
    return (
        <>
            <div class="sidenav">
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#clients">Clients</a>
                <a href="#contact">联系方式</a>
            </div>

           <Main></Main>
        </>
    )
}
