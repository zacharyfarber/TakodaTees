import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function PrivateRoute({ component }: { component: ReactElement }) {
  const { isLoading, authenticated } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return authenticated ? <>{component}</> : <Navigate to="/admin/login" />;
}

export default PrivateRoute;
