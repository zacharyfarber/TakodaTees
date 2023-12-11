import { useContext, useEffect } from 'react';

import ProductContext from '../contexts/ProductContext';
import { Product } from '../types';

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
    Object.entries(colors).map(([color, hex]) => {
      return (
        <div
          style={{ backgroundColor: hex }}
          className="h-5 w-5"
          key={color}
          onClick={() => setSelectedColor(color)}
        />
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

            {selectedSize ? <p>{selectedSize.toUpperCase()}</p> : null}
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
