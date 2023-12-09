import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { attemptLogin } from '../apis/authApi';
import useAuth from '../hooks/useAuth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login, authenticated } = useAuth();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { token } = await attemptLogin(username, password);

    if (token) {
      login(token);

      navigate('/admin/dashboard');
    }
  };

  useEffect(() => {
    // if user is already logged in, redirect to dashboard
    if (authenticated) navigate('/admin/dashboard');
  }, [navigate, authenticated]);

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />

      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
