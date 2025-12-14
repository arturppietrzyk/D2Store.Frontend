import { useParams, Link } from 'react-router-dom';
// ⭐ Make sure these paths are correct based on your file structure (image_04ad5e.png, image_dd2575.png)
import { mockProducts } from '../data/products';
//import type { Product } from '../../../shared/data/products';
import type { Product } from '../data/products'; 
import { ShoppingCart } from 'lucide-react'; // Import the cart icon

// Helper function to simulate fetching a product by ID
const getProductById = (id: number): Product | undefined => {
  return mockProducts.find(p => p.id === id);
};

export default function ProductDetailPage() {
  // 1. Get the ID from the URL and convert it to a number
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id, 10) : undefined;
  
  // 2. Fetch the product details
  const product = productId ? getProductById(productId) : undefined;

  // Handle case where product is not found (404-like behavior)
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Product Not Found</h2>
        <p className="text-gray-600">The product you are looking for (ID: {id}) does not exist.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
          &larr; Return to Home
        </Link>
      </div>
    );
  }
  
  // 3. Render the detailed product view
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Link */}
        <Link to="/" className="text-blue-600 hover:underline flex items-center mb-6 text-sm font-medium">
          &larr; Back to Products
        </Link>
        
        {/* Main Content: Two-Column Layout */}
        <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left Column: Image Area */}
          <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg">
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-h-[400px] w-full object-contain" 
            />
          </div>
          
          {/* Right Column: Details Area */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              {product.name}
            </h1>
            
            <p className="text-xl font-bold text-gray-800 mb-6">
              ${product.price.toFixed(2)}
            </p>

            {/* Category Tag */}
            <div className="mb-8">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Category: {product.category}
              </span>
            </div>

            {/* Description Placeholder (You can add a description field to your Product type later) */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              Experience unparalleled gaming performance with the {product.name}. Featuring the latest architecture, advanced cooling, and next-gen ray tracing capabilities for ultra-realistic visuals.
            </p>

            {/* Add to Cart Button */}
            <button className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </button>
            
          </div>
        </div>
        
        {/* Optional: Related Products Section would go here */}
      </div>
    </div>
  );
}