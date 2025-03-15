import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom } from '../store/adminAtoms';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const location = useLocation();
  const showCategories = location.pathname !== '/products'; // Conditionally show categories

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  }

  return (
    <nav className="sticky top-0 z-50 text-rastaLight font-bold">
      <div className="mx-4 sm:mx-6 lg:mx-8 py-4">
        <div className="flex justify-between items-center w-full">
          {/* Brand */}
          <Link to="/" className="text-3xl font-bold text-rastaGreen nav-link font-rasta-banner-heading uppercase pb-2">Rasta Rock</Link>

          {/* Category Links - Hidden on Product Catalog Page */}
          {showCategories && (
            <ul className="hidden md:flex space-x-6">
              <li>
                <Link to="/products?category=accessories" className="nav-link font-rasta-nav-links uppercase">Accesorios</Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="nav-link font-rasta-nav-links uppercase">Ropa</Link>
              </li>
              <li>
                <Link to="/products?category=smoke-accessories" className="nav-link font-rasta-nav-links uppercase">Accesorios de Fumar</Link>
              </li>
              <li>
                <Link to="/products?category=handmade-decorations" className="nav-link font-rasta-nav-links uppercase">Decoración Artesanal</Link>
              </li>
              <li>
                <Link to="/products?category=piercings" className="nav-link font-rasta-nav-links uppercase">Piercings</Link>
              </li>
            </ul>
          )}

          {/* Dropdown (for smaller screens) */}
          <div className="md:hidden relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="nav-link focus:outline-none font-rasta-nav-links uppercase">
              ☰
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-rastaDark rounded-md shadow-lg py-1">
                <Link to="/products" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links uppercase">Categorías</Link>
                <Link to="/bands" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links uppercase">Bandas</Link>
                {isAuthenticated && user?.isAdmin && <Link to="/admin" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links uppercase">Admin</Link>}
                {isAuthenticated ? (
                  <button onClick={handleLogout} className="block px-4 py-2 text-sm nav-link font-rasta-nav-links uppercase">Logout</button>
                ) : (
                  <Link to="/login" className="block px-4 py-2 text-sm nav-link font-rasta-nav-links uppercase">Login</Link>
                )}
              </div>
            )}
          </div>

          {/* Bands, Admin, and Login/Logout (visible on larger screens) */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/bands" className="nav-link font-rasta-nav-links uppercase">Bandas</Link>
            {isAuthenticated && user?.isAdmin && <Link to="/admin" className="nav-link font-rasta-nav-links uppercase">Admin</Link>}
            {isAuthenticated ? (
              <button onClick={handleLogout} className="nav-link font-rasta-nav-links uppercase">Logout</button>
            ) : (
              <Link to="/login" className="nav-link font-rasta-nav-links uppercase">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
