import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
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

        <div className="absolute inset-0 bg-gradient-to-b from-rastaRed via-rastaYellow to-rastaGreen opacity-90 animate-spotlight-move" style={{
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
          zIndex: -1
        }}></div>

        <div className="relative z-10" style={{ zIndex: 2 }}>
          <div className="mx-4 sm:mx-6 lg:mx-8">
            <nav className="navbar-pill sticky top-4 z-50">
              <div className="flex justify-between items-center w-full">
                <div className={`${location.pathname === '/products' ? 'mx-auto' : ''}`}>
                  <Link to="/" className="text-2xl font-bold text-rastaGreen nav-link font-rasta-banner-heading">Rasta Rock</Link>
                </div>

                {location.pathname !== '/products' && (
                  <ul className="hidden md:flex space-x-6">
                    <li>
                      <Link to="/products?category=accessories" className="nav-link font-rasta-nav-links nav-link-normal-weight">Accesorios</Link>
                    </li>
                    <li>
                      <Link to="/products?category=clothing" className="nav-link font-rasta-nav-links nav-link-normal-weight">Ropa</Link>
                    </li>
                    <li>
                      <Link to="/products?category=smoke-accessories" className="nav-link font-rasta-nav-links nav-link-normal-weight">Accesorios de Fumar</Link>
                    </li>
                    <li>
                      <Link to="/products?category=handmade-decorations" className="nav-link font-rasta-nav-links nav-link-normal-weight">Decoración Artesanal</Link>
                    </li>
                    <li>
                      <Link to="/products?category=piercings" className="nav-link font-rasta-nav-links nav-link-normal-weight">Piercings</Link>
                    </li>
                  </ul>
                )}

                <div className="hidden md:flex space-x-6">
                  <Link to="/bands" className="nav-link font-rasta-nav-links nav-link-normal-weight">Bandas</Link>
                  <Link to="/admin" className="nav-link font-rasta-nav-links nav-link-normal-weight">Admin</Link>
                </div>
              </div>
            </nav>
          </div>

          <div className="container mx-auto p-4">
            <div className="mb-4">
              <Link to="/" className="back-to-home-button">
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
                  className={`filter-button ${selectedCategory === category ? 'filter-button-active' : ''}`}
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
                  className="bg-gray-700 bg-opacity-50 text-rastaLight rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="price-filter-select"
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
                <div key={product.id} className="rasta-card-gradient rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 flex flex-col">
                  <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover rounded-t-md mb-3" />
                  <div className="px-4 py-2 flex flex-col justify-between flex-grow">
                    <div>
                      <h2 className="product-card-title text-lg mb-1">{product.name}</h2>
                      <p className="text-rastaRed font-bold">${product.price}</p>
                    </div>
                    {/* Button Container for Consistent Alignment */}
                    <div className="mt-2 flex items-center justify-between">
                      <Link to={`/products/${product.id}`} className="view-button">
                        Ver
                      </Link>
                      <button className="bg-rastaGreen hover:bg-rastaGreen-700 text-white font-bold py-2 px-3 rounded-full transition duration-300 flex items-center justify-center"> {/* Increased padding */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
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
