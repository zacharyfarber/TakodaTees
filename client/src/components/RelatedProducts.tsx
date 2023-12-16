import { useQuery } from '@tanstack/react-query';

import { getDrop } from '../apis/storeApi';
import { Drop, Product } from '../types';
import ProductSlider from './ProductSlider';

function RelatedProducts({
  productId,
  productDrop
}: {
  productId: string;
  productDrop: Drop;
}) {
  const { isLoading, data: drop } = useQuery<Drop>({
    queryKey: [`related_products_${productId}`],
    queryFn: () => getDrop(productDrop._id)
  });

  const dropProducts = drop?.products;

  if (!dropProducts) return;

  const relatedProducts = (dropProducts as Product[]).filter(
    (product: Product) => product._id !== productId
  );

  const renderRelatedProducts = () => {
    if (!drop) return;

    return (
      <div className="w-[130%] relative left-[-15%]">
        <p className="flex items-center justify-center text-center mb-5 font-simonetta text-5xl">
          {drop.name}
        </p>

        <ProductSlider
          products={relatedProducts as Product[]}
          type="related-products"
        />
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return <div className="w-11/12 mx-auto">{renderRelatedProducts()}</div>;
}

export default RelatedProducts;
