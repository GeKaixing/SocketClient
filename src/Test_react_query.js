import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';

function Test_react_query() {
  const [name, setName] = useState('');

  const [updateName, { isLoading, error, data }] = useMutation(
    async (variables) => {
      const response = await fetch(
        'https://example.com/api/update-name',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: variables.name,
          }),
        }
      );

      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error(response.statusText);
      }
    },
    {
      // 设置 `variables` 对象。
      variables: {
        name,
      },
      // 设置 `cache` 参数为 `true`。
      cache: true,
    }
  );

  const handleSubmit = () => {
    updateName();
  };

  return (
    <div>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      <button onClick={handleSubmit}>提交</button>
      {isLoading && <p>正在更新...</p>}
      {error && <p>更新失败：{error.message}</p>}
      {data && <p>更新成功：{data.name}</p>}
    </div>
  );
}

export default Test_react_query;