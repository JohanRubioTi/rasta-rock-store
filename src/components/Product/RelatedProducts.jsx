import { useRef, useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import useProductPagination from '../../hooks/useProductPagination';

const RelatedProducts = ({ initialProducts = [], categoryId }) => {
  const [page, setPage] = useState(1);
  const loaderRef = useRef(null);
  
  const { data: products, loading, hasMore } = useProductPagination({
    categoryId,
    page,
    perPage: 8
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore]);

  const displayProducts = [...initialProducts, ...products].filter(
    (product, index, self) => 
      index === self.findIndex(p => p.id === product.id)
  );

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 font-rasta-heading">
        Productos Relacionados
      </h2>
      {displayProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
      <div ref={loaderRef} className="h-10 w-full">
        {loading && hasMore && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-rastaYellow border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
