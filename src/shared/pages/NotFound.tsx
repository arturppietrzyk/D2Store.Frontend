import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-gray-600 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
        {/* Links */}
        <div className="space-x-4">
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
          <Link
            to="/login"
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
