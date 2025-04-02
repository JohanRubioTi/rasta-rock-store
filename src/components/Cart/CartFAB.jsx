import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useAtom } from 'jotai';
import { cartAtom } from '../../store/cartAtoms';
import { useState } from 'react';

const CartFAB = () => {
  const [cart, setCart] = useAtom(cartAtom);
  const [isOpen, setIsOpen] = useState(false);

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const updateQuantity = (id, variant, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id && item.variant === variant 
        ? {...item, quantity: newQuantity} 
        : item
    ));
  };

  const removeItem = (id, variant) => {
    setCart(cart.filter(item => !(item.id === id && item.variant === variant)));
  };

  return (
    <>
      {/* FAB Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-rastaGreen hover:bg-rastaYellow text-white rounded-full p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center relative"
          aria-label="Carrito de compras"
        >
          <ShoppingCartIcon className="h-7 w-7" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-rastaGreen border-2 border-rastaGreen text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Side Cart */}
      {isOpen && (
        <div className="fixed inset-0 z-40">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Cart Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white/90 backdrop-blur-lg shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-rastaGreen to-rastaYellow text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">Tu Carrito</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-black/10"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShoppingCartIcon className="h-16 w-16 mb-4" />
                  <p className="text-lg">Tu carrito está vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.variant}`} className="flex gap-4 p-4 bg-white/80 rounded-lg border border-gray-100">
                      <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">{item.priceFormatted}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <button 
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id, item.variant)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200 bg-white/80">
                <div className="flex justify-between mb-4">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-rastaGreen to-rastaYellow hover:opacity-90 text-white py-3 px-4 rounded-lg transition-all font-medium text-lg">
                  Proceder al Pago
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartFAB;
