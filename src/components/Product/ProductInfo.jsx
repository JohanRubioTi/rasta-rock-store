import { formatPriceCOP } from '../../utils/formatting';

const ProductInfo = ({
  name, 
  subtitle, 
  price, 
  description 
}) => {
  return (
    <div className="md:w-1/2 flex flex-col">
      <h1 className="text-4xl font-bold font-rasta-heading product-card-readable-title">
        {name}
      </h1>
      {subtitle && (
        <h2 className="text-lg text-gray-300 mt-1 font-product-card-font">
          {subtitle}
        </h2>
      )}
      <p className="text-rastaRed font-bold text-xl mt-2 font-product-card-font">
        {formatPriceCOP(price)}
      </p>
      <p className="text-gray-400 mt-4 font-rasta-body">
        {description}
      </p>
    </div>
  );
};

export default ProductInfo;
