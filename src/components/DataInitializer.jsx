import { useEffect } from 'react';
import { useSetAtom } from 'jotai';
import { productsAtom, categoriesAtom } from '../store/adminAtoms';
import useProducts from '../hooks/useProducts';

const DataInitializer = ({ children }) => {
  const setProducts = useSetAtom(productsAtom);
  const setCategories = useSetAtom(categoriesAtom);
  const { products, categories, loading, error } = useProducts();

  useEffect(() => {
    if (!loading && !error && products && categories) {
      setProducts(products);
      setCategories(categories);
    }
  }, [products, categories, loading, error, setProducts, setCategories]);

  return children;
};

export default DataInitializer;
