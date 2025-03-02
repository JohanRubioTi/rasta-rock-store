import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import ThreeDScene from '../ThreeDScene';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';


const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const productsData = [
     {
      id: 1,
      name: 'Gorro Rasta',
      subtitle: 'GR-001',
      description: 'Gorro Rasta cálido y estiloso.',
      price: 25,
      images: [
        'https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      category: 'clothing',
      colors: ['Red', 'Yellow', 'Green', 'Black'],
      hasSizes: true,
      details: 'Este gorro Rasta está hecho de lana 100% y es perfecto para mantenerte abrigado en climas fríos. Su diseño clásico y colores vibrantes lo hacen un accesorio ideal para cualquier amante del estilo Rasta.',
      specifications: {
        material: 'Lana',
        weight: '100g',
        dimensions: '20cm x 25cm',
      },
    },
    {
      id: 2,
      name: 'Camiseta Bob Marley',
      description: 'Camiseta clásica de Bob Marley.',
      price: 30,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'clothing',
      colors: ['Black'],
      hasSizes: true,
      details: 'Placeholder',
      specifications: {
        material: 'Algodón',
      },
    },
    {
      id: 3,
      name: 'Collar Signo de la Paz',
      description: 'Elegante collar con signo de la paz.',
      price: 15,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'accessories',
      colors: ['Silver'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Aleación',
      },
    },
    {
      id: 4,
      name: 'Set de Pulseras Rasta',
      description: 'Set de pulseras Rasta coloridas.',
      price: 20,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'accessories',
      colors: ['Red', 'Yellow', 'Green', 'Black'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Hilo',
      },
    },
    {
      id: 5,
      name: 'Papel de Liar - Tamaño King',
      description: 'Papel de liar tamaño king.',
      price: 5,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'smoke-accessories',
      colors: ['White'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Papel',
      },
    },
    {
      id: 6,
      name: 'Grinder de Hierbas',
      description: 'Grinder de hierbas de alta calidad.',
      price: 35,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'smoke-accessories',
      colors: ['Black'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Metal',
      },
    },
    {
      id: 7,
      name: 'Posavasos Rasta Hechos a Mano',
      description: 'Set de posavasos Rasta hechos a mano.',
      price: 22,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'handmade-decorations',
      colors: ['Red', 'Yellow', 'Green', 'Black'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Madera',
      },
    },
    {
      id: 8,
      name: 'Tapiz Rasta',
      description: 'Vibrante decoración de pared Rasta.',
      price: 40,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'handmade-decorations',
      colors: ['Red', 'Yellow', 'Green', 'Black'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Tela',
      },
    },
    {
      id: 9,
      name: 'Piercing de Nariz - Oro',
      description: 'Piercing de nariz de oro.',
      price: 18,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'piercings',
      colors: ['Gold'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Oro',
      },
    },
    {
      id: 10,
      name: 'Piercing de Oreja - Aros de Plata',
      description: 'Piercings de oreja de aros de plata.',
      price: 28,
      images: ['https://via.placeholder.com/400',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',],
      category: 'piercings',
      colors: ['Silver'],
      hasSizes: false,
      details: 'Placeholder',
      specifications: {
        material: 'Plata',
      },
    },
  ];

  const product = productsData.find(p => p.id === productId);
  const placeholderImage = 'https://via.placeholder.com/400';

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const handleImageClick = (index) => {
    setSelectedImage(index);
  };

    const nextImage = () => {
    setSelectedImage((prevImage) => (prevImage + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prevImage) => (prevImage - 1 + product.images.length) % product.images.length);
  };

  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, 4);

  return (
    <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
          <ThreeDScene variant="grid" />
        </div>

        <div className="absolute inset-0 bg-dynamic-gradient opacity-90 animate-gradient-move" style={{
          backgroundSize: '400% 400%',
          filter: 'blur(100px)',
          zIndex: -1
        }}></div>

      <Navbar />
      <div className="container mx-auto p-4 relative z-10">
        <div className="mb-4">
          <Link to="/products" className="nav-link inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            Volver al Catálogo
          </Link>
        </div>

        <div className="rasta-card-gradient p-6 rounded-lg shadow-lg product-card-gradient flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 md:pr-6 flex flex-col items-center">
            <div className="relative w-full" style={{ paddingTop: '100%' }}>
                <img
                src={product.images[selectedImage] || placeholderImage}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                />
                <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                onClick={prevImage}
                >
                <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
                onClick={nextImage}
                >
                <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="flex space-x-2 mt-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image || placeholderImage}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-md cursor-pointer hover:opacity-75 transition duration-300"
                  onClick={() => handleImageClick(index)}
                  onError={(e) => { e.target.onerror = null; e.target.src = placeholderImage; }}
                />
              ))}
            </div>
          </div>

          {/* Text and Details Section */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2 font-rasta-heading">{product.name}</h1>
            <h2 className="text-xl text-gray-300 mb-2">{product.subtitle}</h2>
            <p className="text-gray-400 mb-4">{product.description}</p>
            <p className="text-rastaRed font-bold text-xl mb-4">${product.price}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-4">
                <span className="mr-2 text-gray-300">Color:</span>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full mr-2 focus:outline-none ${selectedColor === color ? 'ring-2 ring-rastaGreen' : ''}`}
                    style={{ backgroundColor: color, border: '2px solid white' }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            )}

            {/* Size Selection (Conditional) */}
            {product.hasSizes && (
              <div className="mb-4">
                <label htmlFor="size" className="mr-2 text-gray-300">Talla:</label>
                <select
                  id="size"
                  className="filter-button text-rastaLight rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rastaGreen"
                  value={selectedSize || ''}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Seleccionar talla</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            )}

            <button className="view-button p-3  bg-gray-700 hover:bg-gray-600 text-center rounded-md mr-4">
              Añadir al Carrito
            </button>
            <button className="view-button p-3  bg-gray-700 hover:bg-gray-600 text-center rounded-md">
                Comprar Ahora
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-2 font-rasta-heading">Detalles</h2>
          <p className="text-gray-400">{product.details}</p>
        </div>

        {/* Specifications Section */}
        {product.specifications && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-2 font-rasta-heading">Especificaciones</h2>
            <table className="table-auto w-full">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="border px-4 py-2 font-bold text-gray-300">{key}</td>
                    <td className="border px-4 py-2 text-gray-400">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 font-rasta-heading">Productos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts.map((product) => (
                <Link to={`/products/${product.id}`} key={product.id} className="block">
                <div  className="rasta-card-gradient rounded-md hover:shadow-lg flex flex-col h-72 overflow-hidden shadow-inner transform hover:scale-105 transition duration-300">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-md mb-3"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://via.placeholder.com/150" }}
                  />
                  <div className="px-4 py-2 flex flex-col items-center justify-center flex-grow text-center">
                    <h2 className="product-card-title text-lg mb-1 text-gray-100 truncate">{product.name}</h2>
                    <p className="font-bold text-gray-300">${product.price}</p>
                    <div className="flex flex-col space-y-2 mt-4">
                      <Link to={`/products/${product.id}`} className="view-button p-3 bg-gray-700 hover:bg-gray-600 text-center rounded-md block">
                         Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
