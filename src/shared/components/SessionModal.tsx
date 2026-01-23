import { LogIn, Home } from 'lucide-react';

interface SessionModalProps {
  isOpen: boolean;
  onClose: () => void; 
}

export default function SessionModal({ isOpen, onClose }: SessionModalProps) {
  if (!isOpen) return null;

  const handleGoHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-in fade-in zoom-in duration-200">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <LogIn className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Session Expired</h2>
        <p className="text-gray-600 mb-8 text-sm">
          For your security, you have been logged out. Please sign in again to continue shopping at D2Store.
        </p>
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Log In Again
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-white text-gray-700 border border-gray-200 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}