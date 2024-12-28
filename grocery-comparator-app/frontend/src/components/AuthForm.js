import React, { useState } from 'react';
import { loginUser, registerUser } from '../services/authService';

const AuthForm = ({ isLogin, setAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await loginUser(username, password);
        setAuthenticated(true);
      } else {
        const response = await registerUser(username, password);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default AuthForm;
