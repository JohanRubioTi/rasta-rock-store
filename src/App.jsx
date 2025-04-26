import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/Admin/AdminDashboard';
import BandPage from './components/Band/BandPage';
import ProtectedRoute from './components/ProtectedRoute';
import { supabase } from './supabaseClient';
import { CartFAB } from './components/Cart';
import CartView from './components/Cart/CartView';

import ProductDetail from './components/Product/ProductDetail';
function AppContent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="font-rasta-body relative">
      <CartFAB />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/bands" element={<BandPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartView />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider>
        <AppContent />
    </Provider>
  );
}

export default App;
