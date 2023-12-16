import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { getDrop, updateDrop } from '../apis/adminApi';
import LazyImage from '../components/LazyImage';
import { Drop, Product } from '../types';

function AdminDropEditPage() {
  const { dropId } = useParams();

  const { isLoading, data: drop } = useQuery<Drop>({
    queryKey: [`drop-${dropId}-admin`],
    queryFn: () => getDrop(dropId as string)
  });

  const [dropName, setDropName] = useState('');
  const [dropAccess, setDropAccess] = useState('');
  const [productsToRemove, setProductsToRemove] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleUpdateDrop = async (
    dropId: string,
    dropName: string,
    dropAccess: string,
    productsToRemove: string[]
  ) => {
    await updateDrop(dropId, dropName, dropAccess, productsToRemove);

    setDropName('');
    setDropAccess('');
    setProductsToRemove([]);

    queryClient.invalidateQueries({ queryKey: [`drop-${dropId}-admin`] });
  };

  const toggleProductRemoval = (productId: string) => {
    setProductsToRemove((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const renderProducts = () => {
    if (!drop) return null;

    if (!drop.products || !drop.products.length)
      return <p>No products in drop</p>;

    return (drop.products as Product[]).map((product) => {
      let image = '';

      if (product.images)
        image = Object.values(product.images)[0]
          .split(',')
          .filter((image) => {
            return (
              image.includes('thumbnail') && !image.includes('color_thumbnail')
            );
          })[0];

      if (!image)
        image = Object.values(product.images)[0]
          .split(',')
          .filter((image) => {
            return image.includes('front');
          })[0];

      return (
        <div key={product._id}>
          <p>{product.name}</p>

          <div onClick={() => navigate(`/admin/products/${product._id}`)}>
            <LazyImage src={image} alt={product.name} />
          </div>

          <input
            type="checkbox"
            checked={productsToRemove.includes(product._id)}
            onChange={() => toggleProductRemoval(product._id)}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    if (drop) {
      setDropName(drop.name);
      setDropAccess(drop.access);
    }
  }, [drop]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div>
        <button onClick={() => navigate('/admin/drops')}>Back</button>

        <p>Drop Controls</p>
      </div>

      <div>
        <div>
          <p>Rename Drop</p>

          <input
            type="text"
            value={dropName}
            onChange={(e) => setDropName(e.target.value)}
          />
        </div>

        <div>
          <p>Update Drop Access</p>

          <select
            value={dropAccess}
            onChange={(e) => setDropAccess(e.target.value)}
          >
            <option value="private">Private</option>

            <option value="public">Public</option>
          </select>
        </div>

        <div>
          <p>Remove Products From Drop</p>

          <div>{renderProducts()}</div>
        </div>

        <button
          onClick={() =>
            handleUpdateDrop(
              dropId as string,
              dropName,
              dropAccess,
              productsToRemove
            )
          }
        >
          Update Drop
        </button>
      </div>
    </div>
  );
}

export default AdminDropEditPage;
