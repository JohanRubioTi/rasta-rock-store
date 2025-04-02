import { Link } from 'react-router-dom';
import { ShoppingCartIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { addToCartAtom } from '../../store/cartAtoms';

const ProductCard = ({ product }) => {
  const [, addToCart] = useAtom(addToCartAtom);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceFormatted: `$${product.price}`,
      variant: null,
      quantity: 1,
      image: (product.image_urls && product.image_urls[0]) || "https://placehold.co/400"
    });
  };

  return (
    <Link to={`/products/${product.id}`} className="block bouncy-shrink">
      <div className="rasta-card-gradient rasta-card-frame product-card rounded-lg md:hover:shadow-lg flex flex-col h-full overflow-hidden shadow-inner transform md:hover:scale-105 transition duration-300 relative z-20 bg-gray-800 bg-opacity-90 group">
        {/* Image - Fixed aspect ratio square */}
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={(product.image_urls && product.image_urls[0]) || "https://placehold.co/400"}
            alt={product.name}
            className="w-full h-full object-cover object-center rounded-t-lg group-hover:rounded-none transition-all duration-300"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400"; }}
          />
        </div>

        {/* Content - Hidden on hover */}
        <div className="px-4 py-3 flex flex-col justify-between bg-transparent rounded-b-md opacity-100 group-hover:opacity-0 group-hover:h-0 transition-all duration-300 h-20 overflow-hidden">
          <h2 className="text-lg font-bold text-white overflow-hidden text-ellipsis drop-shadow-md text-left line-clamp-2">
            {product.name}
          </h2>
          <p className="font-bold text-rastaYellow drop-shadow-md text-right">
            ${product.price}
          </p>
        </div>

        {/* Buttons - Shown on hover */}
        <div className="absolute inset-0 flex items-center justify-center space-x-4 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link 
            to={`/products/${product.id}`} 
            className="bg-rastaRed hover:bg-rastaRedDark text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <EyeIcon className="h-5 w-5 mr-1" />
            Ver
          </Link>
          <button
            className="bg-rastaGreen hover:bg-rastaGreenDark text-white font-bold py-2 px-4 rounded-full flex items-center transition-colors shadow-lg"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
