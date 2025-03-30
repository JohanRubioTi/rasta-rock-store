import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductCatalog from './components/Product/ProductCatalog';
import ProductDetail from './components/Product/ProductDetail';
import BandPage from './components/Band/BandPage';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import DataInitializer from './components/DataInitializer';
import { supabase } from './supabaseClient';

function AppContent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
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
            <ProtectedRoute user={user}>
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

function App() {
  return (
    <Provider>
      <DataInitializer>
        <AppContent />
      </DataInitializer>
    </Provider>
  );
}

export default App;
