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
        <button
          className={`w-1/5 mx-2 border border-white hover:border-[#878787]/20 ${
            selectedColor.toLowerCase() === color.toLowerCase()
              ? '!border-[#878787]'
              : ''
          }`}
          key={color}
          onClick={() => setSelectedColor(color)}
        >
          <LazyImage src={colorThumbnail as string} alt={color} />
        </button>
      );
    });

  const renderSizes = () =>
    sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`border border-white rounded-full h-12 w-12 text-center flex items-center justify-center mx-2 hover:bg-[#878787]/20 ${
          selectedSize.toLowerCase() === size.toLowerCase()
            ? '!bg-[#878787]'
            : ''
        }`}
      >
        {size}
      </button>
    ));

  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  return (
    <div className="py-5">
      {colors && Object.keys(colors).length > 0 ? (
        <div className="mb-16">
          <div className="flex items-center mb-5">
            <p className="font-simonetta text-3xl mr-5">Color:</p>

            {selectedColor ? (
              <p className="font-nanum text-3xl flex self-end">
                {selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1)}
              </p>
            ) : null}
          </div>

          <div>
            <div className="flex flex-wrap">{renderColors()}</div>

            {productOptionErrors.color && productOptionErrors.color}
          </div>
        </div>
      ) : null}

      {sizes && sizes.length > 0 ? (
        <div className="mb-16">
          <div className="flex items-center mb-5">
            <p className="font-simonetta text-3xl mr-5">Size:</p>

            {selectedSize ? (
              <p className="font-nanum text-3xl flex self-end">
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
            <div className="flex">{renderSizes()}</div>

            {productOptionErrors.size && productOptionErrors.size}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProductOptions;
