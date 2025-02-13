import React, { useState, useEffect } from 'react'; // Import useEffect
import { Link, useLocation, useSearchParams } from 'react-router-dom'; // Import useSearchParams and useLocation
import ThreeDScene from '../ThreeDScene'; // Corrected import path (assuming ThreeDScene is in src/components)

const ProductCatalog = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Declare isDropdownOpen state
  const [searchParams, setSearchParams] = useSearchParams(); // Get search params
  const location = useLocation(); // Get current location

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

  const categories = ['all', 'accessories', 'clothing', 'smoke-accessories', 'handmade-decorations', 'piercings'];
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-low-high'); // Default sorting

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory('all'); // Default to 'all' if category is invalid or not present
    }
  }, [searchParams]); // useEffect dependency on searchParams


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
    <div className="bg-rastaDark min-h-screen relative overflow-hidden">
      {/* ThreeDScene as full-page background - FIXED positioning, z-index: 0 - VARIANT 'catalog' */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <ThreeDScene variant="catalog" />
      </div>

      {/* Animated Background - Gradient overlay, z-index: 1 - DIFFERENT GRADIENT DIRECTION */}
      <div className="absolute inset-0 bg-gradient-to-b from-rastaRed via-rastaYellow to-rastaGreen opacity-90 animate-spotlight-move" style={{
          backgroundSize: '200% 200%',
          filter: 'blur(100px)',
          zIndex: 1 // Gradient overlay z-index: 1
      }}></div>

      {/* Product Catalog Content - Relative positioning, z-index: 2 for content */}
      <div className="relative z-10" style={{zIndex: 2}}>
        {/* Navbar - Added to ProductCatalog.jsx, behind background */}
        <nav className="navbar-pill sticky top-4 z-50 mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center w-full"> {/* Always justify-between */}
            {/* Brand - Centered if no categories, otherwise left */}
            <div className={`${location.pathname === '/products' ? 'mx-auto' : ''}`}>
              <Link to="/" className="text-2xl font-bold text-rastaGreen nav-link font-rasta-banner-heading">Rasta Rock</Link>
            </div>


            {/* Category Links - HIDDEN on Product Catalog */}
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

            {/* Bands and Admin (visible on larger screens) */}
            <div className="hidden md:flex space-x-6">
              <Link to="/bands" className="nav-link font-rasta-nav-links nav-link-normal-weight">Bandas</Link>
              <Link to="/admin" className="nav-link font-rasta-nav-links nav-link-normal-weight">Admin</Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          {/* Back to Home Button */}
          <div className="mb-4">
            <Link to="/" className="bg-gray-700 hover:bg-gray-600 text-rastaLight font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300 rasta-button-gradient"> {/* Applied rasta-button-gradient */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              Back to Home
            </Link>
          </div>

          <h1 className="text-3xl font-bold mb-4 font-rasta-heading">Product Catalog</h1>

          {/* Category Navigation */}
          <div className="mb-4 flex space-x-4 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                className={`nav-link font-rasta-nav-links nav-link-normal-weight px-4 py-2 rounded-full rasta-button-gradient ${selectedCategory === category ? 'bg-opacity-90 text-rastaYellow' : 'bg-opacity-50 hover:bg-opacity-70'}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex justify-between items-center mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-700 bg-opacity-50 text-rastaLight rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="bg-gray-700 bg-opacity-50 text-rastaLight rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen rasta-button-gradient"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
              </select>
            </div>
          </div>


          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProducts.map((product) => (
              <div key={product.id} className="rasta-card-gradient p-4 rounded-lg shadow-md product-card-gradient"> {/* Applied product-card-gradient */}
                <Link to={`/products/${product.id}`}>
                  <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-2 rounded" />
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-400">{product.description.substring(0, 50)}...</p>
                  <p className="text-rastaRed font-bold mt-2">${product.price}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;
