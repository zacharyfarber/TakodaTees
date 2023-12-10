import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getDrops,
  getProduct,
  updateProductData,
  updateProductDrop
} from '../apis/adminApi';
import { Drop, Product, ProductData, Variant } from '../types';

function AdminProductEditPage() {
  const { productId } = useParams();

  const { isLoading: isLoadingProduct, data: product } = useQuery<Product>({
    queryKey: [`product-${productId}-admin`],
    queryFn: () => getProduct(productId as string)
  });

  const { isLoading: isLoadingDrops, data: drops } = useQuery<Drop[]>({
    queryKey: ['drops-admin'],
    queryFn: () => getDrops()
  });

  const [productData, setProductData] = useState<ProductData>({
    name: '',
    price: 0,
    colors: {},
    sizes: [],
    description: '',
    details: '',
    category: '',
    keywords: '',
    drop: ''
  });

  const [productDataErrors, setProductDataErrors] = useState({
    name: '',
    price: '',
    colors: '',
    sizes: '',
    description: '',
    details: '',
    category: '',
    keywords: '',
    drop: ''
  });

  const [addColor, setAddColor] = useState({ color: '', hex: '' });

  const [addSize, setAddSize] = useState('');

  const [formsSubmitted, setFormsSubmitted] = useState({
    dataForm: { pending: false, success: false },
    dropForm: { pending: false, success: false }
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleUpdateProductData = async () => {
    if (formsSubmitted.dataForm.pending) {
      if (Object.values(productDataErrors).some((error) => error)) {
        setFormsSubmitted((prev) => ({
          ...prev,
          dataForm: { pending: false, success: false }
        }));
      } else {
        updateProductData(productId as string, productData).then(() => {
          setFormsSubmitted((prev) => ({
            ...prev,
            dataForm: { pending: false, success: true }
          }));

          queryClient.invalidateQueries({
            queryKey: [`product-${productId}-admin`]
          });
        });
      }
    }
  };

  const handleUpdateProductDrop = async () => {
    if (formsSubmitted.dropForm.pending) {
      if (productDataErrors.drop) {
        setFormsSubmitted((prev) => ({
          ...prev,
          dropForm: { pending: false, success: false }
        }));

        return;
      } else {
        if (
          !productData.name ||
          !productData.price ||
          Object.keys(productData.colors).some(
            (color) => !productData.colors[color]
          ) ||
          !productData.sizes.length ||
          !productData.description ||
          !productData.details ||
          !productData.category ||
          !productData.keywords ||
          !productData.drop
        ) {
          setProductDataErrors((prev) => ({
            ...prev,
            drop: 'Product data is required'
          }));

          return;
        }

        updateProductDrop(productId as string, productData.drop).then(() => {
          setFormsSubmitted((prev) => ({
            ...prev,
            dropForm: { pending: false, success: true }
          }));

          queryClient.invalidateQueries({
            queryKey: [`product-${productId}-admin`]
          });
        });
      }
    }
  };

  const checkProductDataErrors = () => {
    const errors: {
      name: string;
      price: string;
      colors: string;
      sizes: string;
      description: string;
      details: string;
      category: string;
      keywords: string;
      drop: string;
    } = {
      name: '',
      price: '',
      colors: '',
      sizes: '',
      description: '',
      details: '',
      category: '',
      keywords: '',
      drop: ''
    };

    if (!productData.name) errors.name = 'Name is required';

    if (!productData.price) errors.price = 'Price is required';

    if (Object.keys(productData.colors).length === 0)
      errors.colors = 'Colors are required';

    Object.keys(productData.colors).forEach((color) => {
      if (!productData.colors[color]) {
        errors.colors = 'Hex codes are required for all colors';
      }
    });

    if (productData.sizes.length === 0) errors.sizes = 'Sizes are required';

    if (!productData.description)
      errors.description = 'Description is required';

    if (!productData.details) errors.details = 'Details are required';

    if (!productData.category) errors.category = 'Category is required';

    if (!productData.keywords) errors.keywords = 'Keywords are required';

    setProductDataErrors(() => errors);

    setFormsSubmitted((prev) => ({
      ...prev,
      dataForm: { pending: true, success: false }
    }));
  };

  const checkProductDropErrors = () => {
    if (!productData.drop) {
      setProductDataErrors((prev) => ({
        ...prev,
        drop: 'Drop is required'
      }));
    }

    setFormsSubmitted((prev) => ({
      ...prev,
      dropForm: { pending: true, success: false }
    }));
  };

  const extractColorsAndSizes = (variants: Variant[]) => {
    const colors: Set<string> = new Set();
    const sizes: Set<string> = new Set();

    variants.forEach(({ name }) => {
      const [, extractedColorAndSize] = name.split('-');

      if (extractedColorAndSize) {
        let color = '';
        let size = '';

        const extractedColorAndSizeArray = extractedColorAndSize
          .split(' / ')
          .map((str) => str.trim());

        extractedColorAndSizeArray.forEach((extractedColorOrSize) => {
          if (extractedColorOrSize.length >= 3) {
            if (!color) {
              color = extractedColorOrSize;
            } else {
              color += ` / ${extractedColorOrSize}`;
            }
          } else {
            size = extractedColorOrSize;
          }
        });

        if (color) colors.add(color);
        if (size) sizes.add(size);
      }
    });

    return {
      extractedColors: Array.from(colors),
      extractedSizes: Array.from(sizes)
    };
  };

  useEffect(() => {
    if (product) {
      const { extractedColors, extractedSizes } = extractColorsAndSizes(
        product.variants as Variant[]
      );

      setProductData(() => ({
        name: product.name ? product.name : '',

        price: product.price ? product.price : 0,

        colors:
          product.colors && Object.keys(product.colors).length
            ? product.colors
            : extractedColors.reduce(
                (acc: { [key: string]: string }, color) => {
                  const key = color.charAt(0).toUpperCase() + color.slice(1);

                  acc[key] = '';

                  return acc;
                },
                {}
              ) || {},

        sizes:
          product.sizes && product.sizes.length
            ? product.sizes
            : extractedSizes,

        description: product.description ? product.description : '',

        details: product.details ? product.details : '',

        category: product.category ? product.category : '',

        keywords:
          product.keywords && product.keywords.length
            ? product.keywords.join(', ')
            : '',

        drop: product.drop ? (product.drop as Drop).name : ''
      }));
    }
  }, [product]);

  useEffect(() => {
    handleUpdateProductData();
  }, [formsSubmitted.dataForm.pending]);

  useEffect(() => {
    handleUpdateProductDrop();
  }, [formsSubmitted.dropForm.pending]);

  if (isLoadingProduct || isLoadingDrops) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <div>
          <button onClick={() => navigate('/admin/products')}>Back</button>

          <p>Edit Product</p>
        </div>

        <div>
          <p>Name</p>

          <input
            type="text"
            value={productData.name}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                name: e.target.value
              }));
            }}
          />

          {productDataErrors.name ? <p>{productDataErrors.name}</p> : null}
        </div>

        <div>
          <p>Price</p>

          <input
            type="number"
            value={productData.price}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                price: parseInt(e.target.value)
              }));
            }}
          />

          {productDataErrors.price ? <p>{productDataErrors.price}</p> : null}
        </div>

        <div>
          <p>Colors</p>

          {Object.keys(productData.colors).length > 0 ? (
            Object.keys(productData.colors).map((color) => (
              <div key={color}>
                <p>{color}</p>

                <input
                  type="text"
                  value={productData.colors[color].replace(/#/g, '')}
                  onChange={(e) => {
                    setProductData((prev) => ({
                      ...prev,
                      colors: {
                        ...prev.colors,
                        [color]: e.target.value
                      }
                    }));
                  }}
                />
              </div>
            ))
          ) : (
            <div>
              <p>Add Color</p>

              <input
                type="text"
                value={addColor.color}
                onChange={(e) => {
                  setAddColor((prev) => ({
                    ...prev,
                    color: e.target.value
                  }));
                }}
              />

              <input
                type="text"
                value={addColor.hex}
                onChange={(e) => {
                  setAddColor((prev) => ({
                    ...prev,
                    hex: e.target.value
                  }));
                }}
              />

              <button
                onClick={() => {
                  setProductData((prev) => ({
                    ...prev,
                    colors: {
                      ...prev.colors,
                      [addColor.color]: addColor.hex
                    }
                  }));

                  setAddColor(() => ({
                    color: '',
                    hex: ''
                  }));
                }}
              >
                Add
              </button>
            </div>
          )}

          {productDataErrors.colors ? <p>{productDataErrors.colors}</p> : null}
        </div>

        <div>
          {!productData.sizes.length ? (
            <div>
              <p>Sizes</p>

              <p>Add Size</p>

              <input
                type="text"
                value={addSize}
                onChange={(e) => {
                  setAddSize(e.target.value);
                }}
              />

              <button
                onClick={() => {
                  setProductData((prev) => ({
                    ...prev,
                    sizes: [...prev.sizes, addSize]
                  }));

                  setAddSize('');
                }}
              >
                Add
              </button>
            </div>
          ) : null}

          {productDataErrors.sizes ? <p>{productDataErrors.sizes}</p> : null}
        </div>

        <div>
          <p>Description</p>

          <textarea
            value={productData.description}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                description: e.target.value
              }));
            }}
          />

          {productDataErrors.description ? (
            <p>{productDataErrors.description}</p>
          ) : null}
        </div>

        <div>
          <p>Details</p>

          <textarea
            value={productData.details}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                details: e.target.value
              }));
            }}
          />

          {productDataErrors.details ? (
            <p>{productDataErrors.details}</p>
          ) : null}
        </div>

        <div>
          <p>Category</p>

          <select
            value={productData.category}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                category: e.target.value
              }));
            }}
          >
            <option value="">Select Category</option>

            <option value="Tops">Tops</option>

            <option value="Bottoms">Bottoms</option>

            <option value="Accessories">Accessories</option>
          </select>

          {productDataErrors.category ? (
            <p>{productDataErrors.category}</p>
          ) : null}
        </div>

        <div>
          <p>Keywords</p>

          <input
            type="text"
            value={productData.keywords}
            onChange={(e) => {
              setProductData((prev) => ({
                ...prev,
                keywords: e.target.value
              }));
            }}
          />

          {productDataErrors.keywords ? (
            <p>{productDataErrors.keywords}</p>
          ) : null}
        </div>

        <button onClick={checkProductDataErrors}>Update Product Data</button>
      </div>

      <div>
        <p>Drop</p>

        <select
          value={productData.drop}
          onChange={(e) => {
            setProductData((prev) => ({
              ...prev,
              drop: e.target.value
            }));
          }}
        >
          <option value="">Select Drop</option>

          {drops?.map((drop) => (
            <option key={drop._id} value={drop.name}>
              {drop.name}
            </option>
          ))}
        </select>

        <button onClick={checkProductDropErrors}>Update Product Drop</button>

        {productDataErrors.drop ? <p>{productDataErrors.drop}</p> : null}
      </div>
    </div>
  );
}

export default AdminProductEditPage;
