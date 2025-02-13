import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // Import useLocation
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductCatalog from './components/Product/ProductCatalog';
import ProductDetail from './components/Product/ProductDetail';
import BandPage from './components/Band/BandPage';
import Home from './components/Home';

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); // Get current location

  return (
    <div className="font-rasta-body">
      {/* Navbar REMOVED from App.jsx - now in Home and ProductCatalog */}


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/bands" element={<BandPage />} />
      </Routes>
    </div>
  );
}

export default App;
