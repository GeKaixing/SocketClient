import React, { useState } from 'react'
import axios from 'axios'
export default function Demoupload() {
    let formData = new FormData();
    const [state, setState] = useState()

    const handleChange = (e) => {
        e.preventDefault();

        let file = e.target.files[0];

        formData.append('file', file);

    }
    const handleChanges = (e) => {
        const url = 'http://127.0.0.1:8000/upload'
        axios.post(`${url}`, formData)
            .then(response => {
              console.log(response.data);
            });
    }
    return (<>
        <input type='file' id='avatarInput' onChange={handleChange} />
        <input type='submit' onClick={handleChanges} />
    </>


    )
}
