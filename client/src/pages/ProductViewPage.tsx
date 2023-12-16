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

        <div className="flex items-center justify-between min-h-[15rem]">
          <div className="w-[67.5%] self-start">
            <ProductTabs description={description} details={details} />
          </div>

          <div className="w-[27.5%] h-[66%] flex items-center justify-center text-center font-simonetta text-xl md:text-lg flex-col">
            <div className="mb-5">
              <p>TakodaTees offers free domestic</p>

              <p>shipping for all U.S. orders</p>

              <p>- with no minimum -</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="font-nanum text-xl mb-3">Come Interact with us!</p>

              <a
                href="https://www.instagram.com/takodatees/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="4em"
                  height="4rem"
                  viewBox="0 0 50 50"
                >
                  <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                </svg>
              </a>
            </div>
          </div>
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
