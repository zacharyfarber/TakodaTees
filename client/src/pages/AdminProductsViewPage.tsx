import { useNavigate } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteProduct, getProducts } from '../apis/adminApi';
import LazyImage from '../components/LazyImage';
import { Product } from '../types';

function AdminProductsViewPage() {
  const { isLoading, data: products } = useQuery<Product[]>({
    queryKey: ['products-admin'],
    queryFn: getProducts
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);

    queryClient.invalidateQueries({ queryKey: ['products-admin'] });
  };

  const renderProducts = () => {
    if (!products) return null;

    return products.map((product) => {
      let image = '';

      if (product.images) image = Object.values(product.images)[0][0];

      return (
        <div key={product._id}>
          <p>{product.name}</p>

          {product.images ? <LazyImage src={image} alt={product.name} /> : null}

          <div>
            <button onClick={() => navigate(`/admin/products/${product._id}`)}>
              Edit
            </button>

            <button onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </button>
          </div>
        </div>
      );
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <button onClick={() => navigate('/admin/dashboard')}>Back</button>

        <p>Product Controls</p>
      </div>

      <div>{renderProducts()}</div>
    </div>
  );
}

export default AdminProductsViewPage;
