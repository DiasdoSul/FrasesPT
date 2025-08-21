import React, { useState } from 'react';
import api from '../../api/api';

const Login: React.FC<{ onLogin?: () => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Attempting login with:', { username, password });
      console.log('API base URL:', api.defaults.baseURL);
      
      const response = await api.post('/api-token-auth/', { username, password });
      console.log('Login response:', response.data);
      const token = response.data.token;

      // Store token for future requests
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Token ${token}`;

      setError('');
      if (onLogin) onLogin(); // refresh App auth state
    } catch (err) {
      console.error('Login failed', err);
      setError('Invalid username or password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
