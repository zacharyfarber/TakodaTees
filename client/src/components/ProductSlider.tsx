import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

import useSelectedProduct from '../hooks/useSelectedProduct';
import { Product } from '../types';
import LazyImage from './LazyImage';
import ProductSliderArrows from './ProductSliderArrows';

function ProductSlider({
  products,
  type
}: {
  products: Product[];
  type: string;
}) {
  const [isDragging, setIsDragging] = useState(false);

  const { setSelectedProduct } = useSelectedProduct();
  const navigate = useNavigate();

  let slidesToShow = 0;

  if (type === 'recent-drops') {
    slidesToShow = products.length > 3 ? 3 : products.length;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow,
    prevArrow: <ProductSliderArrows direction="left" />,
    nextArrow: <ProductSliderArrows direction="right" />,
    beforeChange: () => {
      setIsDragging(true);
    },
    afterChange: () => {
      setIsDragging(false);
    }
  };

  const handleViewProduct = (product: Product) => {
    if (!isDragging) {
      setSelectedProduct(product);

      navigate(`/product/${product._id}`);
    }
  };

  const renderProducts = () => {
    if (!products) return null;

    return products.map((product: Product) => {
      let image = '';

      if (product.images)
        image = Object.values(product.images)[0].split(',')[0];

      return (
        <div key={product._id} onClick={() => handleViewProduct(product)}>
          <LazyImage src={image} alt={product.name} />
        </div>
      );
    });
  };

  return <Slider {...sliderSettings}>{renderProducts()}</Slider>;
}

export default ProductSlider;
