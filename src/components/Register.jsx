import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    } else {
      // Redirect to some welcome or verify email page
      navigate('/login'); // Or any other appropriate route after signup
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="kyrie-gradient text-rastaLight min-h-screen flex items-center justify-center">
      <div className="rasta-card-frame bg-black bg-opacity-75 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-rastaGreen font-rasta-banner-heading uppercase">Registrarse</h2>
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
          <div>
            <label htmlFor="confirmPassword" className="block mb-1 font-semibold">Confirmar Contraseña:</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-center">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-rastaYellow hover:underline">Iniciar Sesión</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
