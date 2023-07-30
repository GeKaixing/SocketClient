import React, { useState } from 'react';

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
      // 发送到后端的特定接口
      fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          // 处理响应
          console.log(response);
        })
        .catch((error) => {
          // 处理错误
          console.error(error);
        });
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