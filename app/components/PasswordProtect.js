// JavaScript Document
'use client';
import { useState } from 'react';

export default function PasswordProtect({ children }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 把这里的密码改成你想要的（比如生日日期）
    if (password === '0114') {
      setIsAuthenticated(true);
    } else {
      alert('密码错误，请重试');
    }
  };
  
  if (isAuthenticated) {
    return children;
  }
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        width: '300px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
          请输入密码访问
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="输入密码"
          style={{
            width: '100%',
            padding: '0.75rem',
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '1rem'
          }}
        />
        <button type="submit" style={{
          width: '100%',
          padding: '0.75rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1rem',
          cursor: 'pointer'
        }}>
          进入
        </button>
      </form>
    </div>
  );
}