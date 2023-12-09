import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PrivateRoute from './components/PrivateRoute';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDropsViewPage from './pages/AdminDropsViewPage';
import AdminDropEditPage from './pages/AdminDropEditPage';
import AdminProductsViewPage from './pages/AdminProductsViewPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import HomePage from './pages/HomePage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />

          <Route
            path="/admin/dashboard"
            element={<PrivateRoute component={<AdminDashboardPage />} />}
          />

          <Route
            path="/admin/drops"
            element={<PrivateRoute component={<AdminDropsViewPage />} />}
          />

          <Route
            path="/admin/drops/:dropId"
            element={<PrivateRoute component={<AdminDropEditPage />} />}
          />

          <Route
            path="/admin/products"
            element={<PrivateRoute component={<AdminProductsViewPage />} />}
          />

          <Route
            path="/admin/products/:productId"
            element={<PrivateRoute component={<AdminProductEditPage />} />}
          />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
