import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import Navbar from '../Navbar';
import ThreeDScene from '../ThreeDScene';

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const productsData = [
    { id: 1, name: 'Gorro Rasta', description: 'Gorro Rasta cálido y estiloso.', price: 25, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
    { id: 2, name: 'Camiseta Bob Marley', description: 'Camiseta clásica de Bob Marley.', price: 30, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
    { id: 3, name: 'Collar Signo de la Paz', description: 'Elegante collar con signo de la paz.', price: 15, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
    { id: 4, name: 'Set de Pulseras Rasta', description: 'Set de pulseras Rasta coloridas.', price: 20, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
    { id: 5, name: 'Papel de Liar - Tamaño King', description: 'Papel de liar tamaño king.', price: 5, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
    { id: 6, name: 'Grinder de Hierbas', description: 'Grinder de hierbas de alta calidad.', price: 35, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
    { id: 7, name: 'Posavasos Rasta Hechos a Mano', description: 'Set de posavasos Rasta hechos a mano.', price: 22, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
    { id: 8, name: 'Tapiz Rasta', description: 'Vibrante decoración de pared Rasta.', price: 40, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
    { id: 9, name: 'Piercing de Nariz - Oro', description: 'Piercing de nariz de oro.', price: 18, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
    { id: 10, name: 'Piercing de Oreja - Aros de Plata', description: 'Piercings de oreja de aros de plata.', price: 28, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
  ];

  const categories = ['all', 'accessories', 'clothing', 'smoke-accessories', 'handmade-decorations', 'piercings'];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low-high');

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

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

        <div className="absolute inset-0 bg-dynamic-gradient opacity-90 animate-gradient-move" style={{
          backgroundSize: '400% 400%',
          filter: 'blur(100px)',
          zIndex: -1
        }}></div>

        <div className="relative z-10" style={{ zIndex: 2 }}>
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

            <div className="mb-4 flex space-x-4 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  className={`nav-link font-rasta-nav-links uppercase ${selectedCategory === category ? 'filter-button-active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'Todos' :
                    category === 'accessories' ? 'Accesorios' :
                      category === 'clothing' ? 'Ropa' :
                        category === 'smoke-accessories' ? 'Accesorios de Fumar' :
                          category === 'handmade-decorations' ? 'Decoración Artesanal' :
                            category === 'piercings' ? 'Piercings' : ''}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mb-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {sortedProducts.map((product) => (
<div key={product.id} className="rasta-card-gradient rounded-md hover:shadow-lg flex flex-col h-72 overflow-hidden shadow-inner transform hover:scale-105 transition duration-300">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-md mb-3"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150" }} // Placeholder image
                  />
                  <div className="px-4 py-2 flex flex-col items-center justify-center flex-grow text-center">
                    <h2 className="product-card-title text-lg mb-1 text-gray-100 truncate">{product.name}</h2>
                    <p className="font-bold text-gray-300">${product.price}</p>
                    <div className="flex flex-col space-y-2 mt-4"> {/* Vertical button layout */}
                      <Link to={`/products/${product.id}`} className="view-button p-3 bg-gray-700 hover:bg-gray-600 text-center rounded-md block"> {/* Full width button and text-center */}
                         Ver Detalles
                      </Link>
                      <button className="bg-rastaGreen hover:bg-rastaGreen-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 flex items-center justify-center"> {/* Full width cart button */}
                        Añadir al Carrito
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCatalog;
