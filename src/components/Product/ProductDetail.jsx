import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ThreeDScene from '../ThreeDScene';

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id);

  const productsData = [
    { id: 1, name: 'Gorro Rasta', description: 'Gorro Rasta cálido y estiloso.', price: 25, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'clothing' },
    { id: 2, name: 'Camiseta Bob Marley', description: 'Camiseta clásica de Bob Marley.', price: 30, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'clothing' },
    { id: 3, name: 'Collar Signo de la Paz', description: 'Elegante collar con signo de la paz.', price: 15, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'accessories' },
    { id: 4, name: 'Set de Pulseras Rasta', description: 'Set de pulseras Rasta coloridas.', price: 20, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'accessories' },
    { id: 5, name: 'Papel de Liar - Tamaño King', description: 'Papel de liar tamaño king.', price: 5, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'smoke-accessories' },
    { id: 6, name: 'Grinder de Hierbas', description: 'Grinder de hierbas de alta calidad.', price: 35, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'smoke-accessories' },
    { id: 7, name: 'Posavasos Rasta Hechos a Mano', description: 'Set de posavasos Rasta hechos a mano.', price: 22, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'handmade-decorations' },
    { id: 8, name: 'Tapiz Rasta', description: 'Vibrante decoración de pared Rasta.', price: 40, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'handmade-decorations' },
    { id: 9, name: 'Piercing de Nariz - Oro', description: 'Piercing de nariz de oro.', price: 18, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'piercings' },
    { id: 10, name: 'Piercing de Oreja - Aros de Plata', description: 'Piercings de oreja de aros de plata.', price: 28, imageUrls: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150', 'https://via.placeholder.com/150'], category: 'piercings' },
  ];

  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  const relatedProducts = productsData;
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  return (
    <div className="min-h-screen relative overflow-hidden">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
        <ThreeDScene variant="grid" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-rastaRed via-rastaYellow to-rastaGreen to-rastaRed opacity-90 animate-spotlight-move" style={{
        backgroundSize: '400% 400%',
        filter: 'blur(100px)',
        zIndex: -1
      }}></div>

      <div className="container mx-auto p-4 relative z-10">
        <div className="mb-6">
          <Link to="/products" className="back-to-catalog-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            Catálogo de Productos
          </Link>
        </div>

        <div className="rasta-card-gradient p-6 rounded-lg shadow-lg product-card-gradient">
          <div className="md:flex">
            <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
              {/* Main Product Image - Increased Size */}
              <img src={product.imageUrls[mainImageIndex]} alt={product.name} className="w-full rounded-lg mb-6 md:mb-8" style={{ maxHeight: '500px', width: 'auto' }} />
              {/* Image Thumbnails */}
              <div className="flex -mx-2 overflow-x-auto">
                {product.imageUrls.map((imageUrl, index) => (
                  <div key={index} className={`px-2 w-20 h-20 cursor-pointer rounded-md overflow-hidden ${index === mainImageIndex ? 'ring-2 ring-rastaYellow' : 'opacity-60 hover:opacity-100'}`} onClick={() => handleThumbnailClick(index)}>
                    <img src={imageUrl} alt={`${product.name} - Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
            {/* Product Details - Left Aligned with Forceful Padding */}
            <div className="md:w-1/2 flex flex-col" style={{ paddingLeft: '2rem' }}> {/* Added inline style for forceful padding */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-3 font-rasta-heading text-left">{product.name}</h1>
                <p className="text-gray-400 mb-6 text-left">{product.description}</p>
                <p className="text-rastaRed font-bold text-2xl mb-6 text-left">${product.price}</p>
              </div>
              <div className="mt-auto">
                {/* Quantity Selection with Buttons - Left Aligned */}
                <div className="mb-6 flex items-center space-x-4">
                  <label htmlFor="quantity" className="block text-sm font-medium text-rastaLight">Cantidad:</label>
                  <div className="flex items-center space-x-3">
                    <button onClick={decreaseQuantity} className="quantity-button">-</button>
                    <span className="quantity-display">{quantity}</span>
                    <button onClick={increaseQuantity} className="quantity-button">+</button>
                  </div>
                </div>
                {/* Buy Buttons - Stacked Vertically */}
                <div className="flex flex-col space-y-3">
                  <button className="rasta-button-gradient hover:bg-rastaGreen-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center w-full">
                    Añadir al Carrito
                  </button>
                  <button className="view-button hover:opacity-90 text-rastaLight font-bold py-3 px-6 rounded-full transition duration-300 flex items-center justify-center w-full">
                    Comprar Ahora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 font-rasta-heading">Todos Los Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="rasta-card-gradient p-4 rounded-lg shadow-md product-card-gradient">
                  <Link to={`/products/${relatedProduct.id}`}>
                    <img src={relatedProduct.imageUrls[0]} alt={relatedProduct.name} className="w-full h-48 object-cover mb-2 rounded" />
                    <h2 className="text-lg font-semibold">{relatedProduct.name}</h2>
                    <p className="text-gray-400">${relatedProduct.price}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
