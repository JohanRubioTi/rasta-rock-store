import { Link } from 'react-router-dom';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block bouncy-shrink">
      <div className="rasta-card-gradient rasta-card-frame product-card rounded-lg md:hover:shadow-lg flex flex-col h-full overflow-hidden shadow-inner transform md:hover:scale-105 transition duration-300 relative z-20 bg-gray-800 bg-opacity-90">
        <div className="h-48 w-full overflow-hidden">
          <img
            src={(product.image_urls && product.image_urls[0]) || "https://placehold.co/400"}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-md"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400"; }}
          />
        </div>
        <div className="product-card-content px-4 py-2 flex flex-col items-center justify-between flex-grow text-center bg-gray-800 bg-opacity-90 rounded-b-md">
          <h2 className="product-card-title text-lg mb-1 text-white font-bold truncate h-12 overflow-hidden text-ellipsis drop-shadow-md">{product.name}</h2>
          <p className="font-bold text-rastaGreen drop-shadow-md">${product.price}</p>
        </div>
        <div className="product-card-buttons space-x-2">
          <button className="view-details-button">
            <EyeIcon className="h-5 w-5 mr-1" />
            Ver Detalles
          </button>
          <button className="add-to-cart-button">
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
