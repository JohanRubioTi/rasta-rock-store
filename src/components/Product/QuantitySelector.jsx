const QuantitySelector = ({ 
  quantity, 
  onQuantityChange 
}) => {
  return (
    <div className="mt-4">
      <span className="mr-2 text-gray-300 font-product-card-font">Cantidad:</span>
      <div className="inline-flex items-center">
        <button
          className="bg-black md:hover:bg-gray-700 text-rastaLight px-2 py-1 rounded-l-md focus:outline-none border border-rastaGreen"
          onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
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
              onQuantityChange(Math.max(1, value));
            }
          }}
          className="bg-black text-rastaLight px-4 py-1 w-16 text-center focus:outline-none border-t border-b border-rastaGreen appearance-none quantity-input"
        />
        <button
          className="bg-black md:hover:bg-gray-700 text-rastaLight px-2 py-1 rounded-r-md focus:outline-none border border-rastaGreen"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
