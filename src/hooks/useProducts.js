import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('products').select('*, image_urls');
      if (error) {
        setError(error);
        console.error('Error fetching products:', error);
      } else {
        console.log('Fetched products data:', data);
        setProducts(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('categories').select('*');
      if (error) {
        setError(error);
        console.error('Error fetching categories:', error);
      } else {
        setCategories(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    fetchProducts,
    fetchCategories,
    setProducts,
    setCategories,
  };
};

export default useProducts;
