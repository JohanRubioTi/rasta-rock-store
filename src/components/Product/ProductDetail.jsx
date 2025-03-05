import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import ThreeDScene from '../ThreeDScene';
import { ChevronLeftIcon, ChevronRightIcon, ShoppingCartIcon, BanknotesIcon, EyeIcon } from '@heroicons/react/24/solid';

const formatPriceCOP = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(price);
};

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [visibleRelatedCount, setVisibleRelatedCount] = useState(4);
  const sentinelRef = useRef();

  const productsData = [
  {
    id: 1,
    name: 'Gorro Rasta',
    subtitle: 'GR-001',
    description: 'Gorro Rasta cálido y estiloso.',
    price: 87500, // Converted from $25
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    category: 'clothing',
    colors: ['Red', 'Yellow', 'Green', 'Black'],
    hasSizes: true,
    details:
      'Este gorro Rasta está hecho de lana 100% y es perfecto para mantenerte abrigado en climas fríos. Su diseño clásico y colores vibrantes lo hacen un accesorio ideal para cualquier amante del estilo Rasta.',
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
    price: 105000, // Converted from $30
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 52500, // Converted from $15
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 70000, // Converted from $20
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 17500, // Converted from $5
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 122500, // Converted from $35
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 77000, // Converted from $22
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 140000, // Converted from $40
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 63000, // Converted from $18
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
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
    price: 98000, // Converted from $28
    images: [
      'https://via.placeholder.com/400',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
      'https://via.placeholder.com/150',
    ],
    category: 'piercings',
    colors: ['Silver'],
    hasSizes: false,
    details: 'Placeholder',
    specifications: {
      material: 'Plata',
    },
  },
];

  const product = productsData.find((p) => p.id === productId);
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

  const relatedProducts = productsData.filter(
    (p) => p.category === product.category && p.id !== productId
  );

    useEffect(() => {
    if (sentinelRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setVisibleRelatedCount((prevCount) =>
              Math.min(prevCount + 4, relatedProducts.length)
            );
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(sentinelRef.current);

      return () => observer.disconnect();
    }
  }, [sentinelRef, relatedProducts.length]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
        }}
      >
        <ThreeDScene variant="grid" />
      </div>

      <div
        className="absolute inset-0 bg-dynamic-gradient opacity-90 animate-gradient-move"
        style={{
          backgroundSize: '400% 400%',
          filter: 'blur(100px)',
          zIndex: -1,
        }}
      ></div>

      <Navbar />
      <div className="container mx-auto p-4 relative z-10">
        <div className="mb-4">
          <Link to="/products" className="nav-link inline-flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = placeholderImage;
                }}
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImage;
                  }}
                />
              ))}
            </div>
          </div>

          {/* Text and Details Section */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-4xl font-bold font-rasta-heading">
              {product.name}
            </h1>
            <h2 className="text-lg text-gray-300 mt-1 font-product-card-font">{product.subtitle}</h2>
            <p className="text-rastaRed font-bold text-xl mt-2 font-product-card-font">
              {formatPriceCOP(product.price)}
            </p>
            <p className="text-gray-400 mt-4 font-rasta-body">{product.description}</p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-6">
                <span className="mr-2 text-gray-300 font-product-card-font">Color:</span>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-6 h-6 rounded-full mr-2 focus:outline-none ${
                      selectedColor === color
                        ? 'ring-2 ring-rastaGreen'
                        : 'hover:ring-2 hover:ring-rastaGreen'
                    }`}
                    style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.5)' }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            )}

            {/* Size Selection (Conditional) */}
            {product.hasSizes && (
              <div className="mt-4">
                <span className="mr-2 text-gray-300 font-product-card-font">Talla:</span>
                <div className='flex'>
                {['XS','S', 'M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    className={`w-8 h-8 rounded-md mr-2 focus:outline-none text-sm font-bold uppercase transition-colors duration-200 ${
                      selectedSize === size
                        ? 'bg-rastaGreen text-rastaDark'
                        : 'bg-black text-rastaLight border border-rastaGreen hover:bg-gradient-to-r from-rastaGreen-700 to-rastaGreen-900'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-4">
              <span className="mr-2 text-gray-300 font-product-card-font">Cantidad:</span>
              <div className="inline-flex items-center">
                <button
                  className="bg-black hover:bg-gray-700 text-rastaLight px-2 py-1 rounded-l-md focus:outline-none border border-rastaGreen"
                  onClick={() => setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (!isNaN(value)) {
                      setQuantity(Math.max(1, value));
                    }
                  }}
                  className="bg-black text-rastaLight px-4 py-1 w-16 text-center focus:outline-none border-t border-b border-rastaGreen appearance-none quantity-input"
                />
                <button
                  className="bg-black hover:bg-gray-700 text-rastaLight px-2 py-1 rounded-r-md focus:outline-none border border-rastaGreen"
                  onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button
                className="group px-4 py-2 bg-black bg-opacity-80 border border-transparent rounded-lg text-rastaLight flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r from-rastaGreen-900 to-rastaGreen-700 hover:border-rastaGreen"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-1 group-hover:text-rastaDark" />
                Añadir al Carrito
              </button>
              <button
                className="group px-4 py-2 bg-black bg-opacity-80 border border-white rounded-lg text-rastaLight flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-r from-rastaGreen-900 to-rastaGreen-700"
              >
                <BanknotesIcon className="h-5 w-5 mr-1 group-hover:text-rastaDark" />
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>

        {/* Details and Specifications Section */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 p-4 rounded-lg bg-black bg-opacity-75 transition duration-300 hover:shadow-lg">
            <h2 className="text-2xl font-bold mb-2 font-rasta-heading">
              Detalles
            </h2>
            <p className="text-gray-400">{product.details}</p>
          </div>

          {product.specifications && (
            <div className="flex-1 p-4 rounded-lg bg-black bg-opacity-75 transition duration-300 hover:shadow-lg">
              <h2 className="text-2xl font-bold mb-2 font-rasta-heading">
                Especificaciones
              </h2>
              <table className="table-fixed w-full max-w-full md:max-w-full bg-black bg-opacity-50 rounded-lg">
                <tbody>
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <tr key={key}>
                        <td className="border px-4 py-2 font-bold text-gray-300 break-words">
                          {key}
                        </td>
                        <td className="border px-4 py-2 text-gray-400 break-words">
                          {value}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 font-rasta-heading">
              Productos Relacionados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {relatedProducts.slice(0, visibleRelatedCount).map((product) => (
                <Link
                  to={`/products/${product.id}`}
                  key={product.id}
                  className="block"
                >
                  <div className="rasta-card-gradient rasta-card-frame product-card rounded-lg hover:shadow-lg flex flex-col h-96 overflow-hidden shadow-inner transform hover:scale-105 transition duration-300">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-56 object-cover rounded-t-md"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/150';
                      }}
                    />
                    <div className="product-card-content px-4 py-2 flex flex-col items-center justify-between flex-grow text-center">
                      <h2 className="product-card-title text-lg mb-1 text-gray-100 truncate h-12 overflow-hidden text-ellipsis">{product.name}</h2>
                      <p className="font-bold text-gray-300">${product.price}</p>
                    </div>
                    {/* Combined Buttons */}
                    <div className="product-card-buttons">
                        <button to={`/products/${product.id}`} className="view-details-button">
                            <EyeIcon className="h-5 w-5 mr-1" />
                            Ver Detalles
                        </button>
                        <button className="add-to-cart-button">
                            <ShoppingCartIcon className="h-5 w-5" />
                        </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div ref={sentinelRef} className="mt-4"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
