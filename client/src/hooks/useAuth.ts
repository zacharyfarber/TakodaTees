import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import { validateToken } from '../apis/authApi';

function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);

  const navigate = useNavigate();

  const tokenValidationHelper = (
    authenticated: boolean,
    isLoading: boolean,
    message: string
  ) => {
    setAuthenticated(authenticated);
    setIsLoading(isLoading);
    setError(message);
  };

  const login = (token: string) => {
    Cookies.set('token', token, { expires: 1 });
    setAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove('token');
    setAuthenticated(false);
  };

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      setError('');

      const token = Cookies.get('token');

      if (token) {
        const { isValidated } = await validateToken(token);

        if (isValidated) {
          tokenValidationHelper(true, false, '');
          return;
        }

        tokenValidationHelper(false, false, 'Invalid token');
        return;
      }

      tokenValidationHelper(false, false, 'No token found');
      return;
    };

    checkAuth();
  }, [authenticated, navigate]);

  return { isLoading, error, authenticated, login, logout };
}

export default useAuth;
