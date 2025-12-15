import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4 text-blue-400">D2Store</h4>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed optio soluta blanditiis quas.
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition-colors">
              <FacebookIcon className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Youtube" className="hover:text-red-600 transition-colors">
              <YoutubeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-blue-400">Pages</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-blue-400">Categories</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/category/monitors" className="hover:text-white transition-colors">Monitors</Link></li>
            <li><Link to="/category/gpus" className="hover:text-white transition-colors">GPUs</Link></li>
            <li><Link to="/category/laptops" className="hover:text-white transition-colors">Laptops</Link></li>
            <li><Link to="/category/powersupply" className="hover:text-white transition-colors">Power Supply</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-blue-400">Contact Info</h4>
          <p className="text-sm text-gray-400 space-y-2">
            <span>10 Downing Street, London, SW1A 2AB, United Kingdom</span>
            <br />
            <span>+44 07400000000</span>
            <br />
            <span>+44 01908 000000</span>
          </p>
        </div>
      </div>

      {}
      <div className="border-t border-gray-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-gray-500">
          Copyright &copy; {new Date().getFullYear()} D2Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}