import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductCatalog from './components/Product/ProductCatalog';
import ProductDetail from './components/Product/ProductDetail';
import BandPage from './components/Band/BandPage';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      console.log('Initial user:', user); // Log initial user
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      console.log('Auth state change event:', event, 'Session:', session); // Log auth state changes
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="font-rasta-body">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}> {/* Use ProtectedRoute */}
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/products" element={<ProductCatalog />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/bands" element={<BandPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
