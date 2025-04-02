import { useAtom } from 'jotai';
import {
  cartAtom,
  removeFromCartAtom,
  updateQuantityAtom
} from '../../store/cartAtoms';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';
import CheckoutPage from './CheckoutPage'; // Import CheckoutPage

const CartView = () => {
  const [cart] = useAtom(cartAtom);
  const [, removeFromCart] = useAtom(removeFromCartAtom);
  const [, updateQuantity] = useAtom(updateQuantityAtom);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-white">Tu Carrito</h1>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4 text-gray-300">Tu carrito está vacío</p>
          <Link
            to="/products"
            className="inline-block bg-rastaGreen hover:bg-rastaYellow text-white px-6 py-3 rounded-lg transition-colors"
          >
            Ver Productos
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 bg-opacity-90 rounded-lg p-6">
          <div className="divide-y divide-gray-700">
            {cart.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="py-4 flex items-center">
                <div className="w-20 h-20 bg-gray-700 rounded-md overflow-hidden mr-4">
                  <img
                    src={item.image || "https://placehold.co/100"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{item.name}</h3>
                  <p className="text-rastaGreen font-bold">{item.priceFormatted}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => 
                      updateQuantity({
                        id: item.id,
                        variant: item.variant,
                        quantity: parseInt(e.target.value) || 1
                      })
                    }
                    className="w-16 bg-gray-700 border border-gray-600 text-white rounded px-2 py-1 text-center"
                  />
                  <button
                    onClick={() => removeFromCart({
                      id: item.id,
                      variant: item.variant
                    })}
                    className="text-red-400 hover:text-red-300"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-300">Subtotal:</span>
              <span className="text-xl font-bold text-white">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            {/* Link to CheckoutPage */}
            <Link
              to="/checkout"
              className="block w-full bg-rastaGreen hover:bg-rastaYellow text-white text-center py-3 px-6 rounded-lg transition-colors mb-4"
            >
              Proceder al Pago
            </Link>

            {/* Embed CheckoutPage component */}
            <CheckoutPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
