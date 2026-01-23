import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Settings, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from "../../infrastructure/authContext";

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleManualLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex-shrink-0">
              <img src="/Logo.png" alt="D2Store" className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-600">
              <Link to="/" className="hover:text-blue-600 transition">Home</Link>
              <Link to="/about" className="hover:text-blue-600 transition">About</Link>
              <Link to="/contact" className="hover:text-blue-600 transition">Contact</Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingCart className="h-6 w-6" />
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 text-gray-700 hover:bg-gray-100 rounded-full transition cursor-pointer flex items-center"
              >
                <User className={`h-6 w-6 ${isLoggedIn ? 'text-blue-600' : 'text-gray-700'}`} />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {isLoggedIn ? (
                    <>
                      <Link 
                        to="/account" 
                        onClick={() => setIsDropdownOpen(false)} 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <Settings className="h-4 w-4 mr-2" /> My Account
                      </Link>
                      <button 
                        onClick={handleManualLogout} 
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition"
                      >
                        <LogOut className="h-4 w-4 mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/login" 
                        onClick={() => setIsDropdownOpen(false)} 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <LogIn className="h-4 w-4 mr-2" /> Login
                      </Link>
                      <Link 
                        to="/register" 
                        onClick={() => setIsDropdownOpen(false)} 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        <UserPlus className="h-4 w-4 mr-2" /> Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}