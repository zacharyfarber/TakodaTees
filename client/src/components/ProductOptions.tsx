import { useContext, useEffect } from 'react';

import ProductContext from '../contexts/ProductContext';
import { Product } from '../types';
import LazyImage from './LazyImage';

function ProductOptions({
  product,
  productOptionErrors
}: {
  product: Product;
  productOptionErrors: {
    color: string;
    size: string;
  };
}) {
  const { selectedColor, setSelectedColor, selectedSize, setSelectedSize } =
    useContext(ProductContext)!;

  const { colors, sizes } = product;

  const renderColors = () =>
    Object.entries(colors).map(([color]) => {
      const images = product.images[color].split(',');

      let colorThumbnail = images.find((image) =>
        image.includes('color_thumbnail')
      );

      if (!colorThumbnail)
        colorThumbnail = images.find((image) => image.includes('front'));

      return (
        <div
          className="h-20 w-20"
          key={color}
          onClick={() => setSelectedColor(color)}
        >
          <LazyImage src={colorThumbnail as string} alt={color} />
        </div>
      );
    });

  const renderSizes = () =>
    sizes.map((size) => (
      <span key={size} onClick={() => setSelectedSize(size)}>
        {size}
      </span>
    ));

  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  return (
    <div>
      {colors && Object.keys(colors).length > 0 ? (
        <div>
          <div>
            <p>Color:</p>

            {selectedColor ? (
              <p>
                {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
              </p>
            ) : null}
          </div>

          <div>
            <div>{renderColors()}</div>

            {productOptionErrors.color && productOptionErrors.color}
          </div>
        </div>
      ) : null}

      {sizes && sizes.length > 0 ? (
        <div>
          <div>
            <p>Size:</p>

            {selectedSize ? (
              <p>
                {selectedSize.toLowerCase() === 's'
                  ? 'Small'
                  : selectedSize.toLowerCase() === 'm'
                  ? 'Medium'
                  : selectedSize.toLowerCase() === 'l'
                  ? 'Large'
                  : 'Extra Large'}
              </p>
            ) : null}
          </div>

          <div>
            <div>{renderSizes()}</div>

            {productOptionErrors.size && productOptionErrors.size}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductOptions;
