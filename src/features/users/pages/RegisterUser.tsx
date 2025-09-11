import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterUserForm";

function RegisterUser() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img
            src="/Logo.png"
            alt="D2Store Logo"
            className="h-15 mb-5 object-contain object-center block" />
          <p className="text-gray-500 text-sm">Welcome, please register.</p>
        </div>
        <RegisterForm />
        <p className="text-center text-sm text-gray-600 mt-6">
          Have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterUser;
