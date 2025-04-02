import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch the main product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (productError) throw productError;
        if (!productData) throw new Error('Product not found');

        setProduct(productData);

        // Fetch related products (same category)
        if (productData.category) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('products')
            .select('*')
            .eq('category', productData.category)
            .neq('id', productId)
            .limit(4);

          if (!relatedError) setRelatedProducts(relatedData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  return { product, relatedProducts, loading, error };
};

export default useProductDetail;
