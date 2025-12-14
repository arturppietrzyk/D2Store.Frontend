import { useState, useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { mockProducts } from '../data/products';
import { Search } from 'lucide-react';

export default function HomePage() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const productsRef = useRef<HTMLDivElement>(null);
  // Define the available categories (including 'All')
  const categories = ['All', 'Graphic Cards', 'Monitors', 'Laptops', 'Power Supply'];

  // Filter products based on search term and category
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: 'smooth', // Makes the scroll animation smooth
      block: 'start',      // Aligns the top of the element to the top of the viewport
    });
  };

  return (
    <div className="bg-gray-100">
      {/* 1. Hero/Banner Section */}
      <section className="bg-gray-100 py-16 sm:py-24" style={{ backgroundImage: "url('/banner-background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Main Banner Content */}
          <div className="bg-white/80 p-8 rounded-xl max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              D2Store
            </h1>
            <p className="text-lg text-gray-700 max-w-md mx-auto">
              Your Shop, Your Way
            </p>
            <button 
                onClick={scrollToProducts}
                className="mt-6 bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Explore Products
            </button>
          </div>

          {/* Category Tabs at the bottom */}
          <div className="flex justify-center mt-8 space-x-2 sm:space-x-4 bg-white/90 p-3 rounded-xl max-w-fit mx-auto shadow-xl">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Product Listing Section */}
      <section ref={productsRef} className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search Bar at the top of the products */}
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // Removed border classes, added explicit bg-white
                className="w-full py-3 pl-5 pr-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-lg outline-none shadow-sm bg-white"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-500">
                No products found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

