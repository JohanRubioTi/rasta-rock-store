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
       
      } else {
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
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .then((res) => {
                if(res.error){
                    throw new Error(res.error.message)
                } else {
                    return res
                }
            });
      if (error) {
        setError(error);
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
