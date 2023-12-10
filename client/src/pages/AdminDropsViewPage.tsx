import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { createDrop, deleteDrop, getDrops } from '../apis/adminApi';
import LazyImage from '../components/LazyImage';
import { Drop, Product } from '../types';

function AdminDropsViewPage() {
  const { isLoading, data: drops } = useQuery<Drop[]>({
    queryKey: ['drops-admin'],
    queryFn: getDrops
  });

  const [dropName, setDropName] = useState('');

  const [selectedDrop, setSelectedDrop] = useState<Drop>({
    _id: '',
    name: '',
    access: '',
    products: []
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleCreateDrop = async (dropName: string) => {
    await createDrop(dropName);

    setDropName('');

    queryClient.invalidateQueries({ queryKey: ['drops-admin'] });
  };

  const handleDeleteDrop = async (dropId: string) => {
    await deleteDrop(dropId);

    setSelectedDrop({
      _id: '',
      name: '',
      access: '',
      products: []
    });

    queryClient.invalidateQueries({ queryKey: ['drops-admin'] });
  };

  const renderDrop = (dropId: string) => {
    const drop = drops?.find((drop: Drop) => drop._id === dropId);

    if (!drop) return null;

    return (
      <div>
        <p>{drop.name}</p>

        {drop.products
          ? (drop.products as Product[]).map((product) => {
              let image = '';

              if (product.images)
                image = Object.values(product.images)[0]
                  .split(',')
                  .filter((image) => {
                    return (
                      image.includes('thumbnail') &&
                      !image.includes('color_thumbnail')
                    );
                  })[0];

              return (
                <LazyImage key={product._id} src={image} alt={product.name} />
              );
            })
          : null}

        <div>
          <button onClick={() => navigate(`/admin/drops/${drop._id}`)}>
            Edit
          </button>

          <button onClick={() => handleDeleteDrop(drop._id)}>Delete</button>
        </div>
      </div>
    );
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <button onClick={() => navigate('/admin/dashboard')}>Back</button>

        <p>Drop Controls</p>
      </div>

      <div>
        <p>Drop Name</p>

        <input
          type="text"
          value={dropName}
          onChange={(e) => setDropName(e.target.value)}
        />

        <button onClick={() => handleCreateDrop(dropName)}>Create Drop</button>
      </div>

      <div>
        <div>
          <p>Select a Drop</p>

          <select
            value={selectedDrop._id || ''}
            onChange={(event) =>
              setSelectedDrop((prev) => ({ ...prev, _id: event.target.value }))
            }
          >
            <option value={''}>Select a Drop</option>

            {drops
              ? drops.map((drop) => (
                  <option key={drop._id} value={drop._id}>
                    {drop.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        {selectedDrop._id ? <div>{renderDrop(selectedDrop._id)}</div> : null}
      </div>
    </div>
  );
}

export default AdminDropsViewPage;
