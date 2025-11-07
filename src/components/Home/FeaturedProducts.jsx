import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { productsAtom } from '../../store/adminAtoms';
import ProductCard from '../Product/ProductCard';
import axios from 'axios';

const FeaturedProducts = () => {
  const [productsData, setProductsData] = useAtom(productsAtom);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProductsData(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [setProductsData]);

  // Ensure productsData is an array before slicing
  const featuredProducts = Array.isArray(productsData) ? productsData.slice(0, 8) : [];

  return (
    <section id="lo-mas-deseado" className="py-12 bg-transparent z-10">
      <div className="container mx-auto px-4">
        <h2 className="text-right font-bold text-3xl uppercase text-white drop-shadow-lg mb-8">
          Exclusivo<br/>Colombia
        </h2>
      </div>
      {/* Use grid-cols-2 on small screens, grid-cols-4 on medium and up */}
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 py-8">Cargando productos destacados...</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
