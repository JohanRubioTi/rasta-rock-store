import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const productId = parseInt(id);

  // Hardcoded product data (same as in ProductCatalog for now)
  const productsData = [
    { id: 1, name: 'Rasta Beanie', description: 'Warm and stylish Rasta beanie.', price: 25, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
    { id: 2, name: 'Bob Marley Tee', description: 'Classic Bob Marley t-shirt.', price: 30, imageUrl: 'https://via.placeholder.com/150', category: 'clothing' },
    { id: 3, name: 'Peace Sign Necklace', description: 'Elegant peace sign necklace.', price: 15, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
    { id: 4, name: 'Rasta Bracelet Set', description: 'Colorful Rasta bracelet set.', price: 20, imageUrl: 'https://via.placeholder.com/150', category: 'accessories' },
    { id: 5, name: 'Rolling Papers - King Size', description: 'King size rolling papers.', price: 5, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
    { id: 6, name: 'Herb Grinder', description: 'High-quality herb grinder.', price: 35, imageUrl: 'https://via.placeholder.com/150', category: 'smoke-accessories' },
    { id: 7, name: 'Handmade Rasta Coasters', description: 'Set of handmade Rasta coasters.', price: 22, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
    { id: 8, name: 'Rasta Wall Hanging', description: 'Vibrant Rasta wall decoration.', price: 40, imageUrl: 'https://via.placeholder.com/150', category: 'handmade-decorations' },
    { id: 9, name: 'Nose Piercing - Gold', description: 'Gold nose piercing.', price: 18, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
    { id: 10, name: 'Ear Piercing - Silver Hoops', description: 'Silver hoop ear piercings.', price: 28, imageUrl: 'https://via.placeholder.com/150', category: 'piercings' },
  ];

  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = productsData
    .filter(p => p.category === product.category && p.id !== productId)
    .slice(0, 4); // Get up to 4 related products

  return (
    <div className="container mx-auto p-4">
      {/* Back to Catalog Button */}
      <div className="mb-4">
        <Link to="/products" className="bg-gray-700 hover:bg-gray-600 text-rastaLight font-bold py-2 px-4 rounded-full inline-flex items-center transition duration-300 rasta-button-gradient"> {/* Applied rasta-button-gradient */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
          Back to Catalog
        </Link>
      </div>

      <div className="rasta-card-gradient p-6 rounded-lg shadow-lg product-card-gradient"> {/* Applied product-card-gradient */}
        <div className="md:flex">
          <div className="md:w-1/2 mb-4 md:mb-0 md:mr-4">
            <img src={product.imageUrl} alt={product.name} className="w-full rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2 font-rasta-heading">{product.name}</h1>
            <p className="text-gray-400 mb-4">{product.description}</p>
            <p className="text-rastaRed font-bold text-xl mb-4">${product.price}</p>
            <button className="rasta-button-gradient font-bold py-3 px-8 rounded-full transition duration-300"> {/* Applied rasta-button-gradient */}
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 font-rasta-heading">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="rasta-card-gradient p-4 rounded-lg shadow-md product-card-gradient"> {/* Applied product-card-gradient */}
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
