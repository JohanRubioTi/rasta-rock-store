import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useProductPagination = ({ categoryId, page = 1, perPage = 8 }) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('products')
        .select('*, image_urls')
        .range((page - 1) * perPage, page * perPage - 1)
        .limit(perPage);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data: products, error } = await query;

      if (error) {
        setError(error);
        console.error('Error fetching products:', error);
      } else {
        setData(products);
        setAllData(prev => page === 1 ? products : [...prev, ...products]);
        setHasMore(products.length === perPage);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId, page, perPage]);

  return {
    data: allData,
    loading,
    error,
    hasMore,
    fetchProducts
  };
};

export default useProductPagination;
