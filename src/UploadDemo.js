import React, { useState } from 'react';
import qs from 'qs';
import axios from 'axios'
function ImageUploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // 获取formdata的value
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      // formdata实例
      const formData = new FormData();
      // 添加selectedFile到formdata实例
      formData.append('file', selectedFile);
      console.log(formData);
      // 发送到后端的特定接口

      fetch('http://127.0.0.1:4000/uploadformdata', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });

      /*  let config = {
         headers: {
             'Content-Type': 'multipart/form-data'
         }
     }
     const data = qs.stringfy({formData})
     axios.post('', data,config
     ).then( res => {
         console.log(res)
     }).catch( res => {
         console.log(res)
     }) */
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">上传图片</button>
    </form>
  );
}

export default ImageUploadForm;