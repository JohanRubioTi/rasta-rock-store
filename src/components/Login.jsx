import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Redirect to admin if session exists
        navigate('/admin');
      }
    };

    checkExistingSession();
  }, [navigate]); // Add navigate as dependency

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
    } else {
      // Redirect to admin page on successful login
      navigate('/admin');
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="kyrie-gradient text-rastaLight min-h-screen flex items-center justify-center">
      <div className="rasta-card-frame bg-black bg-opacity-75 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-rastaGreen font-rasta-banner-heading uppercase">Login / Registrarse</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="price-filter-select block w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">Contraseña:</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="price-filter-select block w-full pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {isPasswordVisible ? (
                  <span>👁️</span>
                ) : (
                  <span>🔒</span>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="view-details-button w-full"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta? <Link to="/register" className="text-rastaYellow hover:underline">Registrarte</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
