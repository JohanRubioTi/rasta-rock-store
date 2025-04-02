import React, { useState } from 'react';
import Spinner from '../Spinner';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Navbar';
import ThreeDScene from '../ThreeDScene';
import useProductDetail from '../../hooks/useProductDetail';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import ProductVariants from './ProductVariants';
import QuantitySelector from './QuantitySelector';
import ProductActions from './ProductActions';
import ProductDescriptionTabs from './ProductDescriptionTabs';
import RelatedProducts from './RelatedProducts';
import { formatPriceCOP } from '../../utils/formatting'; // Import from utils

// Export formatPriceCOP for ProductInfo (or update ProductInfo to import directly)
export { formatPriceCOP }; 

const ProductDetail = () => {
  const { id } = useParams();
  const { product, relatedProducts, loading, error } = useProductDetail(id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleImageClick = (index) => setSelectedImage(index);
  const nextImage = () => setSelectedImage((prev) => (prev + 1) % (product?.image_urls?.length || 1));
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + (product?.image_urls?.length || 1)) % (product?.image_urls?.length || 1));

  const handleAddToCart = () => {
    console.log('Add to cart:', { productId: id, quantity, color: selectedColor, size: selectedSize });
    // Add actual cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', { productId: id, quantity, color: selectedColor, size: selectedSize });
    // Add actual purchase logic here
  };

  if (loading) return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Optimized Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rastaRed via-rastaYellow to-rastaGreen animate-gradient-shift opacity-90" style={{
        backgroundSize: '300% 300%',
        animation: 'gradientShift 8s ease infinite alternate',
        zIndex: -1
      }}></div>
      
      {/* Loading Content */}
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Optimized Spinner */}
        <div className="relative w-20 h-20 mb-8">
          <Spinner />
        </div>
        <h2 className="text-2xl font-bold text-rastaLight mb-2">Cargando producto</h2>
        <p className="text-rastaLight opacity-80 mb-6">Un momento, por favor...</p>
        {/* Conversion Optimized Hint */}
        <div className="text-sm text-rastaLight/70 animate-pulse">
          Listo en un momento...
        </div>
      </div>
    </div>
  );
  if (error) return <div className="text-center text-rastaRed p-10">Error: {error}</div>;
  if (!product) return <div className="text-center text-rastaLight p-10">Producto no encontrado</div>;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <ThreeDScene variant="grid" />
      </div>
      <div className="absolute inset-0 bg-dynamic-gradient opacity-90 animate-gradient-move" style={{ backgroundSize: '400% 400%', filter: 'blur(100px)', zIndex: -1 }}></div>

      <Navbar />
      <div className="container mx-auto p-4 relative z-10">
        {/* Back Link */}
        <div className="mb-4">
          <Link to="/products" className="nav-link inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
            </svg>
            Volver al Catálogo
          </Link>
        </div>

        {/* Main Product Section */}
        <div className="rasta-card-gradient p-6 rounded-lg shadow-lg product-card-gradient flex flex-col md:flex-row ">
          <ProductImageGallery
            images={product.image_urls}
            selectedImage={selectedImage}
            onImageClick={handleImageClick}
            onNextImage={nextImage}
            onPrevImage={prevImage}
          />
          <div className="md:w-1/2 flex flex-col">
            <ProductInfo
              name={product.name}
              subtitle={product.subtitle}
              price={product.price}
              description={product.description} // Using description for the short info here
            />
            <ProductVariants
              colors={product.colors}
              sizes={product.sizes}
              hasSize={product.has_size}
              hasColor={product.has_color}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorSelect={setSelectedColor}
              onSizeSelect={setSelectedSize}
            />
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
            <ProductActions onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} />
          </div>
        </div>

        {/* Details & Specifications */}
        <ProductDescriptionTabs
          description={product.description} // Using description again for details section
          specifications={product.specifications}
        />

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
};

export default ProductDetail;
