import React from 'react';
    import { useParams, Link } from 'react-router-dom';

    const ProductDetail = () => {
      const { id } = useParams();
      const productId = parseInt(id);

      const productsData = [
        { id: 1, name: 'Gorro Rasta', description: 'Gorro Rasta cálido y estiloso.', price: 25, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
        { id: 2, name: 'Camiseta Bob Marley', description: 'Camiseta clásica de Bob Marley.', price: 30, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
        { id: 3, name: 'Collar Signo de la Paz', description: 'Elegante collar con signo de la paz.', price: 15, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
        { id: 4, name: 'Set de Pulseras Rasta', description: 'Set de pulseras Rasta coloridas.', price: 20, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
        { id: 5, name: 'Papel de Liar - Tamaño King', description: 'Papel de liar tamaño king.', price: 5, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
        { id: 6, name: 'Grinder de Hierbas', description: 'Grinder de hierbas de alta calidad.', price: 35, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
        { id: 7, name: 'Posavasos Rasta Hechos a Mano', description: 'Set de posavasos Rasta hechos a mano.', price: 22, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
        { id: 8, name: 'Tapiz Rasta', description: 'Vibrante decoración de pared Rasta.', price: 40, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
        { id: 9, name: 'Piercing de Nariz - Oro', description: 'Piercing de nariz de oro.', price: 18, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
        { id: 10, name: 'Piercing de Oreja - Aros de Plata', description: 'Piercings de oreja de aros de plata.', price: 28, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
      ];

      const product = productsData.find(p => p.id === productId);

      if (!product) {
        return <div>Producto no encontrado</div>;
      }

      const relatedProducts = productsData
        .filter(p => p.category === product.category && p.id !== productId)
        .slice(0, 4);

      return (
        <div className="container mx-auto p-4">
          <div className="mb-4">
            <Link to="/products" className="bg-gray-700 hover:bg-gray-600 text-rastaLight font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300 rasta-button-gradient">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
              </svg>
              Volver al Catálogo
            </Link>
          </div>

          <div className="rasta-card-gradient p-6 rounded-lg shadow-lg product-card-gradient">
            <div className="md:flex">
              <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
                <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg" />
              </div>
              <div className="md:w-1/2">
                <h1 className="text-3xl font-bold mb-2 font-rasta-heading">{product.name}</h1>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <p className="text-rastaRed font-bold text-xl mb-4">${product.price}</p>
                <button className="bg-rastaGreen hover:bg-rastaGreen-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4 font-rasta-heading">Productos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {relatedProducts.map(relatedProduct => (
                  <div key={relatedProduct.id} className="rasta-card-gradient p-4 rounded-lg shadow-md product-card-gradient">
                    <Link to={`/products/${relatedProduct.id}`}>
                      <img src={relatedProduct.imageUrl} alt={relatedProduct.name} className="w-full h-48 object-cover mb-2 rounded" />
                      <h2 className="text-lg font-semibold">{relatedProduct.name}</h2>
                      <p className="text-gray-400">${relatedProduct.price}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    export default ProductDetail;
