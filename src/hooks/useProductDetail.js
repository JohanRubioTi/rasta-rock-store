import { useState, useEffect } from 'react';
import axios from 'axios';

const useProductDetail = (productId) => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}/related`);
        setRelatedProducts(response.data);
      } catch (err) {
        console.error('Error fetching related products:', err);
      }
    };

    fetchProductData();
    fetchRelatedProducts();
  }, [productId]);

  return { product, relatedProducts, loading, error };
};

export default useProductDetail;
