import { Link } from "react-router-dom";
import { ShoppingCart, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center"> 
              <img
                src="/Logo.png"
                alt="D2Store Logo"
                className="h-10 object-contain" 
              />  
            </Link>
            <div className="hidden sm:flex space-x-4 text-sm font-medium">
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" aria-label="Shopping Cart" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ShoppingCart className="h-6 w-6 text-gray-700" />
            </Link>
            <Link to="/login" aria-label="User Account" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="h-6 w-6 text-gray-700" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

