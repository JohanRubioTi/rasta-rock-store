import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeDScene from './ThreeDScene'; // Import ThreeDScene

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="bg-rastaDark min-h-screen relative overflow-hidden">
      {/* ThreeDScene as full-page background - FIXED positioning, z-index: 0 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <ThreeDScene />
      </div>

      {/* Animated Background - Still keep the gradient overlay for visual depth, z-index: 1 */}
      <div className="absolute inset-0 bg-gradient-to-r from-rastaRed via-rastaYellow to-rastaGreen opacity-90 animate-spotlight-move" style={{
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
          zIndex: 1 // Gradient overlay z-index: 1
      }}></div>

      {/* Hero Banner Container - Relative positioning, z-index: 2 for content */}
      <div className="relative z-10" style={{zIndex: 2}}> {/* z-index: 2 for content sections */}
          {/* Navbar - Added to Home.jsx, behind background */}
          <nav className="navbar-pill sticky top-4 z-50 mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center w-full">
              {/* Brand */}
              <Link to="/" className="text-2xl font-bold text-rastaGreen nav-link font-rasta-banner-heading">Rasta Rock</Link>

              {/* Category Links - Visible on Homepage */}
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

              {/* Dropdown (for smaller screens) */}
              <div className="md:hidden relative">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="nav-link focus:outline-none font-rasta-nav-links nav-link-normal-weight">
                  ☰ {/* Placeholder icon */}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-rastaDark rounded-md shadow-lg py-1">
                    <Link to="/products" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links nav-link-normal-weight">Categories</Link>
                    <Link to="/bands" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links nav-link-normal-weight">Bandas</Link>
                    <Link to="/admin" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links nav-link-normal-weight">Admin</Link>
                  </div>
                )}
              </div>

              {/* Bands and Admin (visible on larger screens) */}
              <div className="hidden md:flex space-x-6">
                <Link to="/bands" className="nav-link font-rasta-nav-links nav-link-normal-weight">Bandas</Link>
                <Link to="/admin" className="nav-link font-rasta-nav-links nav-link-normal-weight">Admin</Link>
              </div>
            </div>
        </nav>

        {/* Hero Banner */}
        <div className="container mx-auto p-8 text-center relative overflow-hidden" style={{zIndex: 2}}> {/* z-index: 2 for content sections */}
            {/* ThreeDScene as background - Absolute positioning */}
            <div className="absolute inset-0">
                {/* <ThreeDScene /> - No need to render ThreeDScene here again, it's already full page */}
            </div>

            {/* Hero Banner Content - Relative positioning, on top of 3D scene */}
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-rastaLight uppercase tracking-wider leading-none font-rasta-banner-heading">
                    <span className="block text-shadow-rasta">¡Vibra Alto!</span>
                    <span className="block text-shadow-rasta">Con Rasta Rock</span>
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-rastaLight mt-4 mb-10 text-shadow">
                    Encuentra los accesorios y la moda más auténtica.
                </p>
                <a href="/products" className="rasta-button-gradient font-bold py-4 px-10 rounded-full text-lg uppercase tracking-wider transition duration-300"> {/* Applied rasta-button-gradient */}
                    Explora Ahora
                </a>
            </div>
        </div>

        {/* New Section - Novedades y Destacados */}
        <div className="container mx-auto p-4" style={{zIndex: 2}}> {/* z-index: 2 for content sections */}
          <div className="relative rounded-lg overflow-hidden shadow-lg rasta-card-gradient product-card-gradient"> {/* Applied product-card-gradient to section */}
            <div className="absolute inset-0 bg-gradient-to-br from-rastaYellow to-rastaRed opacity-50 blur-sm"></div> {/* Reduced opacity and blur for subtle effect */}
            <div className="relative z-10 p-6">
              <h2 className="text-3xl font-bold text-rastaLight mb-4 text-shadow font-rasta-heading text-center text-rastaYellow">Descubre lo Nuevo y lo Más Deseado</h2> {/* Highlighted heading with rastaYellow */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"> {/* Increased gap for better spacing */}
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 1</div> {/* Applied rasta-card-gradient to product cards */}
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 2</div>
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 3</div>
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 4</div>
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 5</div>
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 6</div>
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 7</div>
                <div className="rasta-card-gradient p-6 rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 product-card-gradient">Product 8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
