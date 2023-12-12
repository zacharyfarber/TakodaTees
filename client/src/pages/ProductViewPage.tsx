// Notes: If no product found show error page

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getProduct } from '../apis/storeApi';
import ProductImages from '../components/ProductImages';
import ProductOptions from '../components/ProductOptions';
import ProductTabs from '../components/ProductTabs';
import RelatedProducts from '../components/RelatedProducts';
import ProductContext from '../contexts/ProductContext';
import useCart from '../hooks/useCart';
import { Drop, Product, Variant } from '../types';

function ProductViewPage() {
  const { productId } = useParams();

  const { isLoading, data: product } = useQuery<Product>({
    queryKey: [`product_${productId}`],
    queryFn: () => getProduct(productId as string)
  });

  const [productOptionErrors, setProductOptionErrors] = useState({
    color: '',
    size: ''
  });

  const { selectedColor, setSelectedColor, selectedSize } =
    useContext(ProductContext)!;

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;

    const { colors, sizes, variants } = product;

    if (
      colors &&
      Object.keys(colors).length > 0 &&
      !selectedColor &&
      sizes &&
      sizes.length > 0 &&
      !selectedSize
    ) {
      setProductOptionErrors({
        ...productOptionErrors,
        color: 'You need to select a color.',
        size: 'You need to select a size.'
      });

      return;
    }

    if (colors && Object.keys(colors).length > 0 && !selectedColor) {
      setProductOptionErrors({
        ...productOptionErrors,
        color: 'You need to select a color.'
      });

      return;
    }

    if (sizes && sizes.length > 0 && !selectedSize) {
      setProductOptionErrors({
        ...productOptionErrors,
        size: 'You need to select a size.'
      });

      return;
    }

    if (
      (!colors || Object.keys(colors).length <= 0) &&
      (!sizes || sizes.length <= 0)
    ) {
      addToCart({
        product,
        variant: variants[0] as Variant
      });
    } else if (
      (!colors || Object.keys(colors).length <= 0) &&
      sizes &&
      sizes.length === 1
    ) {
      addToCart({
        product,
        variant: variants[0] as Variant,
        size: selectedSize
      });
    } else if (
      (!colors || Object.keys(colors).length <= 0) &&
      sizes &&
      sizes.length > 1
    ) {
      const index = variants.findIndex((variant) =>
        (variant as Variant).name
          .toLowerCase()
          .includes(selectedSize.trim().toLowerCase())
      );

      addToCart({
        product,
        variant: variants[index] as Variant,
        size: selectedSize
      });
    } else if (
      colors &&
      Object.keys(colors).length === 1 &&
      (!sizes || sizes.length <= 0)
    ) {
      addToCart({
        product,
        variant: variants[0] as Variant,
        color: selectedColor
      });
    } else if (
      colors &&
      Object.keys(colors).length > 1 &&
      (!sizes || sizes.length <= 0)
    ) {
      const index = variants.findIndex((variant) =>
        (variant as Variant).name
          .toLowerCase()
          .includes(selectedColor.trim().toLowerCase())
      );

      addToCart({
        product,
        variant: variants[index] as Variant,
        color: selectedColor
      });
    } else if (
      colors &&
      Object.keys(colors).length === 1 &&
      sizes &&
      sizes.length > 1
    ) {
      const index = variants.findIndex((variant) =>
        (variant as Variant).name
          .toLowerCase()
          .includes(selectedSize.trim().toLowerCase())
      );

      addToCart({
        product,
        variant: variants[index] as Variant,
        color: selectedColor,
        size: selectedSize
      });
    } else if (
      colors &&
      Object.keys(colors).length > 1 &&
      sizes &&
      sizes.length === 1
    ) {
      const index = variants.findIndex((variant) =>
        (variant as Variant).name
          .toLowerCase()
          .includes(selectedColor.trim().toLowerCase())
      );

      addToCart({
        product,
        variant: variants[index] as Variant,
        color: selectedColor,
        size: selectedSize
      });
    } else {
      let substring = selectedColor.trim().toLowerCase();

      if (selectedSize) {
        substring += ` / ${selectedSize.trim().toLowerCase()}`;
      }

      const index = variants.findIndex((variant) =>
        (variant as Variant).name.toLowerCase().includes(substring)
      );

      addToCart({
        product,
        variant: variants[index] as Variant,
        color: selectedColor,
        size: selectedSize
      });
    }

    setProductOptionErrors({
      color: '',
      size: ''
    });
  };

  const renderProduct = () => {
    if (!product) return null;

    const { name, price, description, details } = product;

    return (
      <div>
        <p>{name}</p>

        <div>
          <ProductImages product={product} />

          <div>
            <ProductOptions
              product={product}
              productOptionErrors={productOptionErrors}
            />

            <p>${price}</p>

            <button type="button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        <div>
          <ProductTabs description={description} details={details} />

          <div>Social Media Links</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (product) {
      setSelectedColor(Object.keys(product.colors)[0]);
    }
  }, [product]);

  useEffect(() => {
    if (selectedColor) {
      setProductOptionErrors((prev) => ({
        ...prev,
        color: ''
      }));
    }

    if (selectedSize) {
      setProductOptionErrors((prev) => ({
        ...prev,
        size: ''
      }));
    }
  }, [selectedColor, selectedSize]);

  if (isLoading) return <div>Loading...</div>;

  const productDrop = (product as Product).drop;

  return (
    <div className="max-w-[95%] mx-auto">
      <div>{renderProduct()}</div>

      <RelatedProducts
        productId={productId as string}
        productDrop={productDrop as Drop}
      />
    </div>
  );
}

export default ProductViewPage;
