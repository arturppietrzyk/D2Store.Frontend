import type { Product } from "../data/products";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl">
      <div className="p-4 flex flex-col items-center">
        {/* Placeholder for Product Image */}
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center mb-4">
          <img src={product.image} alt={product.name} className="max-h-full object-contain" />
        </div>
        
        <h3 className="text-base font-semibold text-gray-800 text-center line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        
        <p className="text-xl font-bold text-gray-900 mt-2">
          ${product.price.toFixed(2)}
        </p>

        <Link 
          to={`/products/${product.id}`} // ⭐ Dynamic URL for the PDP
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}