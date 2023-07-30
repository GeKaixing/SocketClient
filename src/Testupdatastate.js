import React from 'react'
import { useIsorNot } from './useIsorNot'
export default function Testupdatastate() {
    const [state, updatastate] = useIsorNot(true)
    console.log(state);
    return (
        <>
        {
            state ?
                <div>Testupdatastate</div> : null
        }
        <button onClick={updatastate}>切换</button>
        </>


    )
}
