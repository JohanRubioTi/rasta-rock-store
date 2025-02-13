import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThreeDScene from './ThreeDScene'; // Import ThreeDScene

const Home = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const productsData = [
    { id: 1, name: 'Rasta Beanie', description: 'Warm and stylish Rasta beanie.', price: 25, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
    { id: 2, name: 'Bob Marley Tee', description: 'Classic Bob Marley t-shirt.', price: 30, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
    { id: 3, name: 'Peace Sign Necklace', description: 'Elegant peace sign necklace.', price: 15, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
    { id: 4, name: 'Rasta Bracelet Set', description: 'Colorful Rasta bracelet set.', price: 20, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
    { id: 5, name: 'Rolling Papers - King Size', description: 'King size rolling papers.', price: 5, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
    { id: 6, name: 'Herb Grinder', description: 'High-quality herb grinder.', price: 35, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
    { id: 7, name: 'Handmade Rasta Coasters', description: 'Set of handmade Rasta coasters.', price: 22, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
    { id: 8, name: 'Rasta Wall Hanging', description: 'Vibrant Rasta wall decoration.', price: 40, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
    { id: 9, name: 'Nose Piercing - Gold', description: 'Gold nose piercing.', price: 18, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
    { id: 10, name: 'Ear Piercing - Silver Hoops', description: 'Silver hoop ear piercings.', price: 28, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
  ];

  const featuredProducts = productsData.slice(0, 8);

  return (
    <>
      {/* THIS FRAGMENT IS CORRECTLY OPENED HERE */}
      <div className="min-h-screen relative overflow-hidden"> {/* Removed bg-rastaDark from here */}
        {/* ThreeDScene as full-page background - FIXED positioning, z-index: 0 */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
          <ThreeDScene />
        </div>

        {/* Animated Background - Still keep the gradient overlay for visual depth, z-index: -1 (behind 3D scene) */}
        <div className="absolute inset-0 bg-gradient-to-r from-rastaRed via-rastaYellow to-rastaGreen opacity-90 animate-spotlight-move" style={{
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
          zIndex: -1 // Gradient overlay z-index: -1 (behind 3D scene)
        }}></div>

        {/* Hero Banner Container - Relative positioning, z-index: 2 for content */}
        <div className="relative z-10" style={{ zIndex: 2 }}> {/* z-index: 2 for content sections */}
          {/* Navbar - Added to Home.jsx, behind background */}
          <div className="mx-4 sm:mx-6 lg:mx-8"> {/* Container for horizontal margin */}
            <nav className="navbar-pill sticky top-4 z-50">
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
          </div>

          {/* Hero Banner */}
          <div className="container mx-auto p-8 text-center relative overflow-hidden" style={{ zIndex: 2 }}> {/* z-index: 2 for content sections */}
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
          <div className="container mx-auto p-4" style={{ zIndex: 2 }}> {/* z-index: 2 for content sections */}
            <div className="relative rounded-lg overflow-hidden shadow-lg rasta-card-gradient"> {/* Applied rasta-card-gradient to section */}
              <div className="absolute inset-0 bg-gradient-to-br from-rastaYellow to-rastaRed opacity-50 blur-sm"></div> {/* Reduced opacity and blur for subtle effect */}
              <div className="relative z-10 p-6">
                <h2 className="text-3xl font-bold text-rastaLight mb-4 text-shadow font-rasta-heading text-center text-rastaYellow">Descubre lo Nuevo y lo Más Deseado</h2> {/* Highlighted heading with rastaYellow */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"> {/* Increased gap for better spacing */}
                  {featuredProducts.map((product) => (
                    <div key={product.id} className="rasta-card-gradient rounded-md text-rastaLight hover:shadow-lg hover:bg-gray-600 transition duration-300 flex flex-col items-center"> {/* Flex column layout & items-center */}
                      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover rounded-t-md mb-3" /> {/* Increased image height and margin */}
                      <div className="px-4 py-2 flex flex-col justify-between flex-grow text-center"> {/* Reduced padding, px-4 py-2 and text-center */}
                        <div>
                          <h2 className="product-card-readable-title text-lg mb-1">{product.name}</h2> {/* Product Name with new class */}
                          <p className="text-rastaRed font-bold">${product.price}</p>
                        </div>
                        <Link to={`/products/${product.id}`} className="rasta-button-gradient font-bold py-1 px-3 rounded-full text-xs uppercase tracking-wider transition duration-300 inline-block mt-2"> {/* Smaller button and margin, removed self-start */}
                          View
                        </Link>
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
    // THIS FRAGMENT IS CORRECTLY CLOSED HERE
  );
};

export default Home;
