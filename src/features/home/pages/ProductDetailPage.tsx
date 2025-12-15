import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/getProducts';
import type { Product } from '../types/products';
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!productId) {
      setError('Product ID not found.');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(productId);
        setProduct(data);
        setError(null);
        setCurrentImageIndex(0); 
      } catch (err) {
        setError('Failed to fetch product details.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const sortedImages = useMemo(() => {
    if (!product || !product.images) return [];
    const sorted = [...product.images].sort((a, b) => {
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      return 0;
    });
    return sorted;
  }, [product]);

  const currentImage = sortedImages[currentImageIndex];
  const imageUrl = currentImage 
    ? `http://localhost:5112/${currentImage.location}`
    : '/placeholder.png';

  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === 0 ? sortedImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex(prevIndex => 
      prevIndex === sortedImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const hasMultipleImages = sortedImages.length > 1;

  if (loading || error || !product) {
    if (loading) return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-start justify-center pt-20">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );

    if (error) return (
      <div className="min-h-screen bg-gray-100 p-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );

    if (!product) return (
      <div className="min-h-screen bg-gray-100 p-8 pt-20">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm mb-4 inline-block">
            ← Back to Home
          </Link>
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded-xl text-center">
            <p className="font-semibold">Product not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = product.stockQuantity > 0 
    ? (product.stockQuantity < 5 ? `Low Stock: Only ${product.stockQuantity} left` : 'In Stock')
    : 'Out of Stock';

  const stockColor = product.stockQuantity > 5 ? 'text-green-600' : product.stockQuantity > 0 ? 'text-orange-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gray-100 p-8 pt-10 sm:pt-16">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-6 sm:p-10">
        <Link to="/" className="text-blue-600 hover:text-blue-800 text-base font-medium mb-6 inline-block">
          ← Back to Home
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg bg-gray-50 rounded-lg p-6 border border-gray-200 relative">
              <div className="relative pt-[100%]"> 
                <img 
                  src={imageUrl} 
                  alt={`${product.name} image ${currentImageIndex + 1}`} 
                  className="absolute top-0 left-0 w-full h-full object-contain" 
                />
              </div>
              {hasMultipleImages && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white/70 rounded-full text-gray-800 hover:bg-white transition-colors z-10 shadow-md"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white/70 rounded-full text-gray-800 hover:bg-white transition-colors z-10 shadow-md"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
            {hasMultipleImages && (
              <div className="flex mt-4 space-x-2">
                {sortedImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 border-2 rounded-lg overflow-hidden transition-all ${
                      index === currentImageIndex 
                        ? 'border-blue-600 p-0.5' 
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    <img 
                      src={`http://localhost:5112/${img.location}`} 
                      alt={`Thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover" 
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-6">
            <div className='border-b pb-4'>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">
                {product.name}
              </h1>
              {product.category && (
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mt-1">
                  {product.category}
                </span>
              )}
            </div>
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-gray-900">
                £{product.price.toFixed(2)}
              </span>
              <p className={`text-lg font-semibold ${stockColor}`}>
                {stockStatus}
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Product Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description || "No detailed description available for this product."}
              </p>
            </div>
            <div className='pt-4'>
              <button 
                className="w-full flex items-center justify-center bg-blue-600 text-white text-xl font-semibold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-lg disabled:bg-gray-400"
                disabled={product.stockQuantity === 0}
              >
                <ShoppingCart className="w-6 h-6 mr-3" />
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
            <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Specifications</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                    <li>**Model ID:** {product.productId}</li>
                    <li>**Date Added:** {new Date(product.addedDate).toLocaleDateString()}</li>
                    <li>**Last Updated:** {new Date(product.lastModified).toLocaleDateString()}</li>
                </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}