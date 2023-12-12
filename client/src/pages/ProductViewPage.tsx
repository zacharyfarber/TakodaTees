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

  const [isClicked, setIsClicked] = useState(false);

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

    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 350);

    setProductOptionErrors({
      color: '',
      size: ''
    });
  };

  const renderProduct = () => {
    if (!product) return null;

    const { name, price, description, details } = product;

    return (
      <div className="flex flex-col mb-20 min-h-[40rem]">
        <p className="border border-[#1E1E1E] w-[95%] mx-auto my-5 text-center flex justify-center items-center h-[4rem] font-simonetta text-4xl">
          {name}
        </p>

        <div className="flex items-start justify-between h-full mb-24">
          <div className="w-[47.5%]">
            <ProductImages product={product} />
          </div>

          <div className="w-[47.5%] border border-[#1E1E1E] px-5 self-stretch flex flex-col justify-evenly">
            <ProductOptions
              product={product}
              productOptionErrors={productOptionErrors}
            />

            <div className="flex items-center">
              <p className="font-simonetta text-3xl mr-5">Price:</p>

              <p className="font-nanum text-3xl flex self-end">${price}</p>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`flex justify-center items-center mx-auto text-center w-[40%] h-10 text-lg mt-5 font-simonetta ${
                isClicked ? '!bg-[#373737]' : 'bg-[#1E1E1E]'
              } text-[#F0F0F0]`}
            >
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
    <div className="max-w-[70%] mx-auto flex flex-col">
      <div>{renderProduct()}</div>

      <div>
        <RelatedProducts
          productId={productId as string}
          productDrop={productDrop as Drop}
        />
      </div>
    </div>
  );
}

export default ProductViewPage;
