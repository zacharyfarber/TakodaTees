import { useNavigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate('/admin/login');
  };

  return (
    <div>
      <p>Admin Dashboard</p>

      <div>
        <button onClick={() => navigate('/admin/drops')}>Drop Controls</button>

        <button onClick={() => navigate('/admin/products')}>
          Product Controls
        </button>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default AdminDashboardPage;
