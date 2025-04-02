import { ShoppingCartIcon, BanknotesIcon } from '@heroicons/react/24/solid';

const ProductActions = ({ 
  onAddToCart,
  onBuyNow 
}) => {
  return (
    <div className="mt-6 flex space-x-2 justify-center">
      <button
        className="group px-4 py-2 bg-black bg-opacity-80 border border-transparent rounded-lg text-rastaLight flex items-center justify-center transition-all duration-300 md:hover:bg-gradient-to-r from-rastaGreen-900 to-rastaGreen-700 md:hover:border-rastaGreen"
        onClick={onAddToCart}
      >
        <ShoppingCartIcon className="h-5 w-5 mr-1 group-md:hover:text-rastaDark" />
        Añadir al Carrito
      </button>
      <button
        className="group px-4 py-2 bg-black bg-opacity-80 border border-white rounded-lg text-rastaLight flex items-center justify-center transition-all duration-300 md:hover:bg-gradient-to-r from-rastaGreen-900 to-rastaGreen-700"
        onClick={onBuyNow}
      >
        <BanknotesIcon className="h-5 w-5 mr-1 group-md:hover:text-rastaDark" />
        Comprar Ahora
      </button>
    </div>
  );
};

export default ProductActions;
