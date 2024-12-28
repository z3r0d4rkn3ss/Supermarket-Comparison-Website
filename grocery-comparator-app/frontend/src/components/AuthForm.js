import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      let response;
      if (type === 'login') {
        response = await axiosInstance.post('/auth/login', data);
      } else {
        response = await axiosInstance.post('/auth/signup', data);
      }
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        window.location.href = '/';  // Redirect to the home page after successful login/signup
      }
    } catch (error) {
      setError('Authentication failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      {error && <p>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{type === 'login' ? 'Login' : 'Sign Up'}</button>
    </form>
  );
};

export default AuthForm;
