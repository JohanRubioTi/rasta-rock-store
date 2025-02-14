import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeDScene from './ThreeDScene';

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
    <>
      <div className="min-h-screen relative overflow-hidden">
        {/* Contenedor de Fondo */}
        <div className="absolute inset-0">
          <ThreeDScene variant="original" />
          {/* Fondo Animado - Superposición de Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-rastaRed via-rastaYellow to-rastaGreen opacity-90 animate-spotlight-move" style={{
            backgroundSize: '200% 200%',
            filter: 'blur(100px)',
            zIndex: -1
          }}></div>
        </div>

        {/* Contenedor del Banner Principal - Posicionamiento relativo, z-index: 2 para el contenido */}
        <div className="relative z-10" style={{ zIndex: 2 }}>
          {/* Barra de Navegación */}
          <div className="mx-4 sm:mx-6 lg:mx-8">
            <nav className="navbar-pill sticky top-4 z-50">
              <div className="flex justify-between items-center w-full">
                {/* Marca */}
                <Link to="/" className="text-2xl font-bold text-rastaGreen nav-link font-rasta-banner-heading">Rasta Rock</Link>

                {/* Enlaces de Categoría - Visibles en la Página de Inicio */}
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

                {/* Desplegable (para pantallas más pequeñas) */}
                <div className="md:hidden relative">
                  <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="nav-link focus:outline-none font-rasta-nav-links nav-link-normal-weight">
                    ☰
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-rastaDark rounded-md shadow-lg py-1">
                      <Link to="/products" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links nav-link-normal-weight">Categorías</Link>
                      <Link to="/bands" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links nav-link-normal-weight">Bandas</Link>
                      <Link to="/admin" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links nav-link-normal-weight">Admin</Link>
                    </div>
                  )}
                </div>

                {/* Bandas y Admin (visibles en pantallas más grandes) */}
                <div className="hidden md:flex space-x-6">
                  <Link to="/bands" className="nav-link font-rasta-nav-links nav-link-normal-weight">Bandas</Link>
                  <Link to="/admin" className="nav-link font-rasta-nav-links nav-link-normal-weight">Admin</Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Banner Principal */}
          <div className="container mx-auto p-8 text-center relative overflow-hidden" style={{ zIndex: 2 }}>
            {/* Contenido del Banner Principal */}
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-rastaLight uppercase tracking-wider leading-none font-rasta-banner-heading">
                <span className="block text-shadow-rasta">¡Vibra Alto!</span>
                <span className="block text-shadow-rasta">Con Rasta Rock</span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-rastaLight mt-4 mb-10 text-shadow">
                Encuentra los accesorios y la moda más auténtica.
              </p>
              <a href="/products" className="rasta-button-gradient font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider transition duration-300">
                Explora Ahora
              </a>
            </div>
          </div>

          {/* Nueva Sección - Novedades y Destacados */}
          <div className="container mx-auto p-4" style={{ zIndex: 2 }}>
            <div className="relative rounded-lg overflow-hidden shadow-lg bg-opacity-70" style={{
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.4))'
            }}>
              <div className="relative z-10 p-6">
                <h2 className="text-3xl font-bold text-rastaLight mb-4 text-shadow font-rasta-heading text-center text-rastaYellow">Descubre lo Nuevo y lo Más Deseado</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="rasta-card-gradient rounded-md text-rastaLight hover:shadow-lg transition duration-300 flex flex-col items-center">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover rounded-t-md mb-3" />
                      <div className="px-4 py-2 flex flex-col justify-between flex-grow text-center">
                        <div>
                          <h2 className="product-card-readable-title text-lg mb-1">{product.name}</h2>
                          <p className="text-rastaRed font-bold">${product.price}</p>
                        </div>
                        {/* Button Container for Consistent Alignment */}
                        <div className="mt-2">
                        <Link to={`/products/${product.id}`} className="bg-rastaGreen-500 hover:bg-rastaGreen-700 text-white font-bold py-2 px-4 rounded-full text-sm uppercase tracking-wider transition duration-300 inline-block mt-2">
                          Ver
                        </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
