const ProductVariants = ({
  colors,
  sizes,
  hasSize,
  hasColor,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect
}) => {
  return (
    <>
      {/* Color Selection */}
      {hasColor && colors?.length > 0 && (
        <div className="mt-6">
          <span className="mr-2 text-gray-300 font-product-card-font">Color:</span>
          {colors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-full mr-2 focus:outline-none ${
                selectedColor === color
                  ? 'ring-2 ring-rastaGreen'
                  : 'md:hover:ring-2 md:hover:ring-rastaGreen'
              }`}
              style={{ backgroundColor: color, border: '1px solid rgba(255,255,255,0.5)' }}
              onClick={() => onColorSelect(color)}
            ></button>
          ))}
        </div>
      )}

      {/* Size Selection */}
      {hasSize && sizes?.length > 0 && (
        <div className="mt-4">
          <span className="mr-2 text-gray-300 font-product-card-font">Talla:</span>
          <div className='flex'>
            {sizes.map((size) => (
              <button
                key={size}
                className={`w-8 h-8 rounded-md mr-2 focus:outline-none text-sm font-bold uppercase transition-colors duration-200 ${
                  selectedSize === size
                    ? 'bg-rastaGreen text-rastaDark'
                    : 'bg-black text-rastaLight border border-rastaGreen md:hover:bg-gradient-to-r from-rastaGreen-700 to-rastaGreen-900'
                }`}
                onClick={() => onSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductVariants;
