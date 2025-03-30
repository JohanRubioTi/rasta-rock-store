import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAtom } from 'jotai';
import { productsAtom, categoriesAtom } from '../../store/adminAtoms';
import useProductFilters from '../../hooks/useProductFilters';
import Navbar from '../Navbar';
import ThreeDScene from '../ThreeDScene';
import ProductCard from './ProductCard';
import Filters from './Filters';

const ProductCatalog = () => {
  const [productsData] = useAtom(productsAtom);
  const [categories] = useAtom(categoriesAtom);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  console.log('Selected category:', selectedCategory);
  console.log('Categories:', categories);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low-high');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { sortedProducts } = useProductFilters({
    key: `${selectedCategory}-${searchTerm}-${sortBy}`, // Force re-render when filters change
    productsData,
    categories,
    searchTerm,
    selectedCategory,
    sortBy,
    setLoading,
    setError
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <ThreeDScene variant="grid" />
      </div>
      <div className="absolute inset-0 bg-dynamic-gradient opacity-70 animate-gradient-move" style={{ backgroundSize: '400% 400%', filter: 'blur(100px)', zIndex: -1 }}></div>

      <div className="relative z-10">
        <Navbar />

        <div className="container mx-auto p-4">
          <div className="mb-4">
            <Link to="/" className="nav-link inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              Volver a Inicio
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4 font-rasta-heading">Catálogo de Productos</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Filters 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              showMobileFilters={showMobileFilters}
              setShowMobileFilters={setShowMobileFilters}
            />

            <div className="col-span-2 md:col-span-3">
              <div className="grid grid-cols-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="rasta-card-frame rounded-md animate-pulse h-80 bg-gray-700 bg-opacity-50"></div>
                  ))
                ) : error ? (
                  <div className="col-span-3 text-center py-8 border border-rastaRed rounded-md">
                    <strong className="text-rastaRed">Error:</strong> Failed to load products
                  </div>
                ) : sortedProducts.length === 0 ? (
                  <div className="col-span-3 text-center py-16 text-gray-400">
                    No products found matching your criteria
                  </div>
                ) : (
                  sortedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
