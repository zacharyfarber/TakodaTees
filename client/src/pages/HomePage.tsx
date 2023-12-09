import { useQuery } from '@tanstack/react-query';

import { getRecentDrops } from '../apis/storeApi';
import ProductSlider from '../components/ProductSlider';
import { Drop, Product } from '../types';

function HomePage() {
  const {
    isLoading,
    error,
    data: drops
  } = useQuery<Drop[]>({
    queryKey: ['recent-drops'],
    queryFn: getRecentDrops
  });

  if (isLoading) return 'Loading...';

  if (error) return 'An error occurred: ' + error;

  const renderDrops = () => {
    if (!drops) return null;

    return drops.map((drop: Drop) => {
      return (
        <div key={drop._id}>
          <p>{drop.name}</p>

          <ProductSlider
            products={drop.products as Product[]}
            type="recent-drops"
          />
        </div>
      );
    });
  };

  return (
    <div>
      <div>Spotlight Hero</div>

      <div>{renderDrops()}</div>
    </div>
  );
}

export default HomePage;
