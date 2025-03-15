import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import ThreeDScene from './ThreeDScene';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/solid';

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const featuredProducts = productsData.slice(0, 8);

  return (
    <div className="relative overflow-x-hidden">
      {/* Fondo Animado - Superposición de Gradiente */}
      <div className="absolute inset-0 opacity-95 animate-rasta-radial" style={{
        backgroundImage: 'radial-gradient(circle at center, #E03A3E, #F7D046, #34B44A, #F7D046, #E03A3E)',
        backgroundSize: '300% 300%',
        filter: 'blur(50px)',
        zIndex: -1
      }}></div>

      <div className="min-h-screen relative">
        {/* Navbar */}
        <Navbar />

        {/* ThreeDScene as the background */}
        <div className="fixed inset-0" style={{ zIndex: -1 }}>
          <ThreeDScene variant="original" />
        </div>

        {/* Subheader and CTA */}
        <div className="absolute bottom-24 md:bottom-32 lg:bottom-40 left-1/2 transform -translate-x-1/2">
            <div className="container mx-auto p-8 text-center">
                <h1 className="sr-only">
                    Rasta Rock Store
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-rastaLight mt-4 mb-8 text-shadow rasta-body">
                    Encuentra los accesorios y la moda más auténtica.
                </p>

                {/* Animated Arrow Container */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2" style={{ zIndex: 0 }}>
                  <a href="#lo-mas-deseado" className="flex justify-center animate-ping">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M5 12l7 7 7-7"/>
                      </svg>
                  </a>
                </div>

                <div>
                    <Link to="/products" className="font-bold py-4 px-8 rounded-full text-lg uppercase tracking-wider transition-duration-500 animate-gradient-shift
                                               bg-gradient-to-r from-rastaYellow to-rastaGreen-500 bg-clip-border hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-400 focus:ring-opacity-75 transform hover:scale-105 motion-reduce:transform-none
                                               text-white shadow-md hover:shadow-lg border border-rastaYellow bg-opacity-90 font-sans"
                                               style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite', zIndex: 1, marginBottom: '2rem' }}>
                        Explora Ahora
                    </Link>
                </div>
            </div>
        </div>
      </div>
      <section id="lo-mas-deseado" className="py-12 bg-transparent z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-right font-bold text-3xl uppercase">
            Exclusivo<br/>Colombia
          </h2>
        </div>
        <div className="container mx-auto px-8 mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
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
      </section>
      <section className="py-4 bg-transparent text-center z-10">
        <p className="text-lg md:text-xl lg:text-2xl text-white mt-2 mb-4 text-shadow">
          ¡Aprovecha ofertas exclusivas en Colombia y renueva tu estilo hoy!
        </p>
      </section>
    </div>
  );
};

export default Home;
