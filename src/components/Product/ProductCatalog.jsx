import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useAtom } from 'jotai';
import { adminStateAtom } from '../../store/adminAtoms';
import Navbar from '../Navbar';
import ThreeDScene from '../ThreeDScene';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/solid';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);


  const [adminState] = useAtom(adminStateAtom);
  const productsData = adminState.products;
  const categories = adminState.categories;
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low-high');

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && categories.find(cat => cat.id === urlCategory)) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams, categories]);

  const filteredProducts = productsData.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low-high') {
      return a.price - b.price;
    } else if (sortBy === 'price-high-low') {
      return b.price - a.price;
    }
    return 0;
  });

  return (
    <>
      <div className="min-h-screen relative overflow-hidden">
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
          <ThreeDScene variant="grid" />
        </div>
        <div className="absolute inset-0 bg-dynamic-gradient opacity-90 animate-gradient-move" style={{ backgroundSize: '400% 400%', filter: 'blur(100px)', zIndex: -1 }}></div>

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

            {/* Main Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              {/* Filters (Desktop) */}
              <div className="col-span-1 hidden md:block">
                <div className="flex justify-between items-center mb-4 flex-wrap">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      className="filter-button bg-gray-700 bg-opacity-50 text-rastaLight rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen"
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <select
                      className="filter-button price-filter-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="price-low-high">Precio: Bajo a Alto</option>
                      <option value="price-high-low">Precio: Alto a Bajo</option>
                    </select>
                  </div>
                </div>
                <div className="mb-4 flex flex-col space-y-2 ">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      className={`nav-link font-rasta-nav-links uppercase inline-flex whitespace-nowrap w-fit ${selectedCategory === cat.id ? 'filter-button-active' : ''}`}
                      onClick={() => setSelectedCategory(cat.id)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Listing */}
              <div className="col-span-2 md:col-span-3">
                <div className="grid grid-cols-2 md:gap-4 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {sortedProducts.map((product) => (
                    <Link to={`/products/${product.id}`} className="w-full" key={product.id}>
                      <div className="rasta-card-gradient rasta-card-frame product-card rounded-md hover:shadow-lg flex flex-col h-full overflow-hidden shadow-inner transform hover:scale-105 transition duration-300 w-full sm:w-1/2 md:w-full bouncy-shrink">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-auto flex-grow object-cover rounded-t-md product-image"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400"; }}
                        />
                        <div className="product-card-content px-4 py-2 flex flex-col items-center justify-between flex-grow text-center">
                          <h2 className="product-card-title text-lg mb-1 text-gray-100 overflow-hidden text-ellipsis product-card-readable-title">{product.name}</h2>
                          <p className="font-bold text-gray-300 text-center font-product-card-font">${product.price}</p>
                          <p className="text-gray-400 mt-2 font-rasta-body truncate overflow-hidden text-ellipsis">{product.description}</p>
                        </div>
                        <div className="product-card-buttons space-x-2 relative justify-center">
                          <button className="view-details-button">
                            <EyeIcon className="h-5 w-5 mr-1" />
                            Ver Detalles
                          </button>
                          <button className="add-to-cart-button">
                            <ShoppingCartIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Mobile Filters (Floating) */}
        {showMobileFilters && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowMobileFilters(false)}
          ></div>
        )}
        <div className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 transition-transform duration-300 ${showMobileFilters ? 'translate-y-0' : 'translate-y-full'} md:hidden`}>

          <div className="flex justify-between items-center mb-4 flex-wrap">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="filter-button bg-gray-700 bg-opacity-50 text-rastaLight rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="filter-button price-filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price-low-high">Precio: Bajo a Alto</option>
                <option value="price-high-low">Precio: Alto a Bajo</option>
              </select>
            </div>
          </div>
          <div className="mb-4 flex flex-col space-y-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`nav-link font-rasta-nav-links uppercase inline-flex whitespace-nowrap w-auto ${selectedCategory === cat.id ? 'filter-button-active' : ''}`}
                onClick={() => { setSelectedCategory(cat.id); setShowMobileFilters(false); }}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowMobileFilters(false)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </button>
        </div>

      </div>
    </>
  );
};

export default ProductCatalog;
