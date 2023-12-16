import { Product } from '../types';

function useSelectedProduct() {
  const sessionStorageSelectedProduct =
    sessionStorage.getItem('selectedProduct');
  let parsedSelectedProduct = sessionStorageSelectedProduct
    ? JSON.parse(sessionStorageSelectedProduct)
    : null;

  function getSelectedProduct() {
    return parsedSelectedProduct;
  }

  function setSelectedProduct(item: Product) {
    parsedSelectedProduct = item;

    sessionStorage.setItem(
      'selectedProduct',
      JSON.stringify(parsedSelectedProduct)
    );
  }

  return { getSelectedProduct, setSelectedProduct };
}

export default useSelectedProduct;
