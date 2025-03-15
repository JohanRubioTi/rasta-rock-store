import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { useAtom } from 'jotai';
import { userAtom, isAuthenticatedAtom } from '../store/adminAtoms';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    // Hardcoded credentials for demonstration purposes
    if (username === 'admin' && password === 'password') {
      setUser({ username: 'admin', isAdmin: true });
      setIsAuthenticated(true);
    } else if (username === 'user' && password === 'password') {
      setUser({ username: 'user', isAdmin: false });
      setIsAuthenticated(true);
    } else {
      setError('Invalid credentials');
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
            <label htmlFor="username" className="block mb-1 font-semibold">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="price-filter-select block w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">Contraseña:</label>
            <div className="relative">
              <input
                type={isPasswordVisible ? 'text' : 'password'} // Toggle input type
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="price-filter-select block w-full pr-10" // Add padding for icon
              />
              <button
                type="button" // Prevent form submission
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {isPasswordVisible ? (
                  <span>👁️</span> // Visible icon (replace with actual icon later)
                ) : (
                  <span>🔒</span> // Hidden icon (replace with actual icon later)
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
