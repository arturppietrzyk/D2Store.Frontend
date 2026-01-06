import { useState, useRef, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types/products';
import type { Category } from '../types/categories';
import { Search } from 'lucide-react';
import { getProducts } from '../services/getProducts';
import { getCategories } from '../services/getCategories';
import axios from 'axios';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const productsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(1, 100),
          getCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const status = err.response?.status;
          const serverErrorMessage = err.response?.data?.message;

          if (status && [400, 500].includes(status)) {
            setError((serverErrorMessage));
          } else {
            setError("Loading the products failed. Please contact the admin.");
          }
        } else {
          setError("An unexpected error occurred.")
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategoryId === 'all' ||
      product.categories?.some(cat => cat.categoryId === selectedCategoryId);

    return matchesSearch && matchesCategory;
  });
  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div>
      <section className="bg-gray-100 py-16 sm:py-24" style={{ backgroundImage: "url('/banner-background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
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
          <div className="flex flex-wrap justify-center mt-8 gap-2 bg-white/90 p-3 rounded-xl max-w-fit mx-auto shadow-xl">
            <button
              onClick={() => setSelectedCategoryId('all')}
              className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${selectedCategoryId === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.categoryId}
                onClick={() => setSelectedCategoryId(category.categoryId)}
                className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${selectedCategoryId === category.categoryId
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section ref={productsRef} className="py-12 sm:py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-5 pr-12 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-lg outline-none shadow-sm bg-white"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            </div>
          </div>
          {loading && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-center">
              <p className="font-semibold">Error loading products</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No products found matching your criteria.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}