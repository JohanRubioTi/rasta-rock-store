import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

const Filters = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  showMobileFilters,
  setShowMobileFilters
}) => {
  return (
    <>
      {/* Desktop Filters */}
      <div className="col-span-1 hidden md:block">
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="filter-button bg-gray-700 bg-opacity-50 text-rastaLight rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="filter-button price-filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-low-high">Precio: Bajo a Alto</option>
              <option value="price-high-low">Precio: Alto a Bajo</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2 text-left">Filtrar por categoría:</p>
          <div className="flex flex-col space-y-2">
            <button
              key="all"
              className={`nav-link font-rasta-nav-links uppercase w-fit px-3 py-1 rounded-md transition-all duration-300 ${selectedCategory === 'all' ? 'text-rastaGreen bg-gradient-to-r from-[#FF0000]/30 via-[#FFFF00]/20 to-[#00FF00]/10 hover:from-[#FF0000]/40 hover:via-[#FFFF00]/30 hover:to-[#00FF00]/20' : 'hover:bg-gray-700/30'}`}
              onClick={() => setSelectedCategory('all')}
            >
              Todos
            </button>
            {Array.isArray(categories) && categories.map(cat => (
              <button
                key={cat.id}
                className={`nav-link font-rasta-nav-links uppercase w-fit px-3 py-1 rounded-md transition-all duration-300 ${selectedCategory === cat.id ? 'text-rastaGreen bg-gradient-to-r from-[#FF0000]/30 via-[#FFFF00]/20 to-[#00FF00]/10 hover:from-[#FF0000]/40 hover:via-[#FFFF00]/30 hover:to-[#00FF00]/20' : 'hover:bg-gray-700/30'}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Filters */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowMobileFilters(false)}
        ></div>
      )}
      <div className={`fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 transition-transform duration-300 ${showMobileFilters ? 'translate-y-0' : 'translate-y-full'} md:hidden`}>
        <div className="flex justify-between items-center mb-4 flex-wrap">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="filter-button bg-gray-700 bg-opacity-50 text-rastaLight rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="filter-button price-filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price-low-high">Precio: Bajo a Alto</option>
              <option value="price-high-low">Precio: Alto a Bajo</option>
            </select>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2 text-left">Filtrar por categoría:</p>
          <div className="flex flex-col space-y-4">
            <button
              key="all"
              className={`nav-link font-rasta-nav-links uppercase w-fit px-3 py-1 rounded-md transition-all duration-300 ${selectedCategory === 'all' ? 'text-rastaGreen bg-gradient-to-r from-[#FF0000]/30 via-[#FFFF00]/20 to-[#00FF00]/10 hover:from-[#FF0000]/40 hover:via-[#FFFF00]/30 hover:to-[#00FF00]/20' : 'hover:bg-gray-700/30'}`}
              onClick={() => { setSelectedCategory('all'); setShowMobileFilters(false); }}
            >
              Todos
            </button>
            {Array.isArray(categories) && categories.map(cat => (
              <button
                key={cat.id}
                className={`nav-link font-rasta-nav-links uppercase w-fit px-3 py-1 rounded-md transition-all duration-300 ${selectedCategory === cat.id ? 'text-rastaGreen bg-gradient-to-r from-[#FF0000]/30 via-[#FFFF00]/20 to-[#00FF00]/10 hover:from-[#FF0000]/40 hover:via-[#FFFF00]/30 hover:to-[#00FF00]/20' : 'hover:bg-gray-700/30'}`}
                onClick={() => { setSelectedCategory(cat.id); setShowMobileFilters(false); }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => setShowMobileFilters(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Filters;
