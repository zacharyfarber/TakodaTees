import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PrivateRoute from './components/PrivateRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/admin/dashboard"
            element={<PrivateRoute component={<AdminDashboardPage />} />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
