import { Link } from 'react-router-dom';
import type { Product } from '../types/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];
  const imageUrl = primaryImage 
    ? `http://localhost:5112/${primaryImage.location}` 
    : '/placeholder.png';


  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
      <div className="w-full h-48 bg-white flex items-center justify-center p-4">
        <img 
          src={imageUrl} 
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1"> 
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xl font-bold text-blue-600">
              £{product.price.toFixed(2)}
            </span>
            <Link 
              to={`/products/${product.productId}`} 
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-block text-center"
            >
              View Details
            </Link>
          </div>
          {product.stockQuantity !== undefined && (
            <>
              {product.stockQuantity < 5 && product.stockQuantity > 0 && (
                <p className="text-orange-600 text-sm mt-2">
                  Only {product.stockQuantity} left in stock!
                </p>
              )}
              {product.stockQuantity === 0 && (
                <p className="text-red-600 text-sm mt-2">Out of stock</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}