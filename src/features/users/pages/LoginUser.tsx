import { Link } from "react-router-dom";
import LoginForm from "../components/LoginUserForm";

function LoginUser() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Logo.png"
            alt="D2Store Logo"
            className="h-15 mb-5 object-contain object-center block" />
          <p className="text-gray-500 text-sm">Welcome back, login.</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-semibold hover:underline">
            Register here
          </Link>
        </p>
        <p className="text-center text-sm text-gray-600 mt-6">
          Use without logging in?{" "}
          <Link to="/" className="text-blue-600 font-semibold hover:underline">
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginUser;
