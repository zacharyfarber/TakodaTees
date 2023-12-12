import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CartContext from './contexts/CartContext';
import ProductContext from './contexts/ProductContext';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminDropEditPage from './pages/AdminDropEditPage';
import AdminDropsViewPage from './pages/AdminDropsViewPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminProductEditPage from './pages/AdminProductEditPage';
import AdminProductsViewPage from './pages/AdminProductsViewPage';
import HomePage from './pages/HomePage';
import ProductViewPage from './pages/ProductViewPage';

const queryClient = new QueryClient();

function App() {
  const [cartKey, setCartKey] = useState(Date.now());
  const [cartOpen, setCartOpen] = useState(false);

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <CartContext.Provider
          value={{ cartKey, setCartKey, cartOpen, setCartOpen }}
        >
          <Router>
            <Header />

            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route
                path="/product/:productId"
                element={
                  <ProductContext.Provider
                    value={{
                      selectedColor,
                      setSelectedColor,
                      selectedSize,
                      setSelectedSize
                    }}
                  >
                    <ProductViewPage />
                  </ProductContext.Provider>
                }
              />

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
        </CartContext.Provider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
