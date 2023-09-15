import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const queryClient = useQueryClient();

  const loginMutation = useMutation(
    async () => {
      // 在这里进行实际的登录操作，可能需要向后端发送请求
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // 登录成功后，将用户信息保存在本地存储中
        localStorage.setItem('user', JSON.stringify(data));
        return data;
      } else {
        throw new Error('登录失败');
      }
    },
    {
      // 当登录成功后，更新React Query中的用户数据
      onSuccess: () => {
        queryClient.invalidateQueries('user');
      },
    }
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default LoginForm;
