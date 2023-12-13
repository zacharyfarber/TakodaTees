import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';

// import useSelectedProduct from '../hooks/useSelectedProduct';
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

  // const { setSelectedProduct } = useSelectedProduct();
  const navigate = useNavigate();

  let slidesToShow = 0;

  if (type === 'recent-drops') {
    slidesToShow = products.length > 3 ? 3 : products.length;
  }

  if (type === 'related-products') {
    slidesToShow = products.length > 4 ? 4 : products.length;
  }

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow,
    prevArrow: <ProductSliderArrows direction="left" type={type} />,
    nextArrow: <ProductSliderArrows direction="right" type={type} />,
    beforeChange: () => {
      setIsDragging(true);
    },
    afterChange: () => {
      setIsDragging(false);
    }
  };

  const handleViewProduct = (product: Product) => {
    if (!isDragging) {
      // setSelectedProduct(product);

      navigate(`/product/${product._id}`);
    }
  };

  const renderProducts = () => {
    if (!products) return null;

    return products.map((product: Product) => {
      let image = '';

      if (product.images)
        image = Object.values(product.images)[0]
          .split(',')
          .filter((image) => {
            return (
              image.includes('thumbnail') && !image.includes('color_thumbnail')
            );
          })[0];

      return (
        <button key={product._id} onClick={() => handleViewProduct(product)}>
          <div className={type === 'related-products' ? 'p-1' : ''}>
            <LazyImage
              src={image}
              alt={product.name}
              className={
                type === 'recent-drops'
                  ? 'bg-[#2F2F2F] border-[1rem] border-[#1E1E1E]'
                  : 'bg-[#F0F0F0] border-2 border-white'
              }
            />
          </div>
        </button>
      );
    });
  };

  return <Slider {...sliderSettings}>{renderProducts()}</Slider>;
}

export default ProductSlider;
